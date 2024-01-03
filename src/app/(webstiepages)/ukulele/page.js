import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

async function getProducts() {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let products = await Product.find({ category: "ukulele" }).lean();
  let ukulele = {};
  for (let item of products) {
    if (item.title in ukulele) {
      if (!ukulele[item.title].color.includes(item.color)) {
        ukulele[item.title].color.push(item.color);
      }
    } else {
      ukulele[item.title] = JSON.parse(JSON.stringify(item));

      ukulele[item.title].color = [item.color];
    }
  }

  return ukulele;
}

const Ukulele = async () => {
  const ukulele = await getProducts();

  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {Object.keys(ukulele).length === 0 && (
            <p className="text-center">
              Sorry all ukuleles are currently out of stock. New stock coming
              soon. Stay Tuned!
            </p>
          )}
          <div className="flex flex-wrap -m-4">
            {Object.keys(ukulele).map((product) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl"
                  key={ukulele[product]._id}
                >
                  <Link
                    href={`/product/${ukulele[product].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <Image
                      width={420}
                      height={260}
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={`/${ukulele[product].image}`}
                    />

                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Ukulele
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {ukulele[product].title}
                      </h2>
                      <p className="mt-1">₹{ukulele[product].price}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ukulele;
