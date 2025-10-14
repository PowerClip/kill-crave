import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisit } from "@/lib/analytics-store";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    try {
      // Track to our custom analytics
      trackVisit();
    } catch {
      // no-op
    }
  }, [location.pathname, location.search]);

  return null;
}

