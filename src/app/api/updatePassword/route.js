import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  let data = await request.json();
  let verify = jwt.verify(data.token, process.env.JWT_SECRET_KEY);
  const mongoDB = await connectDB();
  console.log(mongoDB);
  try {
    let user = await User.findOne({ email: verify.email }).lean();
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

    let decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (data.password === decryptPassword) {
      await User.findOneAndUpdate(
        { email: verify.email },
        {
          password: CryptoJS.AES.encrypt(
            data.newpassword,
            process.env.SECRET_KEY
          ).toString(),
        }
      );
      return Response.json({
        success: true,
        message: "Password Updated Successfully",
      });
    }
    return Response.json({ success: false, message: "Invalid Password" });
  } catch (error) {
    return Response.json({ success: false, message: error.message });
  }
}
