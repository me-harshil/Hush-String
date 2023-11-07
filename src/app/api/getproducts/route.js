import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

export async function GET(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let products = await Product.find();

  return Response.json(products);
}
