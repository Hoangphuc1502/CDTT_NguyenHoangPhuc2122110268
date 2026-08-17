import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ==================== CHECKOUT ====================

// Lấy Braintree Token
export const getBrainTreeToken = async () => {
  try {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const uId = jwt?.user?._id;

    const res = await axios.post(
      `${API_URL}/api/braintree/get-token`,
      { uId }
    );

    return res.data;
  } catch (error) {
    console.error("Get Braintree token error:", error);
    throw error;
  }
};

// Tạo đơn hàng
export const createOrder = async (orderData) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/order/create-order`,
      orderData
    );

    return res.data;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

// ==================== ORDER ====================

// Lấy tất cả đơn hàng
export const getAllOrder = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/order/get-all-orders`
    );

    return res.data;
  } catch (error) {
    console.error("Get all orders error:", error);
    throw error;
  }
};

// Lấy đơn hàng theo User
export const getOrderByUser = async (userId) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/order/get-order-by-user`,
      {
        uId: userId,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Get order by user error:", error);
    throw error;
  }
};

// ==================== ADMIN ORDER ====================

// Cập nhật trạng thái đơn hàng
export const editOrder = async (oId, status) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/order/update-order`,
      {
        oId,
        status,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Update order error:", error);
    throw error;
  }
};

// Xóa đơn hàng
export const deleteOrder = async (oId) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/order/delete-order`,
      {
        oId,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Delete order error:", error);
    throw error;
  }
};