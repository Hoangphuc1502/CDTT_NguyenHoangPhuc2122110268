"use client";

import AdminProtectedRoute from "@/components/shop/auth/AdminProtectedRoute";
import { Products } from "@/components/admin";

export default function Page() {
  return (
    <AdminProtectedRoute>
      <Products />
    </AdminProtectedRoute>
  );
}