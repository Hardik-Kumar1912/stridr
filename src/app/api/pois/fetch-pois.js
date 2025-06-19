export async function fetchPOIs([lon, lat], radius) {
  console.log(`Fetching POIs around ${lat}, ${lon} with radius ${radius}`);
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const query = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport tracks
    node["leisure"="park"](around:${radius},${lat},${lon});
    way["leisure"="park"](around:${radius},${lat},${lon});
    relation["leisure"="park"](around:${radius},${lat},${lon});
    node["leisure"="playground"](around:${radius},${lat},${lon});
    way["leisure"="playground"](around:${radius},${lat},${lon});
    node["leisure"="pitch"](around:${radius},${lat},${lon});
    way["leisure"="pitch"](around:${radius},${lat},${lon});
    node["leisure"="track"](around:${radius},${lat},${lon});
    way["leisure"="track"](around:${radius},${lat},${lon});

    // Nature reserves / forests
    way["leisure"="nature_reserve"](around:${radius},${lat},${lon});
    relation["leisure"="nature_reserve"](around:${radius},${lat},${lon});
    way["landuse"="forest"](around:${radius},${lat},${lon});
    relation["landuse"="forest"](around:${radius},${lat},${lon});
    way["natural"="wood"](around:${radius},${lat},${lon});
    relation["natural"="wood"](around:${radius},${lat},${lon});

    // Rivers & lakes
    way["waterway"="river"](around:${radius},${lat},${lon});
    way["waterway"="riverbank"](around:${radius},${lat},${lon});
    way["natural"="water"]["water"="lake"](around:${radius},${lat},${lon});

    // Tourist spots & viewpoints
    node["tourism"="attraction"](around:${radius},${lat},${lon});
    way["tourism"="attraction"](around:${radius},${lat},${lon});
    node["tourism"="viewpoint"](around:${radius},${lat},${lon});
    way["tourism"="viewpoint"](around:${radius},${lat},${lon});

    // Amenities for runners
    node["amenity"="bench"](around:${radius},${lat},${lon});
    node["amenity"="cafe"](around:${radius},${lat},${lon});
    way["amenity"="cafe"](around:${radius},${lat},${lon});
    node["amenity"="fountain"](around:${radius},${lat},${lon});
    node["amenity"="drinking_water"](around:${radius},${lat},${lon});
    node["amenity"="water_point"](around:${radius},${lat},${lon});
    node["amenity"="fountain"]["drinking_water"="yes"](around:${radius},${lat},${lon});

    // Peaceful, scenic, historical
    node["amenity"="artwork"](around:${radius},${lat},${lon});
    node["historic"="memorial"](around:${radius},${lat},${lon});
    node["tourism"="gallery"](around:${radius},${lat},${lon});
  );
  out center;
`;

  const res = await fetch(overpassUrl, {
    method: "POST",
    body: query,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = await res.json();
  console.log(`Fetched ${data.elements.length} POIs`);
  console.log("----- POI Data -----");
  console.log(data);
  console.log("-------POI DATA END-------");
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
