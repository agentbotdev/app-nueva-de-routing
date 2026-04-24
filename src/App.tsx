/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

/**
 * GoogleMapsLoader component
 * Responsibility: Dynamically loads the Google Maps JavaScript API script 
 * using the VITE_GOOGLE_MAPS_API_KEY environment variable.
 */
export default function App() {
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicates
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === "TU_CLAVE_DE_GOOGLE_MAPS") {
      console.warn("Google Maps API Key is missing or not configured in .env");
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,places&callback=initMap`;
    script.async = true;
    script.defer = true;
    
    // Add success/error handling
    script.onload = () => console.log("Google Maps script loaded successfully");
    script.onerror = () => console.error("Failed to load Google Maps script");

    document.body.appendChild(script);

    return () => {
      // Optional: clean up if needed, but usually once loaded we keep it
    };
  }, []);

  return null; // The UI is currently handled by index.html
}
