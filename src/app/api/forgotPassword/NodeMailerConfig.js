const nodemailer = require("nodemailer");
import * as dotenv from "dotenv";
dotenv.config();

export async function sendMail(subject, toEmail, name, tokenNo) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    html: ` <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow-md">

    <h1 className="text-2xl font-bold text-gray-800 mb-6">Password Reset</h1>

    <p className="text-gray-600">
        Hello ${name},

        We received a request to reset your password. If you did not make this request, please ignore this email.

        To reset your password, click the button below:
    </p>

    <a href="${process.env.NEXT_PUBLIC_HOST}/forgot-password?token=${tokenNo}" className="inline-block px-6 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">Reset Password</a>

    <p className="text-gray-600 mt-4">
        If the button above doesn't work, you can also copy and paste the following link into your browser's address bar:
    </p>

    <p className="text-blue-500 mt-2">
    ${process.env.NEXT_PUBLIC_HOST}/forgot-password?token=${tokenNo}
    </p>

    <p className="text-gray-600 mt-4">Thank you, HushString Team</p>

</div>`,
  };
  return await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
  // console.log(process.env)
}
