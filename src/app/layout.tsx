/* eslint-disable @next/next/no-sync-scripts */

"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/app/context/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      
      <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <UserProvider>

                <div className="font-poppins dark:bg-boxdark-2 dark:text-bodydark ">
                  {loading ? <Loader /> : children}
                </div>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}