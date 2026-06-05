import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, Phone, ExternalLink, X, Navigation } from "lucide-react";
import { locations } from "../../data/locationData";
import { useOpenStatus } from "../../hooks/useOpenStatus";
import type { LocationHours } from "../../types/location";

const StatusBadge = ({ hours }: { hours: LocationHours }) => {
  const status = useOpenStatus(hours);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ring-1 ${
        status.isOpen
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-rose-500"}`} />
      <span className="text-[10px] font-semibold tracking-wide">
        {status.label}
        <span className="font-normal opacity-80"> · {status.detail}</span>
      </span>
    </span>
  );
};

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

// Smart desktop tooltip positioning per pin to avoid edge clipping
const TOOLTIP_POS: Record<number, string> = {
  // Brandon Park — center: drop below
  1: "left-1/2 -translate-x-1/2 top-full mt-3",
  // Southland — left edge: open to the right
  2: "left-full ml-3 top-1/2 -translate-y-1/2",
  // Pakenham — bottom-right: open above & to the left
  3: "right-full mr-3 bottom-full mb-3",
  // Stud Park — center: drop below
  4: "left-1/2 -translate-x-1/2 top-full mt-3",
  // Warringal — top-left edge: open to the right
  5: "left-full ml-3 top-1/2 -translate-y-1/2",
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
  const [mobileDrawerId, setMobileDrawerId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handlePinClick = (id: number) => {
    // Mobile: open drawer first; Desktop: select directly
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) {
      setMobileDrawerId(id);
    } else {
      onPinSelect?.(id);
    }
  };

  const drawerActive = mobileDrawerId ? pins.find((p) => p.id === mobileDrawerId) : null;

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
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden border border-stone-200/80 shadow-soft"
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
            <pattern id="coarseGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c9b99a" strokeOpacity="0.08" strokeWidth="0.2" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#haloGlow)" />
          <rect width="100" height="100" fill="url(#coarseGrid)" />
          <path
            d="M -5 60 Q 5 55 12 58 Q 18 50 28 52 Q 38 44 50 50 Q 60 42 72 48 Q 82 44 92 52 Q 100 55 105 60 L 105 105 L -5 105 Z"
            fill="#8b7355"
            fillOpacity="0.10"
          />
          <path
            d="M -5 60 Q 5 55 12 58 Q 18 50 28 52 Q 38 44 50 50 Q 60 42 72 48 Q 82 44 92 52 Q 100 55 105 60"
            fill="none"
            stroke="#c9b99a"
            strokeOpacity="0.40"
            strokeWidth="0.35"
          />
          <path
            d="M -5 70 Q 15 66 28 70 Q 45 64 60 70 Q 78 66 105 72"
            fill="none"
            stroke="#c9b99a"
            strokeOpacity="0.18"
            strokeWidth="0.25"
            strokeDasharray="0.6 0.8"
          />
          <g stroke="#c9b99a" fill="none" strokeLinecap="round">
            <path d="M 0 28 Q 25 30 45 42 T 78 58 T 100 62" strokeOpacity="0.22" strokeWidth="0.32" />
            <path d="M 8 0 Q 22 22 38 38 Q 50 50 58 70 T 70 100" strokeOpacity="0.18" strokeWidth="0.28" />
            <path d="M 0 48 Q 30 46 55 50 T 100 56" strokeOpacity="0.14" strokeWidth="0.22" />
            <path d="M 48 0 Q 50 28 54 50 T 60 100" strokeOpacity="0.14" strokeWidth="0.22" />
            <path d="M 70 0 Q 68 20 72 38 T 80 80" strokeOpacity="0.12" strokeWidth="0.2" />
            <path d="M 20 0 Q 28 15 32 30" strokeOpacity="0.10" strokeWidth="0.18" />
          </g>
          <g stroke="#8b7355" fill="none" strokeOpacity="0.18" strokeWidth="0.12">
            <path d="M 15 35 L 30 38" />
            <path d="M 35 25 L 42 36" />
            <path d="M 55 30 L 65 40" />
            <path d="M 60 55 L 75 60" />
            <path d="M 25 50 L 35 55" />
            <path d="M 78 35 L 88 42" />
          </g>
          <g fill="#c9b99a" fillOpacity="0.22">
            <circle cx="20" cy="20" r="0.4" />
            <circle cx="65" cy="18" r="0.4" />
            <circle cx="85" cy="30" r="0.4" />
            <circle cx="40" cy="32" r="0.4" />
          </g>
        </svg>

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
          // While a pin is being interacted with, suppress non-active labels to prevent collisions
          const hideLabel = hovered !== null && hovered !== p.id;

          return (
            <div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -100%)",
                zIndex: isActive ? 50 : 20,
              }}
            >
              <button
                type="button"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                onClick={() => handlePinClick(p.id)}
                aria-label={`Show ${p.name} details`}
                aria-pressed={isSelected}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-4 sm:p-1 -m-4 sm:-m-1 touch-manipulation"
              >
                {isSelected && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary/40 animate-ping" />
                )}
                <span
                  className={`relative flex items-center justify-center w-9 h-9 rounded-full shadow-lux ring-2 transition-transform
                    ${
                      isSelected
                        ? "bg-pearl text-secondary ring-primary scale-110"
                        : isActive
                        ? "bg-pearl text-secondary ring-primary scale-105"
                        : "bg-bronze text-pearl ring-pearl/40"
                    }`}
                >
                  <MapPin size={16} strokeWidth={2.5} />
                </span>
                <span className="block mx-auto w-px h-3 bg-pearl/40" />

                {/* Permanent label badge — hidden while another pin is active */}
                <span
                  className={`absolute whitespace-nowrap rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight leading-none pointer-events-none px-3 py-1.5 shadow-xl border z-[5] transition-opacity
                    ${
                      isSelected
                        ? "bg-bronze text-pearl border-pearl/30"
                        : "bg-secondary/95 text-pearl border-pearl/10"
                    }
                    ${labelClasses(p.labelPos)}
                    ${hideLabel ? "opacity-0" : "opacity-100"}`}
                >
                  {p.shortName}
                </span>

                {/* Desktop tooltip — hover only, smart-positioned per pin */}
                {hovered === p.id && (
                  <div
                    className={`hidden sm:block absolute w-72 rounded-xl p-4 shadow-lux z-[60] ${TOOLTIP_POS[p.id] ?? "left-1/2 -translate-x-1/2 top-full mt-3"}`}
                    style={{ backgroundColor: "#faf8f5" }}
                    role="tooltip"
                  >
                    <div className="border border-stone-200/80 -m-4 p-4 rounded-xl">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <p className="kicker text-bronze text-[10px]">Brow Arc Threading</p>
                        <StatusBadge hours={p.hours} />
                      </div>
                      <p className="font-serif text-lg text-secondary leading-tight mb-1">{p.name}</p>
                      <p className="text-warmGray text-xs leading-snug mb-1.5">{p.address}</p>
                      {p.mallDirections && (
                        <p className="flex items-start gap-1 text-bronze text-[11px] italic leading-snug mb-3">
                          <Navigation size={10} className="mt-0.5 shrink-0" />
                          <span>{p.mallDirections}</span>
                        </p>
                      )}
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
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile bottom-drawer — portaled to body */}
      {mounted &&
        drawerActive &&
        createPortal(
          <>
            <div
              className="sm:hidden fixed inset-0 z-[69] bg-secondary/40 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setMobileDrawerId(null)}
              aria-hidden
            />
            <div
              className="sm:hidden fixed inset-x-0 bottom-0 z-[70] rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-lux animate-in slide-in-from-bottom duration-300"
              style={{ backgroundColor: "#faf8f5" }}
              role="dialog"
              aria-label={`${drawerActive.name} details`}
            >
              <div className="mx-auto w-12 h-1.5 rounded-full bg-stone-300/80 mb-4" />
              <button
                type="button"
                onClick={() => setMobileDrawerId(null)}
                aria-label="Close details"
                className="absolute top-3 right-3 p-2 rounded-full text-warmGray hover:text-secondary active:scale-95 touch-manipulation"
              >
                <X size={18} />
              </button>
              <div className="flex items-center justify-between gap-2 mb-1.5 pr-8">
                <p className="kicker text-bronze text-[10px]">Brow Arc Threading</p>
                <StatusBadge hours={drawerActive.hours} />
              </div>
              <p className="font-serif text-xl text-secondary leading-tight mb-1.5 pr-8">
                {drawerActive.name}
              </p>
              <p className="text-warmGray text-sm leading-snug mb-2">{drawerActive.address}</p>
              {drawerActive.mallDirections && (
                <p className="flex items-start gap-1.5 text-bronze text-xs italic leading-snug mb-4">
                  <Navigation size={12} className="mt-0.5 shrink-0" />
                  <span>{drawerActive.mallDirections}</span>
                </p>
              )}
              <div className="grid grid-cols-2 gap-2.5 mb-2">
                <a
                  href={`tel:${drawerActive.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-bronze text-pearl px-3 py-3 rounded-full text-sm font-semibold shadow-card active:scale-[0.98]"
                >
                  <Phone size={14} /> Call Salon
                </a>
                <a
                  href={drawerActive.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-3 py-3 rounded-full text-sm font-semibold active:scale-[0.98]"
                >
                  Directions <ExternalLink size={13} />
                </a>
              </div>
              {onPinSelect && (
                <button
                  type="button"
                  onClick={() => {
                    onPinSelect(drawerActive.id);
                    setMobileDrawerId(null);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-[12px] font-medium text-bronze active:scale-[0.98]"
                >
                  View full details ↓
                </button>
              )}
            </div>
          </>,
          document.body
        )}
    </section>
  );
};

export default StylizedLocationMap;
