"use client";

import dynamic from "next/dynamic";
import { useRoute } from "@/context/RouteContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RouteMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function ResultPage() {
  const [mounted, setMounted] = useState(false);
  const { route } = useRoute();
  let parsedRoute = route;
  if (typeof route === "string") {
    try {
      parsedRoute = JSON.parse(route);
    } catch (e) {
      parsedRoute = null;
    }
  }
  // console.log("Route data:", route);

  useEffect(() => {
    // Ensure the component is mounted before accessing localStorage
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until mounted
  }

  const router = useRouter();

  if (!parsedRoute || !parsedRoute.points) {
    useEffect(() => {
      toast.error("No route found. Please generate a route first.");
      router.replace("/route");
    }, [router]);
    return null;
  }

  const distanceInKm = (parsedRoute.distance / 1000).toFixed(2);
  const timeInMin = Math.round(parsedRoute.time / 60000);
  const estimatedCalories = Math.round((parsedRoute.distance / 1000) * 50);
  const turnCount = parsedRoute.instructions?.length || 0;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 mt-20 mb-5 space-y-8">
      {/* Route Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Distance</h3>
          <p className="text-2xl font-bold text-blue-600">{distanceInKm} km</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">
            Estimated Time
          </h3>
          <p className="text-2xl font-bold text-green-600">{timeInMin} min</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">
            Calories Burned
          </h3>
          <p className="text-2xl font-bold text-orange-600">
            {estimatedCalories} kcal
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Turns</h3>
          <p className="text-2xl font-bold text-purple-600">{turnCount}</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
        <RouteMap />
      </div>
    </div>
  );
}
