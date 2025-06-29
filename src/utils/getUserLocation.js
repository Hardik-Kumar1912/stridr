import { toast } from "sonner";

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            const { address } = await fetch(
              `/api/reverseGeocode?lat=${latitude}&lon=${longitude}`
            ).then((res) => res.json());
            if (process.env.NEXT_PUBLIC_DEBUGGING === "ON") {
              console.log("------From file getUserLocation.js------");
              console.log("Fetched address:", address);
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);
              console.log("------End of file getUserLocation.js------");
            }

            resolve({ latitude, longitude, address });
          } catch (err) {
            reject(err);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(
            "Could not fetch location. Please allow location access."
          );
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      toast.info("Geolocation is not supported by your browser.");
      reject(new Error("Geolocation not supported"));
    }
  });
};

export default getCurrentLocation;
