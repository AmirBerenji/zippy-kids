"use client";

import { useEffect } from "react";

export default function LocationSaver() {
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        localStorage.setItem("user_lat", data.lat.toString());
        localStorage.setItem("user_lng", data.lng.toString());
      },
      (error) => {
        console.error("Location error:", error.message);
      },
    );
  }, []);

  return null; // no UI needed
}
