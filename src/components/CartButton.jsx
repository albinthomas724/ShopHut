/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../components/CartContext";

const CartButton = ({ product }) => {
  const [isActive, setIsActive] = useState(false);
  const { addToCart } = useCart();

  const handleClick = () => {
    setIsActive(!isActive);

    // Select the first color and size from the arrays if available
    const selectedColor =
      product.colors && product.colors.length > 0
        ? product.colors[0]
        : "default-color";
    const selectedSize =
      product.sizes && product.sizes.length > 0
        ? product.sizes[0]
        : "default-size";

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      selectedColor,
      selectedSize,
      image: product.images[0],
      quantity: 1,
    };

    addToCart(productToAdd);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center p-2 rounded transition-all duration-300 
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
    >
      <FontAwesomeIcon
        icon={faShoppingCart}
        className={`mr-2 ${isActive ? "text-white" : "text-gray-800"}`}
      />
    </button>
  );
};

export default CartButton;
