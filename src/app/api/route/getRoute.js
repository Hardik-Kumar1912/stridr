export async function getRoute(
  user_location_cords, // [lon, lat]
  route_distance, // desired total round-trip length in meters
  poiCount, // number of POI areas in featureCollection
  featureCollection // GeoJSON FeatureCollection to influence routing
) {
  const url = "http://localhost:8989/route";

  // Build custom_model
  const customModel = {
    priority: Array.from({ length: poiCount }, (_, i) => ({
      if: `in_poi_${i} == false`,
      multiply_by: "0.1",
    })),
    areas: featureCollection,
    distance_influence: 100,
  };

  const payload = {
    points: [user_location_cords], // start from here
    profile: "car",
    algorithm: "round_trip",
    "round_trip.distance": route_distance,
    "ch.disable": true,
    custom_model: customModel,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Round-trip data:", data.paths);
    return data.paths;
  } catch (e) {
    console.error("Error fetching round-trip:", e);
    throw e;
  }
}
