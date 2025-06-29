import { poiSyntax } from "../../../utils/poiSyntax.js";

export async function fetchDestPOIs([lon, lat], [lonDest, latDest], priorities) {
  if (!priorities || !Array.isArray(priorities) || priorities.length === 0) {
    return [];
  }
  if (process.env.NEXT_PUBLIC_DEBUGGING === "ON") {
    console.log(`Fetching POIs for route from ${lat}, ${lon} to ${latDest}, ${lonDest} with priorities: ${priorities.join(', ')}`);
  }
  const overpassUrl = `https://overpass-api.de/api/interpreter`;
  const radius = 1000;

  const poiApiSource = poiSyntax({ radius, longitude: lon, latitude: lat });
  const poiApiDest = poiSyntax({ radius, longitude: lonDest, latitude: latDest });

  const query1 = `
  [out:json][timeout:25];
  (
    ${priorities.map((priority) => poiApiSource[priority]).join('\n')}
  );
  out center;
`;
  const query2 = `
  [out:json][timeout:25];
  (
    ${priorities.map((priority) => poiApiDest[priority]).join('\n')}
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
      ${priorities.map((priority) => poiApiMid[priority]).join('\n')}
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
