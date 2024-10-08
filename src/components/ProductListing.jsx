import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import CartButton from "./CartButton";
import { useScroll } from "../components/CategoryScrollContext";
import { CircularProgress } from "@mui/material";
import { fetchProducts } from "../api/productApi";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { sectionsRef } = useScroll(); // Get sectionsRef from context

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        console.log('Fetched products:', productsData);
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Filter products based on the search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.types &&
        product.types.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="m-6 ">
      <div className="product-listing mt-20">
        <div className="relative w-56">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </span>
          <input
            type="text"
            placeholder="Search Products"
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 text-sm h-8"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {Object.keys(groupedProducts).length === 0 ? (
          <Typography variant="h6" className="text-center">
            No products found
          </Typography>
        ) : (
          Object.keys(groupedProducts).map((category) => (
            <div
              key={category}
              ref={(el) => (sectionsRef.current[category] = el)} // Register section reference
              className="pt-20"
            >
              <Typography
                variant="h5"
                component="h4"
                sx={{ mb: 4 }}
                className="text-center"
              >
                {category}
              </Typography>
              <Grid container spacing={4}>
                {groupedProducts[category].map((product) => (
                  <Grid item key={product.id} xs={8} sm={6} md={4} lg={2}>
                    <Box className="relative w-38">
                      <Card
                        className="w-38 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        sx={{ height: "260px", width: "160px" }}
                        onClick={() => handleCardClick(product.id)}
                      >
                        <Box
                          className="flex justify-center items-center"
                          sx={{ height: "120px", width: "100%" }}
                        >
                          <CardMedia
                            component="img"
                            image={product.images[0]}
                            alt={product.name}
                            sx={{
                              width: "100%",
                              height: "110px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "120px",
                          }}
                        >
                          <Typography variant="h8" sx={{ mb: 1 }}>
                            {product.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginBottom: -2,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ minHeight: "24px" }}
                            >
                              Price: ₹{product.price}
                            </Typography>
                            <Rating
                              value={product.rating}
                              precision={0.5}
                              readOnly
                              sx={{
                                fontSize: "16px",
                                marginTop: "4px",
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>

                      <div className="absolute top-2 right-5 z-10">
                        <CartButton product={product} />
                      </div>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductListing;
