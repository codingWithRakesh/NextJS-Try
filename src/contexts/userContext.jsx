"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    isAuthenticated: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user.isAuthenticated) {
      if (pathname !== "/login" && pathname !== "/register") {
        router.push("/login");
      }
    } else {
      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
      }
    }
  }, [user.isAuthenticated, pathname, router]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
