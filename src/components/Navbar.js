"use client";
import React, { useRef, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsFillBagCheckFill } from "react-icons/bs";
import { CartContext } from "@/app/Context/cart-provider";
import { MdAccountCircle } from "react-icons/md";
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
  const {
    removeFromCart,
    clearCart,
    addToCart,
    saveCart,
    cart,
    checkLocalStoreageOnReloadOrRevisit,
    subTotal,
    setSubTotal,
    user,
    logout,
  } = useContext(CartContext);
  const ref = useRef();
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    checkLocalStoreageOnReloadOrRevisit();
    setProgress(100);
    // eslint-disable-next-line
  }, [pathname]);

  const toggleCart = () => {
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
    setSidebar(!sidebar);
  };

  return (
    <>
      <LoadingBar
        color="#3B82F6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />
      <span
        onMouseOver={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
      >
        {dropdown && (
          <div className="fixed right-9 bg-white shadow-xl top-12 rounded px-5 py-2 w-32 z-40">
            <ul>
              <Link href="myaccount">
                <li className="py-1 text-sm hover:text-blue-700 font-bold">
                  My Account
                </li>
              </Link>
              <Link href="orders">
                <li className="py-1 text-sm hover:text-blue-700 font-bold">
                  My Orders
                </li>
              </Link>
              <li
                onClick={logout}
                className="py-1 text-sm hover:text-blue-700 font-bold"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </span>
      <div
        className={`sticky top-0 z-10 bg-white ${
          !sidebar ? "overflow-hidden" : ""
        }`}
      >
        <header className="text-gray-600 body-font shadow-md">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link
              href="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="ml-3 text-xl">HushString</span>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <Link className="mr-5 hover:text-blue-700" href="/ukulele">
                Ukulele
              </Link>
              <Link className="mr-5 hover:text-blue-700" href="/guitars">
                Guitar
              </Link>
              <Link className="mr-5 hover:text-blue-700" href="/keyboards">
                Keyboard/Piano
              </Link>
              <Link className="mr-5 hover:text-blue-700" href="/drum-kits">
                Drum Kit
              </Link>
            </nav>
            <div className="flex cart absolute right-0 mx-4 cursor-pointer items-center">
              {user.value && (
                <MdAccountCircle
                  onMouseOver={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                  className="text-2xl mx-2"
                />
              )}

              {!user.value && (
                <Link href={"/login"}>
                  <button className="flex mr-2 text-white bg-blue-500 border-0 py-2 px-2 md:px-4 focus:outline-none hover:bg-blue-600 rounded">
                    Login
                  </button>
                </Link>
              )}
              <AiOutlineShoppingCart
                className="text-2xl"
                onClick={toggleCart}
              />
            </div>

            <div
              ref={ref}
              className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 px-7 py-10 transition-all ${
                sidebar ? "right-0" : "-right-96"
              } bg-blue-100`}
            >
              <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
              <span
                className="absolute top-5 right-2 cursor-pointer text-2xl text-blue-300"
                onClick={toggleCart}
              >
                <GrFormClose />
              </span>
              <ol className="list-decimal font-semibold">
                {Object.keys(cart).length === 0 && (
                  <div className="text-blue-500 my-4">
                    Your cart is empty. Add items to cart.
                  </div>
                )}
                {Object.keys(cart).map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="item flex my-5">
                        <div className="w-2/3 font-semibold">
                          {cart[item].name} ({cart[item].variant})
                        </div>
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
                                item.variant,
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
              <div className="flex -mt-12">
                {/* minus margin for reduce space between button and text(0 cart text)*/}
                <Link href="/checkout">
                  <button
                    className="flex mr-2 mt-16 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm disabled:bg-blue-300"
                    disabled={Object.keys(cart).length === 0}
                  >
                    <BsFillBagCheckFill className="m-1" />
                    Checkout
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="flex mr-2 mt-16 text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-sm disabled:bg-blue-300"
                  disabled={Object.keys(cart).length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
