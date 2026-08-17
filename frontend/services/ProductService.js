import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ProductService = {
  getAllProduct: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      console.error("Get all products error:", error);
      throw error;
    }
  },

  productByPrice: async (price) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products/price/${price}`
      );
      return response.data;
    } catch (error) {
      console.error("Get products by price error:", error);
      throw error;
    }
  },

  productByCategory: async (catId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/products/category/${catId}`
      );
      return response.data;
    } catch (error) {
      console.error("Get products by category error:", error);
      throw error;
    }
  },
};

export default ProductService;