import { MapPin } from "lucide-react";
import { LocationData } from "../../types/location";

interface Props {
  locations: LocationData[];
  onSelect: (id: number) => void;
}

const LocationQuickNav = ({ locations, onSelect }: Props) => {
  const handleClick = (id: number) => {
    onSelect(id);
    const el = document.getElementById(`location-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white border border-sand rounded-3xl shadow-soft p-5 sm:p-6 mb-8 sm:mb-10">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={16} className="text-bronze" />
        <p className="kicker text-bronze">Find Your Nearest Salon</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {locations.map((l) => (
          <button
            key={l.id}
            onClick={() => handleClick(l.id)}
            className="px-4 py-2.5 rounded-full bg-pearl border border-sand text-secondary text-sm font-medium hover:bg-secondary hover:text-pearl hover:border-secondary transition-colors active:scale-95"
            aria-label={`Jump to ${l.name} location`}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationQuickNav;
