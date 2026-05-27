import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "../data/locationData";
import StylizedLocationMap from "./locations/StylizedLocationMap";

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
            Tap a pin on the map to open directions, or call any salon directly below.
          </p>
        </div>

        <div className="mb-12">
          <StylizedLocationMap />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc) => {
            const mapsUrl =
              loc.directionsUrl ||
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${loc.name} ${loc.address}`)}`;
            return (
              <article
                key={loc.id}
                className="bg-white rounded-3xl overflow-hidden border border-sand shadow-soft hover:shadow-card transition-shadow flex flex-col"
              >
                <div className="relative h-44">
                  <img
                    src={loc.image}
                    alt={`${loc.name} salon`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                  <div className="absolute bottom-3 left-5">
                    <p className="kicker text-pearl/80 mb-0.5">Melbourne</p>
                    <h3 className="font-serif text-2xl text-pearl">{loc.name}</h3>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-warmGray text-sm leading-relaxed mb-5 flex-1">
                    {loc.address}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={`tel:${loc.phone}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-bronze text-pearl px-4 py-3 rounded-full text-sm font-semibold transition-colors shadow-card"
                      aria-label={`Call ${loc.name}`}
                    >
                      <Phone size={15} />
                      Call to Book
                    </a>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-4 py-3 rounded-full text-sm font-semibold transition-colors"
                      aria-label={`Get directions to ${loc.name}`}
                    >
                      <MapPin size={15} />
                      Directions
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
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
