const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/app/models/Order";
import connectDB from "@/app/middleware/connectDB";
import Product from "@/app/models/Product";

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();

  if (data.subTotal === 0 || data.cart.length === 0) {
    return Response.json({ success: false, message: "Cart is empty" });
  }

  // Check if cart is tampered or not
  let product,
    sumTotal = 0;
  let cart = data.cart;
  for (let item in cart) {
    sumTotal += cart[item].price * cart[item].quantity;
    product = await Product.findOne({ slug: item }).lean();
    if (cart[item].quantity > product.availableQuantity) {
      return Response.json({
        success: false,
        message:
          "Some products are not available in the quantity you requested. Please try again.",
      });
    }
    if (!product || product.price !== cart[item].price) {
      return Response.json({
        success: false,
        message: "Cart is tampered",
        cartClear: true,
      });
    }
  }
  if (sumTotal !== data.subTotal) {
    return Response.json({
      success: false,
      message: "Cart is tampered",
      cartClear: true,
    });
  }

  // Create Order Object
  const order = new Order({
    email: data.email,
    orderId: data.orderId,
    amount: data.subTotal,
    address: `${data.address}, ${data.city}, ${data.state}, ${data.pincode}`,
    products: data.cart,
    phone: data.phone,
  });

  await order.save();

  // Paytm for doing payment
  // var paytmParams = {};
  // paytmParams.body = {
  //   requestType: "Payment",
  //   mid: process.env.NEXT_PUBLIC_PAYTM_MID,
  //   websiteName: "HushString",
  //   orderId: data.orderId,
  //   callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/paytmCallback`,
  //   txnAmount: {
  //     value: data.subTotal,
  //     currency: "INR",
  //   },
  //   userInfo: {
  //     custId: data.email,
  //   },
  // };

  // /*
  //  * Generate checksum by parameters we have in body
  //  * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
  //  */
  // const checksum = await PaytmChecksum.generateSignature(
  //   JSON.stringify(paytmParams.body),
  //   process.env.PAYTM_MERCHANT_KEY
  // );
  // paytmParams.head = {
  //   signature: checksum,
  // };

  // var post_data = JSON.stringify(paytmParams);

  // const requestAsync = async () => {
  //   return new Promise((resolve, reject) => {
  //     var options = {
  //       /* for Staging */
  //       hostname: "securegw-stage.paytm.in",

  //       /* for Production */
  //       // hostname: 'securegw.paytm.in',

  //       port: 443,
  //       path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${data.orderId}`,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Content-Length": post_data.length,
  //       },
  //     };

  //     var response = "";
  //     var post_req = https.request(options, function (post_res) {
  //       post_res.on("data", function (chunk) {
  //         response += chunk;
  //       });

  //       post_res.on("end", function () {
  //         console.log("Response: ", response);
  //        let response = JSON.parse(response).body;
  //          response.success = true;
  //         resolve(response);
  //       });
  //     });

  //     post_req.write(post_data);
  //     post_req.end();
  //   });
  // };
  // const response = await requestAsync();
  // return Response.json({ success: true, response });

  // This is only for testing purpose and will be removed in production
  let paytmCallback = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/paytmCallback`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ORDERID: data.orderId, STATUS: "TXN_SUCCESS" }),
    }
  );

  return Response.json({ success: true });
}
