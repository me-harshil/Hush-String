import User from "@/app/models/User";
import connectDB from "@/app/middleware/connectDB";

// How to request body in Next.js API
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  console.log(data);
  try {
    const user = await User.create(data);
    await user.save();
    return Response.json({ message: "User created successfully" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
