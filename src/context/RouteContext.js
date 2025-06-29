"use client";

import { createContext, useContext, useEffect, useState } from "react";

const RouteContext = createContext();

export function RouteProvider({ children }) {
  const [route, setRoute] = useState(() => {
    if (typeof window !== "undefined") {
      const storedRoute = localStorage.getItem("route");
      // write to a log file
      
      // console.log("Initializing route from localStorage :", storedRoute.points);
      return storedRoute || "";
    }
    return "";
  });

  // Save route to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_DEBUGGING === "ON") {
        console.log("--from RouteContext.js file--");
        console.log("RouteContext: Saving route to localStorage :", route);
        console.log("--End of RouteContext.js file--");
      }
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
