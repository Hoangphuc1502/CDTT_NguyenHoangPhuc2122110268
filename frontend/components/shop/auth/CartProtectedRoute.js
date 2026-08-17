"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";

export default function CartProtectedRoute({ children }) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authenticated = AuthService.AuthService.isAuthenticate();

    let cart = [];

    try {
      const cartData = localStorage.getItem("cart");
      cart = cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Cart error:", error);
      cart = [];
    }

    if (!authenticated || !Array.isArray(cart) || cart.length === 0) {
      router.replace("/");
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router]);

  if (checking) {
    return null;
  }

  if (!authorized) {
    return null;
  }

  return children;
}