"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authenticated = AuthService.isAuthenticate();
    const admin = AuthService.isAdmin();

    // Chưa đăng nhập hoặc là Admin
    if (!authenticated || admin) {
      router.replace("/");
      return;
    }

    setAuthorized(true);
    setChecking(false);
  }, [router]);

  // Đang kiểm tra đăng nhập
  if (checking) {
    return null;
  }

  // Không có quyền
  if (!authorized) {
    return null;
  }

  // Đã đăng nhập và không phải Admin
  return children;
}