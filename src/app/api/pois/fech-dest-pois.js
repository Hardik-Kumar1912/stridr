import { PoiApiClass } from "./poi-api-syntax.js";

export async function fetchDestPOIs([lon, lat], [lonDest, latDest]) {
  // console.log(`Fetching POIs for route from ${lat}, ${lon} to ${latDest}, ${lonDest}`);
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const radius = 1000;

  const poiApiSource = usePoiSyntax({ radius, longitude: lon, latitude: lat });
  const poiApiDest = new usePoiSyntax({ radius, longitude: lonDest, latitude: latDest });

  const query1 = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport & fitness areas
    ${poiApiSource.parks}

    // Forests and natural wooded areas
    ${poiApiSource.forest}

    // Water bodies
    ${poiApiSource.water}

    // Scenic and cultural POIs
    ${poiApiSource.touristic}

    // Rest & refreshment
    ${poiApiSource.resting}

    // Emergency and medical
    ${poiApiSource.medical}
  );
  out center;
`;
  const query2 = `
  [out:json][timeout:25];
  (
    // Parks, playgrounds, sport & fitness areas
    ${poiApiDest.parks}
    // Forests and natural wooded areas
    ${poiApiDest.forest}
    // Water bodies
    ${poiApiDest.water}
    // Scenic and cultural POIs
    ${poiApiDest.touristic}

    // Rest & refreshment
    ${poiApiDest.resting}

    // Emergency and medical
    ${poiApiDest.medical}
  );
  out center;
`;

  // I want to automate this and find pois every 2 km along the route
  // For now, I will just use the midpoint of the route as the center for the search
  // This is a simple approximation, but it should work for most cases

  // Only if the distance > 2 km, otherwise just use the destination POIs

  const distance = Math.sqrt(Math.pow(latDest - lat, 2) + Math.pow(lonDest - lon, 2));
  if (distance > 2) {

    const [routeCentreLat, routeCentreLon] = [latDest + (latDest - lat) / 2, lonDest + (lonDest - lon) / 2];

    const poiApiMid = new usePoiSyntax({ radius, longitude: routeCentreLon, latitude: routeCentreLat });

    const query3 = `
    [out:json][timeout:25];
    (
      // Parks, playgrounds, sport & fitness areas
      ${poiApiMid.parks}
      
      // Forests and natural wooded areas
      ${poiApiMid.forest}
      
      // Water bodies
      ${poiApiMid.water}
      
      // Scenic and cultural POIs
      ${poiApiMid.touristic}
      
      // Rest & refreshment
      ${poiApiMid.resting}
      
      // Emergency and medical
      ${poiApiMid.medical}
      );
      out center;
      `;
    const res3 = await fetch(overpassUrl, {
      method: "POST",
      body: query3,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  }
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

  const data1 = await res1.json();
  const data2 = await res2.json();
  let data3 = { elements: [] };
  if (distance > 2) {
    data3 = await res3.json();
  }
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
