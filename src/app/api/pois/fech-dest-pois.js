export async function fetchDestPOIs([lon, lat], [lonDest, latDest]) {
  // console.log(`Fetching POIs for route from ${lat}, ${lon} to ${latDest}, ${lonDest}`);
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const radius = 1000;
  const query1 = `
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
  const query2 = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport & fitness areas
    node["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latDest},${lonDest});
    way["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latDest},${lonDest});
    relation["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${latDest},${lonDest});

    // Forests and natural wooded areas
    way["landuse"="forest"](around:${radius},${latDest},${lonDest});
    relation["landuse"="forest"](around:${radius},${latDest},${lonDest});
    way["natural"="wood"](around:${radius},${latDest},${lonDest});
    relation["natural"="wood"](around:${radius},${latDest},${lonDest});

    // Water bodies
    way["natural"="water"](around:${radius},${latDest},${lonDest});
    relation["natural"="water"](around:${radius},${latDest},${lonDest});
    way["waterway"~"^(river|riverbank)$"](around:${radius},${latDest},${lonDest});

    // Walkable paths & footways
    way["highway"~"^(footway|path|cycleway)$"](around:${radius},${latDest},${lonDest});

    // Scenic and cultural POIs
    node["tourism"~"^(attraction|viewpoint|gallery)$"](around:${radius},${latDest},${lonDest});
    node["historic"="memorial"](around:${radius},${latDest},${lonDest});
    node["amenity"="artwork"](around:${radius},${latDest},${lonDest});

    // Rest & refreshment
    node["amenity"~"^(bench|cafe|fountain|drinking_water|water_point|shelter|toilets)$"](around:${radius},${latDest},${lonDest});
    way["amenity"="cafe"](around:${radius},${latDest},${lonDest});  // In case of mapped café buildings

    // Emergency and medical
    node["amenity"~"^(hospital|clinic|first_aid)$"](around:${radius},${latDest},${lonDest});
    node["emergency"="yes"](around:${radius},${latDest},${lonDest});
  );
  out center;
`;
const [routeCentreLat, routeCentreLon] = [latDest + (latDest - lat) / 2, lonDest + (lonDest - lon) / 2];

  const query3 = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport & fitness areas
    node["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${routeCentreLat},${routeCentreLon});
    way["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${routeCentreLat},${routeCentreLon});
    relation["leisure"~"^(park|playground|pitch|track|fitness_station|nature_reserve)$"](around:${radius},${routeCentreLat},${routeCentreLon});

    // Forests and natural wooded areas
    way["landuse"="forest"](around:${radius},${routeCentreLat},${routeCentreLon});
    relation["landuse"="forest"](around:${radius},${routeCentreLat},${routeCentreLon});
    way["natural"="wood"](around:${radius},${routeCentreLat},${routeCentreLon});
    relation["natural"="wood"](around:${radius},${routeCentreLat},${routeCentreLon});

    // Water bodies
    way["natural"="water"](around:${radius},${routeCentreLat},${routeCentreLon});
    relation["natural"="water"](around:${radius},${routeCentreLat},${routeCentreLon});
    way["waterway"~"^(river|riverbank)$"](around:${radius},${routeCentreLat},${routeCentreLon});

    // Walkable paths & footways
    way["highway"~"^(footway|path|cycleway)$"](around:${radius},${routeCentreLat},${routeCentreLon});

    // Scenic and cultural POIs
    node["tourism"~"^(attraction|viewpoint|gallery)$"](around:${radius},${routeCentreLat},${routeCentreLon});
    node["historic"="memorial"](around:${radius},${routeCentreLat},${routeCentreLon});
    node["amenity"="artwork"](around:${radius},${routeCentreLat},${routeCentreLon});

    // Rest & refreshment
    node["amenity"~"^(bench|cafe|fountain|drinking_water|water_point|shelter|toilets)$"](around:${radius},${routeCentreLat},${routeCentreLon});
    way["amenity"="cafe"](around:${radius},${routeCentreLat},${routeCentreLon});  // In case of mapped café buildings

    // Emergency and medical
    node["amenity"~"^(hospital|clinic|first_aid)$"](around:${radius},${routeCentreLat},${routeCentreLon});
    node["emergency"="yes"](around:${radius},${routeCentreLat},${routeCentreLon});
  );
  out center;
`;
  const res1 = await fetch(overpassUrl, {
    method: "POST",
    body: query1,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  const res2 = await fetch(overpassUrl, {
    method: "POST",
    body: query2,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
    const res3 = await fetch(overpassUrl, {
        method: "POST",
        body: query3,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

  const data1 = await res1.json();
  const data2 = await res2.json();
  const data3 = await res3.json();
  // console.log(`Fetched ${data.elements.length} POIs`);
  // console.log("----- POI Data -----");
  // console.log(data);
  // console.log("-------POI DATA END-------");
//   return data.elements
//     .map((el) => {
//       if (el.lat != null && el.lon != null) {
//         return [el.lat, el.lon]; // node
//       } else if (el.center?.lat != null && el.center?.lon != null) {
//         return [el.center.lat, el.center.lon]; // way/relation
//       }
//       return null;
//     })
//     .filter((coord) => coord !== null);
    return [
        ...data1.elements.map((el) => {
        if (el.lat != null && el.lon != null) {
            return [el.lat, el.lon]; // node
        } else if (el.center?.lat != null && el.center?.lon != null) {
            return [el.center.lat, el.center.lon]; // way/relation
        }
        return null;
        }).filter((coord) => coord !== null),
        ...data2.elements.map((el) => {
        if (el.lat != null && el.lon != null) {
            return [el.lat, el.lon]; // node
        } else if (el.center?.lat != null && el.center?.lon != null) {
            return [el.center.lat, el.center.lon]; // way/relation
        }
        return null;
        }).filter((coord) => coord !== null),
        ...data3.elements.map((el) => {
        if (el.lat != null && el.lon != null) {
            return [el.lat, el.lon]; // node
        } else if (el.center?.lat != null && el.center?.lon != null) {
            return [el.center.lat, el.center.lon]; // way/relation
        }
        return null;
        }).filter((coord) => coord !== null),
    ];
}
