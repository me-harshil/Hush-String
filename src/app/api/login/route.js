import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();

  try {
    const user = await User.findOne({ email: data.email });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

    let decryptPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (data.password === decryptPassword) {
      var token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "4d" }
      );

      return Response.json({ success: true, token, email: user.email });
    }
    return Response.json({ success: false, error: "Invalid Credentials!" });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
