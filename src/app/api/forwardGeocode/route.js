import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  await auth.protect();
  const { searchParams } = new URL(request.url);
  const place = searchParams.get("place");

  if (!place) {
    return Response.json({ error: "Missing 'place' parameter" }, { status: 400 });
  }

  const LOCATION_IQ_API_KEY =
    process.env.LOCATION_IQ_API_KEY || "pk.aafa7ce830181f66da2791c9b83cc082";

  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search?key=${LOCATION_IQ_API_KEY}&q=${encodeURIComponent(
        place
      )}&format=json`
    );
    const data = await response.json();

    if (!data || !data[0]) {
      return Response.json({ error: "No coordinates found" }, { status: 404 });
    }

    const latitude = parseFloat(data[0].lat);
    const longitude = parseFloat(data[0].lon);
    return Response.json({ coords: [longitude, latitude] }); // [lon, lat] for consistency
  } catch (err) {
    console.error("Geocoding error:", err);
    return Response.json({ error: "Failed to geocode place" }, { status: 500 });
  }
}
