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
  const end = decodedPath[decodedPath.length - 1];

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
      <Marker position={start}>
        <Popup>Start</Popup>
      </Marker>
      <Marker position={end}>
        <Popup>End</Popup>
      </Marker>
    </MapContainer>
  );
};

export default RouteMap;


// <RouteMap encodedPolyline="}ssmDg{fvMBe@dITJDFJDL?...etc" />
