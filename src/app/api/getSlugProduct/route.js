import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

export async function GET(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const slug='concert-ukulele'
  let product = await Product.findOne({ slug: slug }).lean();

  return Response.json(product);
}
