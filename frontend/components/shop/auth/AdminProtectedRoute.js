"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthService from "@/services/AuthService";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authenticated = AuthService.AuthService.isAuthenticate();
    const admin = AuthService.AuthService.isAdmin();

    if (!authenticated || !admin) {
      router.replace("/user/profile");
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