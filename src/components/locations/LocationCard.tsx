import { Phone, ExternalLink, Check, Clock } from "lucide-react";
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

const LocationCard = ({ location, isSelected, onClick }: LocationCardProps) => {
  const { setSelectedLocation } = useLocationStore();

  const mapsUrl =
    location.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.name} ${location.address}`)}`;

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
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Region label + name */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="kicker text-bronze text-[10px] mb-2 tracking-[0.25em]">
              {REGION[location.id] ?? "Melbourne"}
            </p>
            <h3 className="font-serif text-2xl text-secondary leading-tight">{location.name}</h3>
          </div>
          {isSelected && (
            <div className="bg-bronze text-pearl w-7 h-7 rounded-full flex items-center justify-center shadow-card shrink-0">
              <Check size={14} />
            </div>
          )}
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block text-warmGray text-xs sm:text-sm leading-snug mb-4 hover:text-bronze transition-colors"
        >
          {location.address}
        </a>

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

        {/* Menu-style hours */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={12} className="text-bronze" />
            <p className="kicker text-bronze text-[10px]">Opening Hours</p>
          </div>
          <div>
            {Object.entries(location.hours).map(([day, hours]) => (
              <div
                key={day}
                className="flex justify-between items-baseline gap-3 border-b border-stone-200/40 py-1.5 last:border-b-0"
              >
                <span className="text-warmGray text-[12px]">{day}</span>
                <span className="text-secondary font-medium text-[12px] text-right whitespace-nowrap">
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${location.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-bronze text-pearl px-3 py-2.5 rounded-full text-xs font-semibold shadow-card border border-transparent hover:border-bronze transition-all duration-200 hover:scale-[1.02]"
              aria-label={`Call ${location.name}`}
            >
              <Phone size={13} />
              Call to Book
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-3 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
              aria-label={`Get directions to ${location.name}`}
            >
              <ExternalLink size={13} />
              Get Directions
            </a>
          </div>
          <button
            onClick={handleSelectLocation}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
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
