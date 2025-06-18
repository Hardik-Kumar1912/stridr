// src/app/api/route/featureCollection.js
export async function getFeatureCollection(pois) {
  if (!pois || !Array.isArray(pois) || pois.length === 0) {
    console.error("No points of interest provided:", pois);
    return {};
  }
  console.log("Points of interest:", pois);
  const features = pois.map((poi, index) => {
    if (!Array.isArray(poi) || poi.length !== 2) {
      throw new Error("Invalid POI coordinates");
    }
    return {
      type: "Feature",
      id: `poi_${index}`,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [poi[0] - 0.01, poi[1] - 0.01],
            [poi[0] + 0.01, poi[1] - 0.01],
            [poi[0] + 0.01, poi[1] + 0.01],
            [poi[0] - 0.01, poi[1] + 0.01],
            [poi[0] - 0.01, poi[1] - 0.01],
          ],
        ],
      },
    };
  });
  const featureCollection = {
    type: "FeatureCollection",
    features: features,
  };
  console.log("Generated feature collection:", featureCollection);
  return featureCollection;
}
