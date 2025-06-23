// src/app/api/route/route.js
import { fetchDestPOIs } from "../pois/fech-dest-pois.js";
import { getDestFeatureCollection } from "./DestFeatureCollection.js";
import { getDestRoute } from "./getDestRoute.js";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  await auth.protect();
  console.log("Received request to modify route");
  const { user_location_cords, dest_location_cords } = await req.json();

  console.log("User location coordinates:", user_location_cords);
  console.log("Destination location coordinates:", dest_location_cords);
  if (!user_location_cords || !dest_location_cords) {
    return Response.json(
      { error: "Invalid request: user_location_cords and dest_location_cords are required" },
      { status: 400 },
    );
  }
  const pois = await fetchDestPOIs(user_location_cords, dest_location_cords);



  const featureCollection = await getDestFeatureCollection(pois);
  const route = await getDestRoute(
    user_location_cords,
    dest_location_cords,
    pois.length,
    featureCollection,
  );

  console.log("Generated route:", route);

  return Response.json({ route });
}
