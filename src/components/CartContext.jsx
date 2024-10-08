/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const addToCart = (productToAdd) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) =>
          item.id === productToAdd.id &&
          item.selectedColor === productToAdd.selectedColor &&
          item.selectedSize === productToAdd.selectedSize
      );

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === productToAdd.id &&
          item.selectedColor === productToAdd.selectedColor &&
          item.selectedSize === productToAdd.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (id, selectedColor, selectedSize) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(
        (item) =>
          item.id !== id ||
          item.selectedColor !== selectedColor ||
          item.selectedSize !== selectedSize
      )
    );
  };

  // Function to update item quantity in the cart
  const updateQuantity = (id, selectedColor, selectedSize, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
