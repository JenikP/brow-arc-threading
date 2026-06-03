import { useState } from "react";
import { Phone, ExternalLink, Check, Clock, ChevronDown } from "lucide-react";
import { useLocationStore } from "../../stores/locationStore";
import { toast } from "sonner";
import { LocationData } from "../../types/location";

interface LocationCardProps {
  location: LocationData;
  isSelected: boolean;
  onClick: () => void;
}

const REGION: Record<number, string> = {
  1: "Melbourne East",
  2: "Melbourne South",
  3: "Melbourne South-East",
  4: "Melbourne East",
  5: "Melbourne North-East",
};

// Map today's weekday to the matching hours key
const getTodayHoursKey = (hours: Record<string, string>): string | null => {
  const day = new Date().getDay(); // 0=Sun..6=Sat
  const keys = Object.keys(hours);
  const match = (predicate: (k: string) => boolean) => keys.find(predicate) ?? null;

  if (day === 0) return match((k) => /sun/i.test(k));
  if (day === 6) return match((k) => /sat/i.test(k));
  if (day >= 1 && day <= 3) return match((k) => /mon|tue|wed/i.test(k)) ?? keys[0];
  return match((k) => /thu|fri/i.test(k)) ?? keys[0];
};

const LocationCard = ({ location, isSelected, onClick }: LocationCardProps) => {
  const { setSelectedLocation } = useLocationStore();
  const [hoursOpen, setHoursOpen] = useState(false);

  const mapsUrl =
    location.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.address}`)}`;

  const todayKey = getTodayHoursKey(location.hours);
  const todayHours = todayKey ? location.hours[todayKey] : null;

  const handleSelectLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation(location.storeId);
    toast.success("Location Selected", {
      description: `You've selected ${location.name} as your preferred salon.`,
    });
  };

  return (
    <article
      id={`location-${location.id}`}
      className={`scroll-mt-28 rounded-2xl border shadow-soft transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden
        ${isSelected ? "border-bronze ring-2 ring-bronze/20" : "border-stone-200/80 hover:border-bronze/40 hover:shadow-card"}`}
      style={{ backgroundColor: "#faf8f5" }}
      onClick={onClick}
    >
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        {/* 2-column header: image left, content right */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3">
          <div className="relative shrink-0 w-24 h-24 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-stone-200/80 shadow-soft">
            <img
              src={location.image}
              alt={`${location.name} studio`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {isSelected && (
              <div className="absolute inset-0 ring-2 ring-bronze rounded-xl pointer-events-none" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="kicker text-bronze text-[10px] mb-1.5 tracking-[0.25em] uppercase">
              {REGION[location.id] ?? "Melbourne"}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl text-secondary leading-tight mb-1.5">
              {location.name}
            </h3>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block text-warmGray text-[12px] sm:text-sm leading-snug hover:text-bronze transition-colors"
            >
              {location.address}
            </a>
          </div>
        </div>

        {isSelected && (
          <div className="inline-flex items-center gap-1.5 self-start bg-bronze text-pearl px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 shadow-card">
            <Check size={11} /> Your salon
          </div>
        )}

        {/* Open indicator */}
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-secondary/80 tracking-wide">
            Open 7 Days — Walk-ins Welcome
          </span>
        </div>

        {/* Premium hours accordion */}
        <div className="mb-5 rounded-xl border border-stone-200/60 bg-white/60 overflow-hidden">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setHoursOpen((v) => !v);
            }}
            aria-expanded={hoursOpen}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-left active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Clock size={13} className="text-bronze shrink-0" />
              <div className="min-w-0">
                <p className="kicker text-bronze text-[10px] leading-tight">Today</p>
                <p className="text-secondary font-medium text-[12px] truncate">
                  {todayHours ?? "Tap to view opening hours"}
                </p>
              </div>
            </div>
            <ChevronDown
              size={16}
              className={`text-bronze shrink-0 transition-transform duration-300 ${
                hoursOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-300 ease-out ${
              hoursOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-3.5 pb-3 pt-1 border-t border-stone-200/50">
                {Object.entries(location.hours).map(([day, hours]) => (
                  <div
                    key={day}
                    className={`flex justify-between items-baseline gap-3 border-b border-stone-200/40 py-1.5 last:border-b-0 ${
                      day === todayKey ? "text-bronze" : ""
                    }`}
                  >
                    <span
                      className={`text-[12px] ${
                        day === todayKey ? "text-bronze font-semibold" : "text-warmGray"
                      }`}
                    >
                      {day}
                    </span>
                    <span
                      className={`font-medium text-[12px] text-right whitespace-nowrap ${
                        day === todayKey ? "text-bronze" : "text-secondary"
                      }`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${location.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-bronze text-pearl px-3 py-3 sm:py-2.5 rounded-full text-sm sm:text-xs font-semibold shadow-card border border-transparent hover:border-bronze transition-all duration-200 active:scale-[0.98] sm:hover:scale-[1.02]"
              aria-label={`Call ${location.name}`}
            >
              <Phone size={14} />
              Call to Book
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-3 py-3 sm:py-2.5 rounded-full text-sm sm:text-xs font-semibold transition-all duration-200 active:scale-[0.98] sm:hover:scale-[1.02]"
              aria-label={`Get directions to ${location.name}`}
            >
              <ExternalLink size={14} />
              Get Directions
            </a>
          </div>
          <button
            onClick={handleSelectLocation}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors active:scale-[0.98] ${
              isSelected ? "bg-bronze/10 text-bronze" : "text-warmGray hover:text-secondary"
            }`}
          >
            {isSelected ? "✓ This is my salon" : "Set as my salon"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default LocationCard;
