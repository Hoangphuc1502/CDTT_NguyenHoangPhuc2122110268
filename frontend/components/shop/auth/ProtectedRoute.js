"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticate, isAdmin } from "./fetchApi";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticate() || isAdmin()) {
      router.replace("/");
    }
  }, [router]);

  if (!isAuthenticate() || isAdmin()) {
    return null;
  }

  return children;
}