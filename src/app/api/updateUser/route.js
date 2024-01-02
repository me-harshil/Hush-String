import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";

export async function POST(request) {
  let data = await request.json();
  const mongoDB = await connectDB();
  console.log(mongoDB);

  try {
    await User.findOneAndUpdate(
      { email: data.email },
      {
        name: data.name,
        address: data.address,
        phone: data.phone,
        pincode: data.pincode,
      }
    );
    return Response.json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
