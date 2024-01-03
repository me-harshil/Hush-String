import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/app/models/Product";
import connectDB from "@/app/middleware/connectDB";

async function getProducts() {
  const mongoDB = await connectDB();
  console.log(mongoDB);
  let products = await Product.find({ category: "keyboard" }).lean();
  let keyboard = {};
  for (let item of products) {
    if (item.title in keyboard) {
      if (!keyboard[item.title].color.includes(item.color)) {
        keyboard[item.title].color.push(item.color);
      }
    } else {
      keyboard[item.title] = JSON.parse(JSON.stringify(item));

      keyboard[item.title].color = [item.color];
    }
  }

  return keyboard;
}

const Keyboards = async () => {
  const keyboard = await getProducts();
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {Object.keys(keyboard).length === 0 && (
            <p className="text-center">
              Sorry all keyboards are currently out of stock. New stock coming
              soon. Stay Tuned!
            </p>
          )}
          <div className="flex flex-wrap -m-4">
            {Object.keys(keyboard).map((product) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl"
                  key={keyboard[product]._id}
                >
                  <Link
                    href={`/product/${keyboard[product].slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <Image
                      width={420}
                      height={260}
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={`/${keyboard[product].image}`}
                    />

                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        keyboard
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {keyboard[product].title}
                      </h2>
                      <p className="mt-1">₹{keyboard[product].price}</p>
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

export default Keyboards;
