"use client";
import "jsvectormap/dist/jsvectormap.css";
import 'flatpickr/dist/flatpickr.min.css';
import "@/css/style.css";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect , useState} from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <UserProvider>
      <body suppressHydrationWarning={true}>{children}</body>
        </UserProvider>
      </SessionProvider>
    </html>
  );
}