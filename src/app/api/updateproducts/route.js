import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  try {
    for (let i = 0; i < data.length; i++) {
      let product = await Product.findOneAndUpdate(
        { _id: data[i]._id },
        data[i]
      );
    }

    return Response.json({ message: "Products update successfully" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
