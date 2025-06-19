"use client";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

const RouteMap = ({ encodedPolyline }) => {
  const decoded = polyline.decode(encodedPolyline); // [ [lat, lon], ... ]

  return (
    <MapContainer
      center={decoded[0]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={decoded} color="blue" />
    </MapContainer>
  );
};

export default RouteMap;

// <RouteMap encodedPolyline="}ssmDg{fvMBe@dITJDFJDL?...etc" />
