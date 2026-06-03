import { useMemo, useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { locations } from "../../data/locationData";

interface StylizedLocationMapProps {
  selectedId?: number | null;
  onPinSelect?: (id: number) => void;
}

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
  2: "right",
  3: "left",
  4: "right",
  5: "top",
};

const labelClasses = (pos: "top" | "bottom" | "left" | "right") => {
  switch (pos) {
    case "right":
      return "left-full top-1/2 -translate-y-1/2 ml-3";
    case "left":
      return "right-full top-1/2 -translate-y-1/2 mr-3";
    case "top":
      return "left-1/2 -translate-x-1/2 bottom-full mb-3";
    default:
      return "left-1/2 -translate-x-1/2 top-full mt-3";
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
    <section className="w-full">
      {/* Editorial header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <p className="kicker text-bronze mb-3">— Our Network —</p>
        <h2 className="font-serif text-3xl sm:text-4xl text-secondary leading-[1.1]">
          Find Your Nearest <em className="italic text-bronze">Specialist</em>
        </h2>
      </div>

      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft"
        style={{ background: "linear-gradient(to bottom right, #1a1c23, #0f1014)" }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="haloGlow" cx="35%" cy="55%" r="60%">
              <stop offset="0%" stopColor="#c9b99a" stopOpacity="0.10" />
              <stop offset="60%" stopColor="#c9b99a" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#c9b99a" stopOpacity="0" />
            </radialGradient>
            <pattern id="fineGrid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#8b7355" strokeOpacity="0.06" strokeWidth="0.15" />
            </pattern>
            <pattern id="coarseGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c9b99a" strokeOpacity="0.08" strokeWidth="0.2" />
            </pattern>
          </defs>

          {/* Glow */}
          <rect width="100" height="100" fill="url(#haloGlow)" />
          <rect width="100" height="100" fill="url(#fineGrid)" />
          <rect width="100" height="100" fill="url(#coarseGrid)" />

          {/* Landmass — Port Phillip Bay silhouette (stylized) */}
          <path
            d="M -5 60 Q 5 55 12 58 Q 18 50 28 52 Q 38 44 50 50 Q 60 42 72 48 Q 82 44 92 52 Q 100 55 105 60 L 105 105 L -5 105 Z"
            fill="#8b7355"
            fillOpacity="0.10"
          />
          {/* Coastal outline */}
          <path
            d="M -5 60 Q 5 55 12 58 Q 18 50 28 52 Q 38 44 50 50 Q 60 42 72 48 Q 82 44 92 52 Q 100 55 105 60"
            fill="none"
            stroke="#c9b99a"
            strokeOpacity="0.40"
            strokeWidth="0.35"
          />
          {/* Secondary coast wash */}
          <path
            d="M -5 70 Q 15 66 28 70 Q 45 64 60 70 Q 78 66 105 72"
            fill="none"
            stroke="#c9b99a"
            strokeOpacity="0.18"
            strokeWidth="0.25"
            strokeDasharray="0.6 0.8"
          />

          {/* Stylized arterial road network */}
          <g stroke="#c9b99a" fill="none" strokeLinecap="round">
            <path d="M 0 28 Q 25 30 45 42 T 78 58 T 100 62" strokeOpacity="0.22" strokeWidth="0.32" />
            <path d="M 8 0 Q 22 22 38 38 Q 50 50 58 70 T 70 100" strokeOpacity="0.18" strokeWidth="0.28" />
            <path d="M 0 48 Q 30 46 55 50 T 100 56" strokeOpacity="0.14" strokeWidth="0.22" />
            <path d="M 48 0 Q 50 28 54 50 T 60 100" strokeOpacity="0.14" strokeWidth="0.22" />
            <path d="M 70 0 Q 68 20 72 38 T 80 80" strokeOpacity="0.12" strokeWidth="0.2" />
            <path d="M 20 0 Q 28 15 32 30" strokeOpacity="0.10" strokeWidth="0.18" />
          </g>

          {/* Minor capillary roads */}
          <g stroke="#8b7355" fill="none" strokeOpacity="0.18" strokeWidth="0.12">
            <path d="M 15 35 L 30 38" />
            <path d="M 35 25 L 42 36" />
            <path d="M 55 30 L 65 40" />
            <path d="M 60 55 L 75 60" />
            <path d="M 25 50 L 35 55" />
            <path d="M 78 35 L 88 42" />
          </g>

          {/* Subtle landmark dots */}
          <g fill="#c9b99a" fillOpacity="0.22">
            <circle cx="20" cy="20" r="0.4" />
            <circle cx="65" cy="18" r="0.4" />
            <circle cx="85" cy="30" r="0.4" />
            <circle cx="40" cy="32" r="0.4" />
          </g>
        </svg>

        {/* Compass & meta */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 text-pearl/70">
          <div className="w-6 h-6 rounded-full border border-pearl/30 flex items-center justify-center text-[10px] font-medium">
            N
          </div>
          <p className="kicker text-pearl/60 text-[10px]">Greater Melbourne</p>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
          <p className="kicker text-pearl/50 text-[10px] text-right">5 Salons · Tap a pin</p>
        </div>

        {pins.map((p) => {
          const isSelected = selectedId === p.id;
          const isActive = hovered === p.id || isSelected;
          const useButton = !!onPinSelect;

          const innerPin = (
            <>
              <span
                className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary/40 animate-ping ${
                  isSelected ? "opacity-100" : "opacity-50"
                }`}
              />
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
              <span className="block mx-auto w-px h-3 bg-pearl/40" />

              {/* Permanent label badge */}
              <span
                className={`absolute whitespace-nowrap rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight leading-none pointer-events-none transition-all
                  ${
                    isSelected
                      ? "bg-bronze text-pearl border border-pearl/30 px-3 py-1.5 shadow-xl"
                      : "bg-secondary/90 text-pearl border border-pearl/10 px-3 py-1.5 backdrop-blur-md shadow-xl"
                  }
                  ${labelClasses(p.labelPos)}`}
              >
                {p.shortName}
              </span>

              {/* Luxury tooltip */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-3 w-64 sm:w-72 rounded-xl p-4 shadow-lux transition-all origin-top z-30
                  ${hovered === p.id ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}`}
                style={{ backgroundColor: "#faf8f5" }}
                role="tooltip"
              >
                <div className="border border-stone-200/80 -m-4 p-4 rounded-xl">
                  <p className="kicker text-bronze text-[10px] mb-1">Brow Arc Threading</p>
                  <p className="font-serif text-lg text-secondary leading-tight mb-1.5">{p.name}</p>
                  <p className="text-warmGray text-xs leading-snug mb-3">{p.address}</p>
                  <div className="border-t border-stone-200/40 pt-2 flex items-center justify-between gap-2">
                    <a
                      href={`tel:${p.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-bronze text-xs font-semibold hover:text-secondary transition-colors"
                    >
                      <Phone size={11} /> Call Salon
                    </a>
                    <a
                      href={p.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-bronze text-xs font-semibold hover:text-secondary transition-colors"
                    >
                      Directions <ExternalLink size={11} />
                    </a>
                  </div>
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
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-3 sm:p-1 -m-3 sm:-m-1 touch-manipulation"
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
                  className="group block focus:outline-none p-3 sm:p-1 -m-3 sm:-m-1 touch-manipulation"
                >
                  {innerPin}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StylizedLocationMap;
