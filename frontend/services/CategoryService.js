import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CategoryService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axios.post(`${API_URL}/categories`, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axios.put(
      `${API_URL}/categories/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  },
};

export default CategoryService;