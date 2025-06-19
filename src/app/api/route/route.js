// src/app/api/route/route.js
import { fetchPOIs } from "../pois/fetch-pois";
import { getFeatureCollection } from "./featureCollection";
import { getRoute } from "./getRoute.js";

export async function POST(req) {
  console.log("Received request to modify route");
  const { user_location_cords, route_distance } = await req.json();
  const pois = await fetchPOIs(user_location_cords, route_distance / 2);
  const featureCollection = await getFeatureCollection(pois);
  const route = await getRoute(
    user_location_cords,
    route_distance,
    pois.length,
    featureCollection
  );

  return Response.json({ route });
}
