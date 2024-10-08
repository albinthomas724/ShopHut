import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get("https://localhost:7100/api/Product");
  return response.data;
};