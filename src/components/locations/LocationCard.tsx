import { Phone, MapPin, Clock, ExternalLink, Check } from "lucide-react";
import { useLocationStore } from "../../stores/locationStore";
import { toast } from "sonner";
import { LocationData } from "../../types/location";

interface LocationCardProps {
  location: LocationData;
  isSelected: boolean;
  onClick: () => void;
}

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
      className={`scroll-mt-28 bg-white rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col h-full
        ${isSelected ? "border-bronze shadow-lux ring-2 ring-bronze/20" : "border-sand shadow-soft hover:shadow-card hover:border-primary/40"}`}
      onClick={onClick}
    >
      {/* Compact header strip */}
      <div className="relative h-24 w-full">
        <img
          src={location.image}
          alt={`${location.name} salon`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/30 to-transparent" />
        <div className="absolute bottom-2 left-4 right-12">
          <p className="kicker text-pearl/70 text-[10px] mb-0.5">Melbourne</p>
          <h3 className="font-serif text-lg sm:text-xl text-pearl leading-tight truncate">{location.name}</h3>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-bronze text-pearl w-7 h-7 rounded-full flex items-center justify-center shadow-card">
            <Check size={14} />
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-start gap-2 mb-3 group"
        >
          <MapPin size={14} className="text-bronze mt-0.5 flex-shrink-0" />
          <p className="text-secondary text-xs sm:text-sm leading-snug group-hover:text-bronze transition-colors">
            {location.address}
          </p>
        </a>

        <div className="border-t border-sand pt-3 mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Clock size={13} className="text-bronze" />
            <p className="kicker text-bronze text-[10px]">Opening Hours</p>
          </div>
          <div className="space-y-1">
            {Object.entries(location.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-[12px] sm:text-xs gap-2">
                <span className="text-warmGray truncate">{day}</span>
                <span className="text-secondary font-medium text-right whitespace-nowrap">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={`tel:${location.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-bronze text-pearl px-3 py-2.5 rounded-full text-xs font-semibold transition-colors shadow-card"
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
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-3 py-2.5 rounded-full text-xs font-semibold transition-colors"
              aria-label={`Get directions to ${location.name}`}
            >
              <ExternalLink size={13} />
              Directions
            </a>
          </div>
          <button
            onClick={handleSelectLocation}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors ${
              isSelected
                ? 'bg-bronze/10 text-bronze'
                : 'text-warmGray hover:text-secondary'
            }`}
          >
            {isSelected ? '✓ This is my salon' : 'Set as my salon'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default LocationCard;
