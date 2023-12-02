import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

export async function GET(request) {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let products = await Product.find({ category: "ukulele" }).lean();
  let ukulele = {};
  for (let item of products) {
    if (item.title in ukulele) {
      if (
        !ukulele[item.title].color.includes(item.color) &&
        item.availableQuantity > 0
      ) {
        ukulele[item.title].color.push(item.color);
      }
      if (
        !ukulele[item.title].size.includes(item.size) &&
        item.availableQuantity > 0
      ) {
        ukulele[item.title].size.push(item.size);
      }
    } else {
      ukulele[item.title] = JSON.parse(JSON.stringify(item));
      if (ukulele[item.title].availableQuantity > 0) {
        ukulele[item.title].color = [item.color];
        ukulele[item.title].size = [item.size];
      }
    }
  }

  // return Response.json(products);
  return Response.json(products);
}
