"use client";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapboxPolyline from "@mapbox/polyline";
import { useEffect, useState } from "react";
import { useRoute } from "@/context/RouteContext";
import L from "leaflet";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome for vector icon

const RouteMap = () => {
  const { polyline } = useRoute();
  const [decodedPath, setDecodedPath] = useState([]);

  useEffect(() => {
    if (typeof polyline === "string" && polyline.length > 0) {
      try {
        const decoded = mapboxPolyline.decode(polyline);
        setDecodedPath(decoded);
      } catch (err) {
        console.error("Failed to decode polyline:", err);
      }
    } else {
      console.warn("Invalid or empty polyline in context:", polyline);
    }
  }, [polyline]);

  if (!decodedPath.length) return <p>Loading map...</p>;

  const start = decodedPath[0];

  // Custom vector start icon
  const startIcon = new L.DivIcon({
    html: `<div style="font-size: 24px; color: green;"><i class="fas fa-map-marker-alt"></i></div>`,
    className: "custom-start-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer
      center={start}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={decodedPath} color="blue" />

      <Marker position={start} icon={startIcon}>
        <Popup>Start</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RouteMap;
