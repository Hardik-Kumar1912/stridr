import { poiSyntax } from "../../../utils/poiSyntax.js";


export async function fetchPOIs([lon, lat], radius, priorities) {
  // console.log(`Fetching POIs around ${lat}, ${lon} with radius ${radius}`);
  if (!priorities || !Array.isArray(priorities) || priorities.length === 0) {
    return [];
  }
  if (!lat || !lon || typeof lat !== "number" || typeof lon !== "number") {
    throw new Error("Invalid coordinates provided. Latitude and longitude must be numbers.");
  }
  if (typeof radius !== "number" || radius <= 0) {
    throw new Error("Invalid radius provided. Radius must be a positive number.");
  }

  const poiTypes = poiSyntax({ radius, longitude: lon, latitude: lat });

  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const query = `
  [out:json][timeout:25];
  (
    ${priorities.map((priority) => {
    return poiTypes[priority];
  }).join('\n')
    }
  );
  out center;
`;

  const res = await fetch(overpassUrl, {
    method: "POST",
    body: query,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = await res.json();
  if(process.env.NEXT_PUBLIC_DEBUGGING === "ON") {
    console.log(`Fetched ${data.elements.length} POIs`);
    console.log("----- POI Data -----");
    console.log(data);
    console.log("-------POI DATA END-------");
  }
  return data.elements
    .map((el) => {
      if (el.lat != null && el.lon != null) {
        return [el.lat, el.lon]; // node
      } else if (el.center?.lat != null && el.center?.lon != null) {
        return [el.center.lat, el.center.lon]; // way/relation
      }
      return null;
    })
    .filter((coord) => coord !== null);
}
