import axios from "axios";

export const fetchCategories = async () => {
  const response = await axios.get("/Categories.json");
  return response.data;
};
