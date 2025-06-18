// context/MapContext.js
"use client";
import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]); // Default to Delhi
  const [routeCoordinates, setRouteCoordinates] = useState([]); // [[lat, lng], [lat, lng], ...]

  return (
    <MapContext.Provider value={{ userLocation, setUserLocation, routeCoordinates, setRouteCoordinates }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);

// components/Map.js
"use client";
import { useEffect } from "react";
import { useMap } from "../context/MapContext";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(mod => mod.Polyline), { ssr: false });

const Map = () => {
  const { userLocation, routeCoordinates } = useMap();

  return (
    <MapContainer center={userLocation} zoom={14} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={userLocation} />
      {routeCoordinates.length > 1 && <Polyline positions={routeCoordinates} color="blue" />}
    </MapContainer>
  );
};

export default Map;