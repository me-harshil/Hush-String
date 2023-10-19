import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div>
      <header className="text-gray-600 body-font shadow-xl">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">HushString</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" href="/">
              Ukulele
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/">
              Guitar
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/">
              Keyboard/Piano
            </Link>
            <Link className="mr-5 hover:text-gray-900" href="/">
              Drum Kit
            </Link>
          </nav>
          <div className="cart absolute right-0 mx-4">
            <AiOutlineShoppingCart className="text-2xl" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
