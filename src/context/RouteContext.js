"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RouteContext = createContext();

export function RouteProvider({ children }) {
  const [route, setRoute] = useState(() => {
    if (typeof window !== "undefined") {
      const storedRoute = localStorage.getItem("route");
      // console.log("Initializing route from localStorage :", storedRoute.points);
      return storedRoute || "";
    }
    return "";
  });

  // Save route to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log("Saving route to localStorage :", JSON.stringify(route));
      localStorage.setItem("route", typeof route === "string" ? route : JSON.stringify(route));
    }
  }, [route]);

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouteContext);
}
