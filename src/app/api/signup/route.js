import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

// How to request body in Next.js API
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  const { name, email, password } = data;
  let userAlreadyExist = await User.findOne({ email: email }).lean();
  if (userAlreadyExist !== null) {
    return Response.json({ success: false, message: "User already exists." });
  }
  try {
    const user = await User.create({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });
    await user.save();
    var token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4d" }
    );
    return Response.json({
      message: "User created successfully",
      success: true,
      token: token,
      email: email,
      message: "Your account created successfully!",
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
