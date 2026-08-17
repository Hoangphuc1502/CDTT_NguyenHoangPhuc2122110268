import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CartService = {
  getCart: async (userId) => {
    const response = await axios.get(
      `${API_URL}/cart/${userId}`
    );
    return response.data;
  },

  addToCart: async (data) => {
    const response = await axios.post(
      `${API_URL}/cart`,
      data
    );
    return response.data;
  },

  updateQuantity: async (id, quantity) => {
    const response = await axios.put(
      `${API_URL}/cart/${id}`,
      { quantity }
    );
    return response.data;
  },

  remove: async (id) => {
    const response = await axios.delete(
      `${API_URL}/cart/${id}`
    );
    return response.data;
  },

  clear: async (userId) => {
    const response = await axios.delete(
      `${API_URL}/cart/user/${userId}`
    );
    return response.data;
  },
};

export default CartService;