"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Hataiyo maat isse 
const RouteMap = dynamic(() => import("@/components/RouteMap"), {
  ssr: false,
});

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const polyline = searchParams.get("polyline");
  const distance = searchParams.get("distance");
  const time = searchParams.get("time");
  const calories = searchParams.get("calories");
  const start = searchParams.get("start");
  const destination = searchParams.get("destination");
  const tripType = searchParams.get("tripType");

  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto py-12 px-6 mt-20 mb-5">
      <h1 className="text-2xl font-bold mb-4">Your Jogging Route</h1>

      <div className="w-full max-w-4xl h-[400px] mb-6 rounded-xl overflow-hidden shadow-md">
        {polyline ? (
          <RouteMap encodedPolyline={polyline} />
        ) : (
          <p>No route found</p>
        )}
      </div>

      <div className="text-center mb-6 space-y-2">
        <p><strong>Start:</strong> {start}</p>
        {tripType === "destination" && <p><strong>Destination:</strong> {destination}</p>}
        <p><strong>Distance:</strong> {distance} km</p>
        <p><strong>Estimated Time:</strong> {time} mins</p>
        <p><strong>Calories Burned:</strong> {calories} kcal</p>
      </div>

      <Button onClick={() => router.push("/")}>
        Plan Another Route
      </Button>
    </div>
  );
}
