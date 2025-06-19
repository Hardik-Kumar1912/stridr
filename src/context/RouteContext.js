"use client";

import { createContext, useContext, useState } from "react";

const RouteContext = createContext();

export function RouteProvider({ children }) {
  const [polyline, setPolyline] = useState("");

  return (
    <RouteContext.Provider value={{ polyline, setPolyline }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouteContext);
}
