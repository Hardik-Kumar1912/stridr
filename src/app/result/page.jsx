"use client";

import dynamic from "next/dynamic";
import { useRoute } from "@/context/RouteContext";
import { useEffect } from "react";

const RouteMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function ResultPage() {
  const { route } = useRoute();

  if (!route) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        No route found. Please generate a route first.
      </div>
    );
  }

  const distanceInKm = (route.distance / 1000).toFixed(2);
  const timeInMin = Math.round(route.time / 60000);
  const estimatedCalories = Math.round((route.distance / 1000) * 50);
  const turnCount = route.instructions?.length || 0;

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 mt-20 mb-5 space-y-8">
      {/* Route Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Distance</h3>
          <p className="text-2xl font-bold text-blue-600">{distanceInKm} km</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Estimated Time</h3>
          <p className="text-2xl font-bold text-green-600">{timeInMin} min</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-700">Calories Burned</h3>
          <p className="text-2xl font-bold text-orange-600">{estimatedCalories} kcal</p>
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
