import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = "G-LZCV0J3Q9M"; // always-on per request

export default function GAReporter() {
  const location = useLocation();

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("config", GA_MEASUREMENT_ID, {
          page_path: location.pathname + location.search,
        });
      }
    } catch {
      // no-op
    }
  }, [location.pathname, location.search]);

  return null;
}

