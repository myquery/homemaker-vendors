// "use client";

// import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
// import { ThemeProvider } from "next-themes";
// import VendorAuth from "@/components/Layouts/landing/VendorAuth";
// import { Provider as ReduxProvider } from "react-redux";
// import { store } from "@/redux/store"; // Ensure correct path
// import { useEffect, useState } from "react";

// export function Providers({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("authToken");
//       setIsAuthenticated(!!token);
//     };
  
//     checkAuth(); // ✅ Check once on mount
  
//     window.addEventListener("storage", checkAuth); // ✅ Listen for token changes
//     return () => window.removeEventListener("storage", checkAuth); // Cleanup
//   }, []);
  

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Show a loader while checking auth status
//   }

//   return (
//     <ReduxProvider store={store}>
//       <ThemeProvider defaultTheme="light" attribute="class">
//         {isAuthenticated ? (
//           <SidebarProvider>{children}</SidebarProvider> // Show sidebar when authenticated
//         ) : (
//           <VendorAuth /> // Show sign-in page when not authenticated
//         )}
//       </ThemeProvider>
//     </ReduxProvider>
//   );
// }


"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import VendorAuth from "@/components/Layouts/landing/VendorAuth";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <AuthWrapper>{children}</AuthWrapper>
    </ReduxProvider>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false; // ✅ Prevents SSR issues
    return !!localStorage.getItem("authToken"); // ✅ Read token before render
  });

  // useEffect(() => {
  //   setIsClient(true);

  //   const handleStorageChange = () => {
  //     setIsAuthenticated(!!localStorage.getItem("authToken"));
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);
  useEffect(() => {
    setIsClient(true); // Ensures this runs only on the client
  
    const token = localStorage.getItem("authToken");
  
    // Only update state if there's a change
    setIsAuthenticated((prev) => prev !== !!token ? !!token : prev);
  }, []);

  // 🛑 Prevent rendering *anything* until client-side check is complete
  if (!isClient) return <div>Loading...</div>;

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      {isAuthenticated ? (
        <SidebarProvider>{children}</SidebarProvider>
      ) : (
        <VendorAuth />
      )}
    </ThemeProvider>
  );
}
