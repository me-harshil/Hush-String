"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = () => {
  const ref = useRef();

  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div>
      <header className="text-gray-600 body-font shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="ml-3 text-xl">HushString</span>
          </Link>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" href="/ukulele">
              Ukulele
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/guitars">
              Guitar
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/keyboards">
              Keyboard/Piano
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/drum-kits">
              Drum Kit
            </Link>
          </nav>
          <div
            className="cart absolute right-0 mx-4 cursor-pointer"
            onClick={toggleCart}
          >
            <AiOutlineShoppingCart className="text-2xl" />
          </div>
          <div
            ref={ref}
            className="w-72 h-full sideCart absolute top-0 right-0 px-7 py-10 transform transition-transform translate-x-full bg-blue-100"
          >
            <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
            <span
              className="absolute top-5 right-2 cursor-pointer text-2xl text-blue-300"
              onClick={toggleCart}
            >
              <GrFormClose />
            </span>
            <ol className="list-decimal font-semibold">
              <li>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">Ukulele - play easy</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold text-lg">
                    <HiOutlineMinusCircle className="cursor-pointer text-blue-500" />
                    <span className="mx-2">1</span>
                    <HiOutlinePlusCircle className="cursor-pointer text-blue-500" />
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">Ukulele - play easy</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold">
                    1
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">Ukulele - play easy</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold">
                    1
                  </div>
                </div>
              </li>
              <li>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">Ukulele - play easy</div>
                  <div className="w-1/3 flex items-center justify-center font-semibold">
                    1
                  </div>
                </div>
              </li>
            </ol>
            <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
              <BsFillBagCheckFill className="m-1"/>
              Checkout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
