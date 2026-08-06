"use client";

import AdminProtectedRoute from "@/components/shop/auth/AdminProtectedRoute";
import { DashboardAdmin } from "@/components/admin";

export default function Page() {
  return (
    <AdminProtectedRoute>
      <DashboardAdmin />
    </AdminProtectedRoute>
  );
}