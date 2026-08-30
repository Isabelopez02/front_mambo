"use client";

import React from "react";
import { ClientLayout } from "../components/layout/client/ClientLayout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
