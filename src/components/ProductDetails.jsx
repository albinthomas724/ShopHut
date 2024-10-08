import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@mui/material";
import { useCart } from "../components/CartContext"; // Adjust the path if necessary
import { toast } from 'react-toastify';
import { fetchProductDetails } from "../api/productIdApi"; // Import the API function

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // For image thumbnails
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
        setSelectedImage(productData.images[0]); // Default to the first image
        setSelectedColor(productData.colors[0]); // Default to the first color
        setSelectedSize(productData.sizes[0]); // Default to the first size
      } catch (err) {
        setError("Failed to load product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select a size and color");
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      selectedColor,
      selectedSize,
      image: selectedImage,
      quantity: 1, // Default quantity is 1
    };

    addToCart(productToAdd);
    navigate("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 flex">
      {/* Left Sidebar - Image Thumbnails */}
      <div className="w-36 pr-4">
        {product.images.map((image, index) => (
          <div
            key={index}
            className={`mb-3 cursor-pointer border ${
              selectedImage === image ? "border-blue-500" : "border-gray-300"
            } rounded-lg`}
            onClick={() => setSelectedImage(image)}
            style={{ height: "100px", width: "100px", overflow: "hidden" }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-3/4 flex">
        {/* Main Product Image */}
        <div className="w-1/2 pr-8">
          <div className="h-96 w-full overflow-hidden rounded-lg">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-1/2">
          <Typography
            variant="h5"
            component="h1"
            className="text-2xl font-bold mb-4"
          >
            {product.name}
          </Typography>

          <Typography variant="body1" className="text-gray-600 mb-2">
            {product.description}
          </Typography>

          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            className="mb-4"
          />
          <Typography variant="body2" className="text-gray-500 mb-4">
            ({product.reviews} Reviews)
          </Typography>

          <Typography
            variant="h6"
            className="font-semibold text-xl text-red-500 mb-4"
          >
            ₹{product.price}
          </Typography>

          {/* Color Selector */}
          <Typography variant="body1" className="mb-2 font-semibold">
            Select Color:
          </Typography>
          <div className="flex space-x-2 mb-4">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border cursor-pointer ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>

          {/* Size Selector */}
          <Typography variant="body1" className="mb-2 font-semibold">
            Select Size:
          </Typography>
          <div className="grid grid-cols-6 gap-2 mb-4">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                className={`border px-2 py-1 rounded w-fit ${
                  selectedSize === size ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="contained"
              color="primary"
              className="w-full py-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              className="w-full py-3"
              onClick={() => toast.success('Purchase Successful')}
              sx={{
                backgroundColor: "#fb5607",
              }}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
