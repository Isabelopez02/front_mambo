"use client";

import React from "react";
import { AdminSidebar } from "../../admin/AdminSidebar";
import { AdminHeader } from "../../admin/AdminHeader";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#faf7f8" }}>
      <AdminSidebar />
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AdminHeader />
        <main style={{ padding: "32px", flexGrow: 1 }}>{children}</main>
      </div>
    </div>
  );
}
