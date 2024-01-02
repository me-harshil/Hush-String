import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var jwt = require("jsonwebtoken");

export async function POST(request) {
  let data = await request.json();
  let verify = jwt.verify(data.token, process.env.JWT_SECRET_KEY);
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let userData = await User.findOne({ email: verify.email }).lean();
  return Response.json({
    name: userData.name,
    address: userData.address,
    phone: userData.phone,
    pincode: userData.pincode,
  });
}
