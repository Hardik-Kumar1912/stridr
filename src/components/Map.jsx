// src/components/Map.jsx
"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMapContext } from "../context/MapContext";

// Optional: fix default marker icon in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const { userCoords, routeCoords } = useMapContext();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && userCoords) {
      mapRef.current.setView(userCoords, 15);
    }
  }, [userCoords]);

  return (
    <MapContainer
      center={userCoords || [28.6139, 77.209]}
      zoom={14}
      style={{ height: "80vh", width: "100%", borderRadius: "1rem" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userCoords && <Marker position={userCoords} />}

      {routeCoords.length > 1 && <Polyline positions={routeCoords} color="blue" />}
    </MapContainer>
  );
}