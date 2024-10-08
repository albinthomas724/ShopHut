import axios from "axios";

export const fetchProductDetails = async (id) => {
  const response = await axios.get(`https://localhost:7100/api/Product/${id}`);
  return response.data;
};
