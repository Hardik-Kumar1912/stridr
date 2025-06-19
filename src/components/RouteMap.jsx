"use client";

import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";
import { useEffect, useState } from "react";

export default function RouteMap({ encodedPolyline }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (encodedPolyline) {
      const decoded = polyline.decode(encodedPolyline);
      setPositions(decoded.map(([lat, lng]) => [lat, lng]));
    }
  }, [encodedPolyline]);

  if (!positions.length) return <p>Loading map...</p>;

  const center = positions[Math.floor(positions.length / 2)];

  return (
    <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={positions} color="blue" />
    </MapContainer>
  );
}
