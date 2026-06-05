import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "../data/locationData";
import { useOpenStatus } from "../hooks/useOpenStatus";
import type { LocationData, LocationHours } from "../types/location";

const getTodayHoursKey = (hours: LocationHours): string | null => {
  const day = new Date().getDay();
  const keys = Object.keys(hours);
  const match = (p: (k: string) => boolean) => keys.find(p) ?? null;
  if (day === 0) return match((k) => /sun/i.test(k));
  if (day === 6) return match((k) => /sat/i.test(k));
  if (day === 1) return match((k) => /mon/i.test(k)) ?? keys[0];
  if (day === 2) return match((k) => /tue/i.test(k)) ?? keys[0];
  if (day === 3) return match((k) => /wed/i.test(k)) ?? keys[0];
  if (day === 4) return match((k) => /thu/i.test(k)) ?? keys[0];
  return match((k) => /fri/i.test(k)) ?? keys[0];
};

const StatusPill = ({ hours }: { hours: LocationHours }) => {
  const status = useOpenStatus(hours);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ring-1 text-[10px] font-semibold tracking-wide ${
        status.isOpen
          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
          : "bg-rose-50 text-rose-700 ring-rose-200"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.isOpen && (
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
        )}
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
            status.isOpen ? "bg-emerald-500" : "bg-rose-500"
          }`}
        />
      </span>
      {status.label}
    </span>
  );
};

const HomeLocationCard = ({ loc }: { loc: LocationData }) => {
  const mapsUrl =
    loc.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${loc.name} ${loc.address}`
    )}`;
  const todayKey = getTodayHoursKey(loc.hours);
  const todayHours = todayKey ? loc.hours[todayKey] : null;

  return (
    <article className="bg-white rounded-3xl overflow-hidden border border-sand shadow-soft hover:shadow-card transition-shadow flex flex-col h-full">
      <div className="relative h-44 shrink-0">
        <img
          src={loc.image}
          alt={`${loc.name} salon`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
        <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="kicker text-pearl/80 mb-0.5">Melbourne</p>
            <h3 className="font-serif text-2xl text-pearl truncate">{loc.name}</h3>
          </div>
          <StatusPill hours={loc.hours} />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-warmGray text-sm leading-relaxed mb-3">{loc.address}</p>

        <div className="min-h-[1.5rem] mb-2.5">
          {loc.mallDirections && (
            <p className="flex items-start gap-1.5 text-bronze text-[12px] italic leading-snug">
              <Navigation size={11} className="mt-0.5 shrink-0" />
              <span>{loc.mallDirections}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[12px] text-secondary mb-5">
          <Clock size={12} className="text-bronze shrink-0" />
          <span className="font-medium">Today:</span>
          <span className="text-warmGray truncate">{todayHours ?? "See full hours"}</span>
        </div>

        <div className="mt-auto flex flex-col sm:flex-row gap-2.5">
          <a
            href={`tel:${loc.phone}`}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-bronze text-pearl px-4 py-3 rounded-full text-sm font-semibold transition-colors shadow-card active:scale-[0.98]"
            aria-label={`Call ${loc.name}`}
          >
            <Phone size={15} />
            Call to Book
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-4 py-3 rounded-full text-sm font-semibold transition-colors active:scale-[0.98]"
            aria-label={`Get directions to ${loc.name}`}
          >
            <MapPin size={15} />
            Directions
          </a>
        </div>
      </div>
    </article>
  );
};

const HomeLocations = () => {
  return (
    <section id="our-locations" className="py-20 lg:py-28 bg-pearl">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="kicker text-bronze mb-4">Find your nearest salon</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-4 leading-[1.1]">
            5 <em className="italic text-bronze">Melbourne</em> Salons
          </h2>
          <p className="text-warmGray text-base sm:text-lg">
            Call any salon directly, or tap <em>Directions</em> to navigate there.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {locations.map((loc) => (
            <HomeLocationCard key={loc.id} loc={loc} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 text-bronze hover:text-secondary font-medium transition-colors"
          >
            View full details, hours &amp; map →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeLocations;
