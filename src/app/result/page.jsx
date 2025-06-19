"use client";

import dynamic from "next/dynamic";

// Don't remove this
const RouteMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function ResultPage() {
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto py-12 px-6 mt-20 mb-5">
      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-md">
        <RouteMap />
      </div>
    </div>
  );
}
