import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardService = {
  // Lấy dữ liệu Dashboard
  getDashboardData: async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/customize/dashboard-data`
      );

      return response.data;
    } catch (error) {
      console.error("Get dashboard data error:", error);
      throw error;
    }
  },

  // Lấy danh sách slider
  getSliderImages: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/customize/get-slide-image`
      );

      return response.data;
    } catch (error) {
      console.error("Get slider images error:", error);
      throw error;
    }
  },

  // Upload slider
  uploadSliderImage: async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/customize/upload-slide-image`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Upload slider image error:", error);
      throw error;
    }
  },

  // Xóa slider
  deleteSliderImage: async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/customize/delete-slide-image`,
        { id }
      );

      return response.data;
    } catch (error) {
      console.error("Delete slider image error:", error);
      throw error;
    }
  },
};

export default DashboardService;