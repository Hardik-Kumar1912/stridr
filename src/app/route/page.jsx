"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateRoutePage() {
  const [tripType, setTripType] = useState("round");
  const [mounted, setMounted] = useState(false);
  const [startLocation, setStartLocation] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c249ecec82534481863e8bb74c5bc463`
          );
          const data = await response.json();
          const address = data.results[0]?.formatted;

          if (address) setStartLocation(address);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch location. Please allow location access.");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <main className="mt-20 mb-5 max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Form Section */}
        <div className="h-full border border-muted rounded-xl shadow-md p-8 bg-white">
          <h1 className="text-3xl font-bold text-primary mb-8">
            Create Your Route
          </h1>

          <div className="space-y-6">
            {/* Starting Location */}
            <div className="space-y-2">
              <Label htmlFor="start-location">Starting Location</Label>
              <div className="flex gap-2">
                <Input
                  id="start-location"
                  placeholder="Enter starting point"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                />
                <Button variant="outline" onClick={getCurrentLocation}>
                  Use Current Location
                </Button>
              </div>
            </div>

            {/* Trip Type */}
            <div className="space-y-2">
              <Label>Trip Type</Label>
              <RadioGroup
                defaultValue="round"
                onValueChange={(value) => setTripType(value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round" id="round" />
                  <Label htmlFor="round">Round Trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="destination" id="destination" />
                  <Label htmlFor="destination">To a Destination</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Destination - only if not round trip */}
            {tripType === "destination" && (
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Enter destination" />
              </div>
            )}

            {/* Distance */}
            <div className="space-y-2">
              <Label htmlFor="distance">Target Distance (in km)</Label>
              <Input id="distance" type="number" placeholder="e.g. 5" />
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time">Expected Time (in minutes)</Label>
              <Input id="time" type="number" placeholder="e.g. 30" />
            </div>

            {/* Submit Button */}
            <Button className="w-full mt-4">Next</Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="h-full flex items-center justify-center">
          <img
            src="/createRoute.png"
            alt="Create Route Illustration"
            className="w-full h-auto rounded-xl shadow-md border border-border"
          />
        </div>
      </div>
    </main>
  );
}
