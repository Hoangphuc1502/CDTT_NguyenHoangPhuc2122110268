import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const WishlistService = {
  getProducts: async () => {
    const wishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : [];

    if (wishList.length === 0) {
      return { Products: [] };
    }

    const response = await axios.post(`${API_URL}/api/wishlist`, {
      products: wishList,
    });

    return response.data;
  },
};

export default WishlistService;