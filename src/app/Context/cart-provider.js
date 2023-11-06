"use client";
import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

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
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = 0;
    Object.keys(cart).map((itemCode) => {
      total += cart[itemCode].quantity * cart[itemCode].price;
    });
    setSubTotal(total);
  };

  const addToCart = (itemCode, quantity, price, size, varient, name) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].quantity += quantity;
    } else {
      newCart[itemCode] = { quantity, price, size, varient, name };
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

  return (
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
