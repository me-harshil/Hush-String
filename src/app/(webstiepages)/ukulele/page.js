import React from "react";
import Image from "next/image";
import Link from "next/link";

async function getProducts() {
  // const url = "/api/getproducts";
  // const res = await fetch(url, {
  //   cache: "no-store",
  // });
  // const products = await res.json();
  const res = await import("@/app/api/getproducts/route.js");
  const products = await (await res.GET()).json();

  return products;
}

const Ukulele = async () => {
  const products = await getProducts();
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product) => {
              return (
                <div
                  className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-xl"
                  key={product._id}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="block relative rounded overflow-hidden"
                  >
                    <Image
                      width={420}
                      height={260}
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={`/${product.image}`}
                    />

                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Ukulele
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {product.title}
                      </h2>
                      <p className="mt-1">₹{product.price}</p>
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
