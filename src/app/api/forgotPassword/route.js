import { sendMail } from "./NodeMailerConfig";
import ForgotPassword from "@/app/models/ForgotPassword";
import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var CryptoJS = require("crypto-js");

export async function POST(request) {
  const data = await request.json();
  const mongoDB = await connectDB();

  console.log(mongoDB);
  if (data.sendMail) {
    const { email } = data;
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    try {
      let user = await User.findOne({ email: email }).lean();
      if (user === null) {
        return Response.json({
          success: false,
          message: "No user with this email exists.",
        });
      }

      let fp = new ForgotPassword({
        email: email,
        token: token,
      });
      await fp.save();
      const name = user.name;
      const subject = "Reset Password for HushString";
      let mailConfirmation = await sendMail(subject, email, name, token);

      if (mailConfirmation) {
        return Response.json({
          success: true,
          message: "Message sent.",
        });
      } else {
        return Response.json({
          success: false,
          message: "Email ID does not exist.",
        });
      }
    } catch (err) {
      console.log(err);
      return Response.json({
        success: false,
        message: err,
      });
    }
  } else {
    const { password, token } = data;

    let verifyToken = await ForgotPassword.findOne({ token }).lean();

    if (verifyToken === null) {
      return Response.json({
        success: false,
        message: "Invalid token.",
      });
    }
    let email = verifyToken.email;
    try {
      let update = await User.findOneAndUpdate(
        { email },
        {
          password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY
          ).toString(),
        }
      );

      await ForgotPassword.deleteOne({ token });

      return Response.json({
        success: true,
        message: "Password updated successfully.",
      });
    } catch (error) {
      console.log(error);
      return Response.json({
        success: false,
        message: error,
      });
    }
  }
}
