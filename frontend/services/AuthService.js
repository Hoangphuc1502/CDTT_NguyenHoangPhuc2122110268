import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthService = {
  login: async ({ email, password }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/signin`,
        {
          email,
          password,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  signup: async ({ name, email, password, cPassword }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/signup`,
        {
          name,
          email,
          password,
          cPassword,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  isAuthenticate: () => {
    if (typeof window === "undefined") {
      return false;
    }

    const jwt = localStorage.getItem("jwt");

    return jwt ? JSON.parse(jwt) : false;
  },

  isAdmin: () => {
    if (typeof window === "undefined") {
      return false;
    }

    const jwt = localStorage.getItem("jwt");

    return jwt
      ? JSON.parse(jwt).user.role === 1
      : false;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishList");

      window.location.href = "/";
    }
  },
};

export default AuthService;