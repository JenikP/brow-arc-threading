import { MapPin, Check } from "lucide-react";
import { LocationData } from "../../types/location";

interface Props {
  locations: LocationData[];
  selectedId?: number | null;
  onSelect: (id: number) => void;
}

const SHORT_NAMES: Record<number, string> = {
  1: "Brandon Park",
  2: "Southland",
  3: "Pakenham",
  4: "Stud Park",
  5: "Warringal",
};

const LocationQuickNav = ({ locations, selectedId, onSelect }: Props) => {
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

      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2">
        {locations.map((l) => {
          const active = selectedId === l.id;
          const short = SHORT_NAMES[l.id] ?? l.name;
          const isLastOdd =
            locations.length % 2 === 1 && l.id === locations[locations.length - 1].id;
          return (
            <button
              key={l.id}
              onClick={() => handleClick(l.id)}
              aria-pressed={active}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-colors active:scale-95 truncate
                ${isLastOdd ? "col-span-2 sm:col-auto" : ""}
                ${
                  active
                    ? "bg-bronze text-pearl border-bronze shadow-card"
                    : "bg-pearl border-sand text-secondary hover:bg-secondary hover:text-pearl hover:border-secondary"
                }`}
              aria-label={`Jump to ${l.name} location`}
            >
              {active && <Check size={12} className="shrink-0" />}
              <span className="truncate">
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{l.name}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LocationQuickNav;
