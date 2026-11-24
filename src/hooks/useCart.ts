import { useEffect, useMemo, useState } from "react";
import type { CartItemType } from "../types";

const useCart = () => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartItemType) => {
    const itemExists = cart.findIndex((guitar: CartItemType) => guitar.id === product.id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const removeToCart = (id: CartItemType["id"]) => {
    const updatedCart = cart.filter((item: CartItemType) => item.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id: CartItemType["id"]) => {
    const updatedCart = cart.map((item: CartItemType) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  const decreaseQuantity = (id: CartItemType["id"]) => {
    const updatedCart = cart.map((item: CartItemType) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total: number, item: CartItemType) => total + item.price * item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  };
};

export default useCart;
