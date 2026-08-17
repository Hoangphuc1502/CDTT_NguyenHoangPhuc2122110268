import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ReviewService = {
  getByProduct: async (productId) => {
    const response = await axios.get(
      `${API_URL}/reviews/product/${productId}`
    );
    return response.data;
  },

  create: async (data) => {
    const response = await axios.post(
      `${API_URL}/reviews`,
      data
    );
    return response.data;
  },

  update: async (id, data) => {
    const response = await axios.put(
      `${API_URL}/reviews/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(
      `${API_URL}/reviews/${id}`
    );
    return response.data;
  },
};

export default ReviewService;