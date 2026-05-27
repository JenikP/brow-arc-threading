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
      className={`scroll-mt-28 bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer
        ${isSelected ? "border-bronze shadow-lux ring-2 ring-bronze/20" : "border-sand shadow-soft hover:shadow-card hover:border-primary/40"}`}
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-52 w-full">
        <img
          src={location.image}
          alt={`${location.name} salon`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="kicker text-pearl/80 mb-1">Melbourne</p>
          <h3 className="font-serif text-2xl sm:text-3xl text-pearl">{location.name}</h3>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4 bg-bronze text-pearl w-9 h-9 rounded-full flex items-center justify-center shadow-card">
            <Check size={18} />
          </div>
        )}
      </div>

      <div className="p-6 sm:p-7">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-start gap-3 mb-4 group"
        >
          <MapPin size={18} className="text-bronze mt-0.5 flex-shrink-0" />
          <div className="text-secondary group-hover:text-bronze transition-colors">
            <p className="text-sm sm:text-base leading-snug">{location.address}</p>
            <p className="inline-flex items-center gap-1 text-xs text-bronze mt-1 font-medium">
              Open in Google Maps <ExternalLink size={11} />
            </p>
          </div>
        </a>

        {location.description && (
          <p className="text-warmGray text-sm mb-4 leading-relaxed">{location.description}</p>
        )}

        <div className="border-t border-sand pt-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-bronze" />
            <p className="kicker text-bronze">Opening Hours</p>
          </div>
          <div className="space-y-1.5">
            {Object.entries(location.hours).map(([day, hours]) => (
              <div key={day} className="flex justify-between text-sm gap-3">
                <span className="text-warmGray">{day}</span>
                <span className="text-secondary font-medium text-right">{hours}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 mb-2.5">
          <a
            href={`tel:${location.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-bronze text-pearl px-5 py-3.5 rounded-full text-sm font-semibold transition-colors shadow-card"
            aria-label={`Call ${location.name}`}
          >
            <Phone size={16} />
            Call to Book
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-5 py-3.5 rounded-full text-sm font-semibold transition-colors"
            aria-label={`Get directions to ${location.name}`}
          >
            <MapPin size={16} />
            Get Directions
          </a>
        </div>
        <button
          onClick={handleSelectLocation}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-colors ${
            isSelected
              ? 'bg-bronze/10 text-bronze'
              : 'text-warmGray hover:text-secondary'
          }`}
        >
          {isSelected ? '✓ This is my salon' : 'Set as my salon'}
        </button>
      </div>
    </article>
  );
};

export default LocationCard;
