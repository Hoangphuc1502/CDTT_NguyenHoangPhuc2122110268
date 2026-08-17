import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getHeaders = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return {};
  }

  const token = JSON.parse(jwt)?.token;

  return {
    headers: {
      token: `Bearer ${token}`,
    },
  };
};

const CategoryService = {
  // Lấy tất cả category
  getAllCategory: async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/category/all-category`,
        getHeaders()
      );

      return response.data;
    } catch (error) {
      console.error("Get all category error:", error);
      throw error;
    }
  },

  // Thêm category
  createCategory: async ({
    cName,
    cImage,
    cDescription,
    cStatus,
  }) => {
    const formData = new FormData();

    formData.append("cImage", cImage);
    formData.append("cName", cName);
    formData.append("cDescription", cDescription);
    formData.append("cStatus", cStatus);

    try {
      const response = await axios.post(
        `${API_URL}/api/category/add-category`,
        formData,
        getHeaders()
      );

      return response.data;
    } catch (error) {
      console.error("Create category error:", error);
      throw error;
    }
  },

  // Sửa category
  editCategory: async (cId, des, status) => {
    const data = {
      cId,
      cDescription: des,
      cStatus: status,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/category/edit-category`,
        data,
        getHeaders()
      );

      return response.data;
    } catch (error) {
      console.error("Edit category error:", error);
      throw error;
    }
  },

  // Xóa category
  deleteCategory: async (cId) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/category/delete-category`,
        { cId },
        getHeaders()
      );

      return response.data;
    } catch (error) {
      console.error("Delete category error:", error);
      throw error;
    }
  },
};

export default CategoryService;