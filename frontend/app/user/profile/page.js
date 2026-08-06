"use client";

import ProtectedRoute from "../../../components/shop/auth/ProtectedRoute";
import { UserProfile } from "../../../components/shop/dashboardUser";

export default function Page() {
  return (
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  );
}