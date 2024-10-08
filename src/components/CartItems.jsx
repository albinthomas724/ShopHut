import { useCart } from "../components/CartContext";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(
        item.id,
        item.selectedColor,
        item.selectedSize,
        item.quantity - 1
      );
    }
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(
      item.id,
      item.selectedColor,
      item.selectedSize,
      item.quantity + 1
    );
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id, item.selectedColor, item.selectedSize);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between mb-3">
        <Typography variant="h5" className="mb-6">
          Your Cart {totalItems > 0 && `(${totalItems})`}
        </Typography>
        {totalItems > 0 && (
          <Button
            variant="contained"
            className="py-1 w-auto mb-2"
            onClick={() => toast.success("Purchase Successfull")}
            sx={{
              backgroundColor: "#fb5607",
            }}
          >
            Buy Now
          </Button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty</Typography>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              {/* Product Image */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Box>

              {/* Product Details */}
              <div className="flex-grow ml-4">
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1" className="text-gray-600">
                  Color:{" "}
                  <span
                    style={{ backgroundColor: item.selectedColor }}
                    className="inline-block w-4 h-4 rounded-full border"
                  />
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Size: {item.selectedSize}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1" className="font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex">
                  {/* Quantity Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outlined"
                      onClick={() => handleDecreaseQuantity(item)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Typography variant="body1" className="px-2">
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
