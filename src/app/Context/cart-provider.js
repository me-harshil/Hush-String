"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });

  const checkLocalStoreageOnReloadOrRevisit = () => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
    }
   
  };

  const logout = () => {
    toast.success("Logout Successfully!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    localStorage.clear();
    setUser({ value: null });
    router.push("/");
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = 0;
    Object.keys(cart).map((itemCode) => {
      total += cart[itemCode].quantity * cart[itemCode].price;
    });
    setSubTotal(total);
  };

  const addToCart = (itemCode, quantity, price, variant, name) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].quantity += quantity;
    } else {
      newCart[itemCode] = { quantity, price, variant, name };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (itemCode) => {
    let newCart = cart;

    if (itemCode in newCart) {
      newCart[itemCode].quantity -= 1;
    }
    if (newCart[itemCode].quantity === 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, quantity, price, variant, name) => {
    setCart({});
    let newCart = {};
    newCart[itemCode] = { quantity, price, variant, name };

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CartContext.Provider
        value={{
          removeFromCart,
          clearCart,
          addToCart,
          saveCart,
          cart,
          checkLocalStoreageOnReloadOrRevisit,
          subTotal,
          setSubTotal,
          buyNow,
          user,
          logout,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
