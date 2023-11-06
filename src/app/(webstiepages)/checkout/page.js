"use client";
import React, { useContext } from "react";
import { CartContext } from "@/app/Context/cart-provider";
import Link from "next/link";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsFillBagCheckFill } from "react-icons/bs";

const Checkout = () => {
  const { cart, subTotal, clearCart, addToCart, removeFromCart } =
    useContext(CartContext);
  return (
    <div className="container m-auto px-6 md:px-24">
      <h1 className="font-bold text-4xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <div className="px-2 w-full">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">
          Address
        </label>

        <textarea
          name="address"
          id="address"
          cols="30"
          rows="3"
          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-2">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
      <div className="px-8 ">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="text-blue-500 my-4">
              Your cart is empty. Add items to cart.
            </div>
          )}
          {Object.keys(cart).map((item) => {
            return (
              <li key={item}>
                <div className="item flex my-5">
                  <div className="font-semibold">{cart[item].name}</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                    <HiOutlineMinusCircle
                      className="cursor-pointer text-blue-500"
                      onClick={() => {
                        removeFromCart(item);
                      }}
                    />
                    <span className="mx-2">{cart[item].quantity}</span>
                    <HiOutlinePlusCircle
                      className="cursor-pointer text-blue-500"
                      onClick={() => {
                        addToCart(
                          item,
                          1,
                          item.price,
                          item.size,
                          item.varient,
                          item.name
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="total font-bold  ">Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mx-4">
        <Link href="/checkout">
          <button className="flex mr-2 mt-8 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm">
            <BsFillBagCheckFill className="m-1" />
            Pay ₹{subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
