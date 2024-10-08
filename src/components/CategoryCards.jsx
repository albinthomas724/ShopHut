import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import { useScroll } from "./CategoryScrollContext"; 
import { CircularProgress } from "@mui/material";
import { fetchCategories } from "../api/categoriesApi"; 

const Category = () => {
  const { handleScrollToSection } = useScroll();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
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

  return (
    <div className="justify-center mt-20">
      <div className="category-container flex flex-row justify-evenly flex-wrap">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center mx-2">
            <Card
              sx={{
                width: 128,
                height: 128,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
              onClick={() => handleScrollToSection(category.id)}
            >
              <CardActionArea>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </CardActionArea>
            </Card>
            <Typography
              gutterBottom
              variant="h9"
              component="div"
              textAlign="center"
              sx={{ marginTop: 3 }}
            >
              {category.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
