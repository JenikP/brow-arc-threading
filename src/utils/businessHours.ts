import type { LocationHours } from "../types/location";

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Parse "9:00 am – 5:30 pm" → { open: 540, close: 1050 } (minutes since midnight)
const parseRange = (value: string): { open: number; close: number } | null => {
  const normalized = value.replace(/[–—−]/g, "-").toLowerCase();
  const match = normalized.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/);
  if (!match) return null;
  const toMin = (h: string, m: string | undefined, mer: string) => {
    let hr = parseInt(h, 10) % 12;
    if (mer === "pm") hr += 12;
    return hr * 60 + (m ? parseInt(m, 10) : 0);
  };
  return {
    open: toMin(match[1], match[2], match[3]),
    close: toMin(match[4], match[5], match[6]),
  };
};

// Check if a hours key (e.g. "Monday – Wednesday", "Thursday – Friday", "Saturday",
// "Sunday/Public Holidays") matches the given weekday name.
const keyMatchesDay = (key: string, dayName: string): boolean => {
  const k = key.toLowerCase();
  const short = dayName.slice(0, 3);
  if (!k.includes("-") && !k.includes("–") && !k.includes("—")) {
    return k.includes(short);
  }
  // Range like "monday – wednesday"
  const parts = k.split(/[-–—]/).map((p) => p.trim());
  if (parts.length !== 2) return k.includes(short);
  const startIdx = DAY_NAMES.findIndex((d) => parts[0].includes(d.slice(0, 3)));
  const endIdx = DAY_NAMES.findIndex((d) => parts[1].includes(d.slice(0, 3)));
  const todayIdx = DAY_NAMES.indexOf(dayName);
  if (startIdx === -1 || endIdx === -1 || todayIdx === -1) return false;
  if (startIdx <= endIdx) return todayIdx >= startIdx && todayIdx <= endIdx;
  return todayIdx >= startIdx || todayIdx <= endIdx;
};

const formatMinutes = (mins: number): string => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const mer = h24 >= 12 ? "pm" : "am";
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h}:00 ${mer}` : `${h}:${m.toString().padStart(2, "0")} ${mer}`;
};

// Get "now" as { weekday: string, minutes: number } in Australia/Melbourne tz.
const getMelbourneNow = (now: Date): { weekday: string; minutes: number } => {
  const fmt = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(now);
  const weekday = (parts.find((p) => p.type === "weekday")?.value ?? "monday").toLowerCase();
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);
  return { weekday, minutes: hour * 60 + minute };
};

export const getOpenStatus = (hours: LocationHours, now: Date = new Date()): OpenStatus => {
  const { weekday, minutes } = getMelbourneNow(now);

  const todayKey = Object.keys(hours).find((k) => keyMatchesDay(k, weekday));
  const todayRange = todayKey ? parseRange(hours[todayKey]) : null;

  if (todayRange && minutes >= todayRange.open && minutes < todayRange.close) {
    return {
      isOpen: true,
      label: "Open Now",
      detail: `Until ${formatMinutes(todayRange.close)}`,
    };
  }

  // Find next opening
  if (todayRange && minutes < todayRange.open) {
    return {
      isOpen: false,
      label: "Closed",
      detail: `Opens ${formatMinutes(todayRange.open)}`,
    };
  }

  // Look ahead up to 7 days
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (DAY_NAMES.indexOf(weekday) + i) % 7;
    const nextDay = DAY_NAMES[nextIdx];
    const key = Object.keys(hours).find((k) => keyMatchesDay(k, nextDay));
    const range = key ? parseRange(hours[key]) : null;
    if (range) {
      const dayLabel = i === 1 ? "tomorrow" : nextDay.charAt(0).toUpperCase() + nextDay.slice(1);
      return {
        isOpen: false,
        label: "Closed",
        detail: `Opens ${dayLabel} ${formatMinutes(range.open)}`,
      };
    }
  }

  return { isOpen: false, label: "Closed", detail: "Hours unavailable" };
};
