import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var CryptoJS = require("crypto-js");

// How to request body in Next.js API
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  const { name, email, password } = data;
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
    return Response.json({
      message: "User created successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
