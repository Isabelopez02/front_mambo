"use client";

import React from "react";
import { AdminLayout as AdminLayoutComponent } from "../components/layout/admin/AdminLayout";

export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
