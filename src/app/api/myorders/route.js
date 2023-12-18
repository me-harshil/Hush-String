import Order from "@/app/models/Order";
import connectDB from "@/app/middleware/connectDB";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  let data = await request.json();
  let verify = jwt.verify(data.token, process.env.JWT_SECRET_KEY);
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let orders = JSON.parse(
    JSON.stringify(
      await Order.find({ email: verify.email, status: "Paid" }).lean()
    )
  );

  return Response.json(orders);
}
