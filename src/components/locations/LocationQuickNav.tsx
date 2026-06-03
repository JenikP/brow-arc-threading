import { MapPin, Check } from "lucide-react";
import { LocationData } from "../../types/location";

interface Props {
  locations: LocationData[];
  selectedId?: number | null;
  onSelect: (id: number) => void;
}

const LocationQuickNav = ({ locations, selectedId, onSelect }: Props) => {
  const handleClick = (id: number) => {
    onSelect(id);
    const el = document.getElementById(`location-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white border border-sand rounded-3xl shadow-soft py-5 sm:p-6 mb-8 sm:mb-10">
      <div className="flex items-center gap-2 mb-4 px-5 sm:px-0">
        <MapPin size={16} className="text-bronze" />
        <p className="kicker text-bronze">Find Your Nearest Salon</p>
      </div>

      {/* Mobile: horizontal scroll with edge fade. Desktop: wrap */}
      <div className="relative">
        <div
          className="flex flex-row sm:flex-wrap overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal scrollbar-none snap-x snap-mandatory gap-3 sm:gap-2 px-5 sm:px-0 pb-1 sm:pb-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {locations.map((l) => {
            const active = selectedId === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleClick(l.id)}
                aria-pressed={active}
                className={`shrink-0 snap-start inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors active:scale-95
                  ${
                    active
                      ? "bg-bronze text-pearl border-bronze shadow-card"
                      : "bg-pearl border-sand text-secondary hover:bg-secondary hover:text-pearl hover:border-secondary"
                  }`}
                aria-label={`Jump to ${l.name} location`}
              >
                {active && <Check size={13} />}
                {l.name}
              </button>
            );
          })}
          <span className="shrink-0 w-2 sm:hidden" aria-hidden />
        </div>
        {/* Right edge fade hint (mobile only) */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-10 sm:hidden"
          style={{
            background: "linear-gradient(to left, #ffffff, rgba(255,255,255,0))",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export default LocationQuickNav;
