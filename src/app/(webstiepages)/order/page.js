"use client";
import React, { useContext } from "react";
import { CartContext } from "@/app/Context/cart-provider";
import Image from "next/image";

const Order = () => {
  const { subTotal } = useContext(CartContext);
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                HUSHSTRING
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: #831264
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been placed successfully. We will send you a
                confirmation email with tracking details when your order ships.
              </p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 text-center py-2 text-lg px-1">
                  Items
                </a>
                <a className="flex-grow border-b-2 text-center py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow border-b-2 text-center py-2 text-lg px-1">
                  Price
                </a>
              </div>

              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Ukulele(consert)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">2,900</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Ukulele(consert)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">2,900</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Ukulele(consert)</span>
                <span className="ml-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">2,900</span>
              </div>
              <div className="flex flex-col">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: ₹{subTotal}
                </span>
                <div className="my-6">
                  <button className="flex mx-0 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="/ukulele.jpg"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
