// src/app/api/route/route.js
import { fetchPOIs } from "../pois/fetch-pois";
import { getFeatureCollection } from "./featureCollection";
import { getRoute } from "./getRoute.js";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  await auth.protect();
  console.log("Received request to modify route");
  const { user_location_cords, route_distance } = await req.json();
  if (!user_location_cords || !route_distance) {
    return Response.json(
      { error: "Invalid request: user_location_cords and route_distance are required" },
      { status: 400 },
    );
  }
  const pois = await fetchPOIs(user_location_cords, route_distance / 2);
  const featureCollection = await getFeatureCollection(pois);
  const route = await getRoute(
    user_location_cords,
    route_distance,
    pois.length,
    featureCollection,
  );

  return Response.json({ route });
}
