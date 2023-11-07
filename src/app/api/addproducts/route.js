import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

// How to request body in Next.js API
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#request-body

export async function POST(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  const data = await request.json();
  try {
    for (let i = 0; i < data.length; i++) {
      let product = new Product({
        title: data[i].title,
        slug: data[i].slug,
        description: data[i].description,
        image: data[i].image,
        category: data[i].category,
        size: data[i].size,
        color: data[i].color,
        price: data[i].price,
        availableQuantity: data[i].availableQuantity,
      });
      await product.save();
    }

    return Response.json({ message: "Products added successfully" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
