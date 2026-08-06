"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticate, isAdmin } from "./fetchApi";

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticate() || !isAdmin()) {
      router.replace("/user/profile");
    }
  }, [router]);

  if (!isAuthenticate() || !isAdmin()) {
    return null;
  }

  return children;
}