export async function getDestRoute(
  user_location_cords, // [lon, lat]
  dest_location_cords,
  poiCount,
  featureCollection,
) {
  const GRAPHHOPPER_HOST_URL =
    process.env.GRAPHHOPPER_HOST_URL || "http://localhost:8989";
  const url = `${GRAPHHOPPER_HOST_URL}/route`;

  const customModel = {
    priority: Array.from(
      { length: poiCount },
      (_, i) => (
        {
          if: `in_primary_poi_${i}`,
          multiply_by: "50",
        }
      ),
    ),
    areas: featureCollection,
    distance_influence: 100,
  };

  const payload = {
    points: [user_location_cords, dest_location_cords],
    profile: "foot",
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
    return data.paths;
  } catch (e) {
    console.error("Error fetching destination route:", e);
    throw e;
  }
}
