import Order from "@/app/models/Order";
import connectDB from "@/app/middleware/connectDB";

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();

  if (data.STATUS === "TXN_SUCCESS") {
    await Order.findOneAndUpdate(
      { orderId: data.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(data) }
    );
  } else if (data.STATUS === "PENDING") {
    await Order.findOneAndUpdate(
      { orderId: data.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(data) }
    );
  }

  Response.redirect("/order", 200);

  return Response.json(data);
}
