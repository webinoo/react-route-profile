import { useEffect, useState } from "react";

const googleLoaderCache: Record<string, Promise<void>> = {};

const loadGoogleMapsApi = (apiKey: string) => {
  if (!googleLoaderCache[apiKey]) {
    googleLoaderCache[apiKey] = new Promise<void>((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Google Maps API can only be used in the browser"));
        return;
      }

      if (window.google?.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[data-google-maps-loader="true"]'
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve());
        existingScript.addEventListener("error", () =>
          reject(new Error("Failed to load Google Maps API"))
        );
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.dataset.googleMapsLoader = "true";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("Failed to load Google Maps API script"));
      document.head.appendChild(script);
    });
  }

  return googleLoaderCache[apiKey];
};

export type LoaderStatus = "idle" | "loading" | "ready" | "error";

export const useGoogleMapsApi = (apiKey: string): LoaderStatus => {
  const [status, setStatus] = useState<LoaderStatus>("idle");

  useEffect(() => {
    let cancelled = false;

    if (!apiKey) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    loadGoogleMapsApi(apiKey)
      .then(() => {
        if (!cancelled) {
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return status;
};