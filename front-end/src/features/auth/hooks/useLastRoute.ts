// hooks/useLastRoute.ts

import { useEffect } from "react";
import { useLocation } from "react-router";

export function useLastRoute() {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname !== "/login"
    ) {
      localStorage.setItem(
        "lastRoute",
        location.pathname
      );
    }
  }, [location.pathname]);
}