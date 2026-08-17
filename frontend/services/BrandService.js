import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BrandService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/brands`);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/brands/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await axios.post(`${API_URL}/brands`, data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await axios.put(
      `${API_URL}/brands/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/brands/${id}`);
    return response.data;
  },
};

export default BrandService;