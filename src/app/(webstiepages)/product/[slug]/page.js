"use server";
import connectDB from "@/app/middleware/connectDB";
import Product from "@/app/models/Product";
import ProductInfo from "./ProductInfo";
import { notFound } from "next/navigation";

const SlugProduct = async ({ params }) => {
  const mongoDB = await connectDB();
  console.log(mongoDB);

  const { slug } = params;
  try {
    let product = JSON.parse(
      JSON.stringify(await Product.findOne({ slug: slug }).lean())
    );
    let variants = await Product.find({
      title: product.title,
      category: product.category,
    }).lean();

    let colorSlug = {};
    for (let item of variants) {
      colorSlug[item.color] = { slug: item.slug };
    }

    return <ProductInfo product={product} variants={colorSlug} />;
  } catch (err) {
    notFound();
  }
};

export default SlugProduct;
