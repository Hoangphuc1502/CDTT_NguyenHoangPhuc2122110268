"use client";

import AdminProtectedRoute from "@/components/shop/auth/AdminProtectedRoute";
import { Orders } from "@/components/admin";

export default function Page() {
  return (
    <AdminProtectedRoute>
      <Orders />
    </AdminProtectedRoute>
  );
}