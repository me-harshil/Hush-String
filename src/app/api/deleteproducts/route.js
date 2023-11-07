import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  try {
    for (let i = 0; i < data.length; i++) {
      try {
        let product = await Product.findByIdAndDelete(data[i]);
      } catch (error) {
        console.log(error.message);
      }
    }

    return Response.json({ message: "Products deleted successfully" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
