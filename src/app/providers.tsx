"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import VendorAuth from "@/components/Layouts/landing/VendorAuth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store"; // Ensure correct path
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };
  
    checkAuth(); // ✅ Check once on mount
  
    window.addEventListener("storage", checkAuth); // ✅ Listen for token changes
    return () => window.removeEventListener("storage", checkAuth); // Cleanup
  }, []);
  

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loader while checking auth status
  }

  return (
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="light" attribute="class">
        {isAuthenticated ? (
          <SidebarProvider>{children}</SidebarProvider> // Show sidebar when authenticated
        ) : (
          <VendorAuth /> // Show sign-in page when not authenticated
        )}
      </ThemeProvider>
    </ReduxProvider>
  );
}
