import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserService = {
  getUserById: async (uId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/signle-user`,
        { uId }
      );

      return response.data;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },

  updatePersonalInformation: async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/edit-user`,
        userData
      );

      return response.data;
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  },

  updatePassword: async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/change-password`,
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  },
};

export default UserService;