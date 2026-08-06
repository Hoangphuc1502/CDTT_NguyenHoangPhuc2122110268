"use client";

import AdminProtectedRoute from "@/components/shop/auth/AdminProtectedRoute";
import { Categories } from "@/components/admin";

export default function Page() {
  return (
    <AdminProtectedRoute>
      <Categories />
    </AdminProtectedRoute>
  );
}