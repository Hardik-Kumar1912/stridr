export async function fetchPOIs([lon, lat], radius) {
  console.log(`Fetching POIs around ${lat}, ${lon} with radius ${radius}`);
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const query = `
    [out:json];
    (
      node["leisure"="park"](around:${radius},${lat},${lon});
      node["amenity"="bench"](around:${radius},${lat},${lon});
      node["tourism"="attraction"](around:${radius},${lat},${lon});
      node["amenity"="cafe"](around:${radius},${lat},${lon});
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
  return data.elements.map(({ lat, lon }) => [lat, lon]);
}
