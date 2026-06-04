import { useEffect, useState } from "react";
import { getOpenStatus, type OpenStatus } from "../utils/businessHours";
import type { LocationHours } from "../types/location";

export const useOpenStatus = (hours: LocationHours): OpenStatus => {
  const [status, setStatus] = useState<OpenStatus>(() => getOpenStatus(hours));

  useEffect(() => {
    setStatus(getOpenStatus(hours));
    const interval = setInterval(() => setStatus(getOpenStatus(hours)), 60_000);
    return () => clearInterval(interval);
  }, [hours]);

  return status;
};
