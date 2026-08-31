"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminLayout as AdminLayoutComponent } from "../components/layout/admin/AdminLayout";
import { authService } from "../services/auth.service";

export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // If accessing the login route, skip auth check
    if (pathname === "/admin/login") {
      setCheckingAuth(false);
      return;
    }

    const auth = authService.isAuthenticated();
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, [pathname, router]);

  // If on login route, display login page directly
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show sleek loader while checking admin session
  if (checkingAuth || !isAuthenticated) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "8px" }}>🔒 Verificando Sesión de Administrador...</div>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Acceso Restringido</span>
        </div>
      </div>
    );
  }

  return <AdminLayoutComponent>{children}</AdminLayoutComponent>;
}
