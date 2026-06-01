import { useMemo, useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { locations } from "../../data/locationData";

interface StylizedLocationMapProps {
  selectedId?: number | null;
  onPinSelect?: (id: number) => void;
}

/**
 * Lightweight, dependency-free SVG map of greater Melbourne with 5 salon pins.
 * If onPinSelect is provided, tapping a pin selects the matching location
 * (parent typically scrolls to + highlights the card). Otherwise the pin
 * opens the verified Google Maps directionsUrl in a new tab.
 */

const BOUNDS = {
  latMin: -38.12,
  latMax: -37.70,
  lngMin: 145.02,
  lngMax: 145.52,
};

const toXY = (lat: number, lng: number) => {
  const x = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100;
  const y = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * 100;
  return { x, y };
};

const SHORT_NAMES: Record<number, string> = {
  1: "Brandon Park",
  2: "Southland",
  3: "Pakenham",
  4: "Stud Park",
  5: "Warringal",
};

const LABEL_POS: Record<number, "top" | "bottom" | "left" | "right"> = {
  1: "right",
  2: "left",
  3: "left",
  4: "right",
  5: "top",
};

const labelClasses = (pos: "top" | "bottom" | "left" | "right") => {
  switch (pos) {
    case "right":
      return "left-full top-1/2 -translate-y-1/2 ml-2";
    case "left":
      return "right-full top-1/2 -translate-y-1/2 mr-2";
    case "top":
      return "left-1/2 -translate-x-1/2 bottom-full mb-2";
    default:
      return "left-1/2 -translate-x-1/2 top-full mt-2";
  }
};

const StylizedLocationMap = ({ selectedId, onPinSelect }: StylizedLocationMapProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const pins = useMemo(
    () =>
      locations.map((loc) => ({
        ...loc,
        shortName: SHORT_NAMES[loc.id] ?? loc.name,
        labelPos: LABEL_POS[loc.id] ?? "bottom",
        ...toXY(loc.coordinates.lat, loc.coordinates.lng),
      })),
    []
  );

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-sand shadow-card bg-secondary">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d2520" />
            <stop offset="100%" stopColor="#1c1612" />
          </linearGradient>
          <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#8b7355" strokeOpacity="0.08" strokeWidth="0.2" />
          </pattern>
        </defs>

        <rect width="100" height="100" fill="url(#mapBg)" />
        <rect width="100" height="100" fill="url(#grid)" />

        <path
          d="M -5 75 Q 10 70 18 78 T 35 88 T 55 95 T 80 92 L 105 100 L 105 105 L -5 105 Z"
          fill="#8b7355"
          fillOpacity="0.12"
        />
        <path
          d="M -5 75 Q 10 70 18 78 T 35 88 T 55 95 T 80 92"
          fill="none"
          stroke="#c9b99a"
          strokeOpacity="0.35"
          strokeWidth="0.35"
        />

        <g stroke="#c9b99a" strokeOpacity="0.18" strokeWidth="0.25" fill="none">
          <path d="M 0 30 Q 30 32 55 45 T 100 55" />
          <path d="M 10 0 Q 25 40 45 60 T 70 100" />
          <path d="M 0 60 L 100 65" />
          <path d="M 50 0 L 55 100" />
        </g>

        <circle cx="35" cy="55" r="40" fill="#c9b99a" fillOpacity="0.04" />
      </svg>

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 text-pearl/70">
        <div className="w-6 h-6 rounded-full border border-pearl/30 flex items-center justify-center text-[10px] font-medium">
          N
        </div>
        <p className="kicker text-pearl/60">Greater Melbourne</p>
      </div>

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <p className="kicker text-pearl/50 text-right">5 salons · tap a pin</p>
      </div>

      {pins.map((p) => {
        const isSelected = selectedId === p.id;
        const isActive = hovered === p.id || isSelected;
        const useButton = !!onPinSelect;

        const innerPin = (
          <>
            {/* Pulse ring */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary/40 ${
                isSelected ? "animate-ping" : "animate-ping opacity-60"
              }`}
            />
            {/* Pin */}
            <span
              className={`relative flex items-center justify-center w-9 h-9 rounded-full shadow-lux ring-2 transition-all
                ${
                  isSelected
                    ? "bg-pearl text-secondary ring-primary scale-110"
                    : isActive
                    ? "bg-pearl text-secondary ring-primary scale-105"
                    : "bg-bronze text-pearl ring-pearl/40 group-hover:scale-110"
                }`}
            >
              <MapPin size={16} strokeWidth={2.5} />
            </span>
            {/* Stem */}
            <span className="block mx-auto w-px h-3 bg-pearl/40" />

            {/* Permanent name label badge — consistent across breakpoints */}
            <span
              className={`absolute whitespace-nowrap rounded-full text-[11px] sm:text-xs font-semibold tracking-tight leading-none px-2.5 py-1.5 shadow-card pointer-events-none transition-colors
                ${
                  isSelected
                    ? "bg-bronze text-pearl ring-1 ring-pearl/30"
                    : "bg-secondary text-pearl ring-1 ring-pearl/15"
                }
                ${labelClasses(p.labelPos)}`}
            >
              {p.shortName}
            </span>

            {/* Hover tooltip card */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-2 w-56 sm:w-64 rounded-2xl bg-pearl text-secondary p-3 sm:p-4 shadow-lux border border-sand transition-all origin-top z-30
                ${hovered === p.id ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
              role="tooltip"
            >
              <p className="font-serif text-base sm:text-lg leading-tight mb-1">{p.name}</p>
              <p className="text-warmGray text-xs leading-snug mb-2 line-clamp-2">{p.address}</p>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`tel:${p.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-bronze text-xs font-semibold hover:text-secondary"
                >
                  <Phone size={11} /> Call
                </a>
                <a
                  href={p.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-bronze text-xs font-semibold hover:text-secondary"
                >
                  Directions <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </>
        );

        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -100%)",
              zIndex: isSelected ? 30 : 20,
            }}
          >
            {useButton ? (
              <button
                type="button"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                onClick={() => onPinSelect?.(p.id)}
                aria-label={`Show ${p.name} details`}
                aria-pressed={isSelected}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              >
                {innerPin}
              </button>
            ) : (
              <a
                href={p.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                aria-label={`Open ${p.name} in Google Maps`}
                className="group block focus:outline-none"
              >
                {innerPin}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StylizedLocationMap;
