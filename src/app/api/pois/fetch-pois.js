export async function fetchPOIs([lon, lat], radius) {
  // console.log(`Fetching POIs around ${lat}, ${lon} with radius ${radius}`);
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const query = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport & fitness areas
    node["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${lat},${lon});
    way["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${lat},${lon});
    relation["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${lat},${lon});

    // Forests and natural wooded areas
    way["landuse"="forest"](around:${radius},${lat},${lon});
    relation["landuse"="forest"](around:${radius},${lat},${lon});
    way["natural"="wood"](around:${radius},${lat},${lon});
    relation["natural"="wood"](around:${radius},${lat},${lon});

    // Water bodies
    way["natural"="water"](around:${radius},${lat},${lon});
    relation["natural"="water"](around:${radius},${lat},${lon});
    way["waterway"~"^(river|riverbank)$"](around:${radius},${lat},${lon});

    // Walkable paths & footways
    way["highway"~"^(footway|path|cycleway)$"](around:${radius},${lat},${lon});

    // Scenic and cultural POIs
    node["tourism"~"^(attraction|viewpoint|gallery)$"](around:${radius},${lat},${lon});
    node["historic"="memorial"](around:${radius},${lat},${lon});
    node["amenity"="artwork"](around:${radius},${lat},${lon});

    // Rest & refreshment
    node["amenity"~"^(bench|cafe|fountain|drinking_water|water_point|shelter|toilets)$"](around:${radius},${lat},${lon});
    way["amenity"="cafe"](around:${radius},${lat},${lon});  // In case of mapped café buildings

    // Emergency and medical
    node["amenity"~"^(hospital|clinic|first_aid)$"](around:${radius},${lat},${lon});
    node["emergency"="yes"](around:${radius},${lat},${lon});
  );
  out center;
`;

  const res = await fetch(overpassUrl, {
    method: "POST",
    body: query,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const data = await res.json();
  // console.log(`Fetched ${data.elements.length} POIs`);
  // console.log("----- POI Data -----");
  // console.log(data);
  // console.log("-------POI DATA END-------");
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
