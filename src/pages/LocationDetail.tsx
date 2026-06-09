import { useParams, Link, Navigate } from "react-router-dom";
import { Phone, MapPin, Clock, Navigation, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { locations } from "../data/locationData";
import { useOpenStatus } from "../hooks/useOpenStatus";

const LocationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = locations.find((l) => l.slug === slug);
  const status = useOpenStatus(location?.hours ?? {});

  if (!location) {
    return <Navigate to="/locations" replace />;
  }

  const others = locations.filter((l) => l.slug !== location.slug);
  const mapsUrl =
    location.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${location.name} ${location.address}`
    )}`;

  const today = new Date().getDay();
  const todayKey =
    Object.keys(location.hours).find((k) => {
      if (today === 0) return /sun/i.test(k);
      if (today === 6) return /sat/i.test(k);
      if (today === 1) return /mon/i.test(k);
      if (today === 2) return /tue/i.test(k);
      if (today === 3) return /wed/i.test(k);
      if (today === 4) return /thu/i.test(k);
      return /fri/i.test(k);
    }) ?? Object.keys(location.hours)[0];

  const title = `${location.name} – Brow Arc Threading ${location.neighborhood ?? "Melbourne"}`;
  const description = `${location.tagline ?? `Brow Arc Threading at ${location.name}`}. Threading, henna brows, tinting & waxing. Call to book — ${location.address}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: `Brow Arc Threading — ${location.name}`,
    image: `https://brow-arc-threading.lovable.app${location.image}`,
    telephone: location.phone,
    address: { "@type": "PostalAddress", streetAddress: location.address },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    url: `https://brow-arc-threading.lovable.app/locations/${location.slug}`,
  };

  return (
    <div className="min-h-screen bg-pearl">
      <SEO
        title={title}
        description={description}
        canonical={`/locations/${location.slug}`}
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <Link
            to="/locations"
            className="inline-flex items-center gap-1.5 text-bronze hover:text-secondary text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> All locations
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="kicker text-bronze mb-3">
                {location.neighborhood ?? "Melbourne"} · Brow Arc Threading
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-secondary leading-[1.05] mb-4">
                {location.name}
              </h1>
              {location.tagline && (
                <p className="text-warmGray text-lg sm:text-xl leading-relaxed mb-5 max-w-xl">
                  {location.tagline}
                </p>
              )}

              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ring-1 mb-6 ${
                  status.isOpen
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                    : "bg-rose-50 text-rose-700 ring-rose-200"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  {status.isOpen && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      status.isOpen ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                </span>
                <span className="text-xs font-semibold">
                  {status.label}
                  <span className="font-normal opacity-80"> · {status.detail}</span>
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <a
                  href={`tel:${location.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-bronze text-pearl px-5 py-3.5 rounded-full text-sm font-semibold shadow-card transition-colors active:scale-[0.98]"
                >
                  <Phone size={16} /> Call {location.neighborhood ?? "Salon"}
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-pearl border border-bronze text-bronze hover:bg-bronze hover:text-pearl px-5 py-3.5 rounded-full text-sm font-semibold transition-colors active:scale-[0.98]"
                >
                  <MapPin size={16} /> Get Directions
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-card border border-sand aspect-[4/3] lg:aspect-[5/4]">
              <img
                src={location.image}
                alt={`${location.name} salon interior`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick info strip */}
      <section className="border-y border-sand bg-white/60">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="text-bronze shrink-0 mt-0.5" size={18} />
            <div>
              <p className="kicker text-bronze text-[10px] mb-1">Address</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary text-sm leading-snug hover:text-bronze"
              >
                {location.address}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-bronze shrink-0 mt-0.5" size={18} />
            <div>
              <p className="kicker text-bronze text-[10px] mb-1">Phone</p>
              <a
                href={`tel:${location.phone}`}
                className="text-secondary text-sm font-medium hover:text-bronze"
              >
                {location.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-bronze shrink-0 mt-0.5" size={18} />
            <div>
              <p className="kicker text-bronze text-[10px] mb-1">Today</p>
              <p className="text-secondary text-sm">{location.hours[todayKey]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hours + Finding us */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft">
            <h2 className="font-serif text-2xl sm:text-3xl text-secondary mb-5">Opening hours</h2>
            <div className="divide-y divide-stone-200/60">
              {Object.entries(location.hours).map(([day, hrs]) => (
                <div
                  key={day}
                  className={`flex justify-between items-baseline gap-3 py-2.5 ${
                    day === todayKey ? "text-bronze" : ""
                  }`}
                >
                  <span
                    className={`text-sm ${
                      day === todayKey ? "text-bronze font-semibold" : "text-warmGray"
                    }`}
                  >
                    {day}
                    {day === todayKey && <span className="ml-2 text-[10px] uppercase tracking-wider">Today</span>}
                  </span>
                  <span
                    className={`text-sm font-medium text-right whitespace-nowrap ${
                      day === todayKey ? "text-bronze" : "text-secondary"
                    }`}
                  >
                    {hrs}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-soft">
            <h2 className="font-serif text-2xl sm:text-3xl text-secondary mb-5">Finding us</h2>
            {location.mallDirections && (
              <p className="flex items-start gap-2 text-bronze italic mb-4">
                <Navigation size={14} className="mt-1 shrink-0" />
                <span>{location.mallDirections}</span>
              </p>
            )}
            {location.landmarks && location.landmarks.length > 0 && (
              <ul className="space-y-2 mb-6">
                {location.landmarks.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-warmGray text-sm">
                    <ChevronRight size={14} className="text-bronze mt-0.5 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-bronze text-pearl px-5 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              <MapPin size={15} /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Popular services */}
      {location.popularServices && location.popularServices.length > 0 && (
        <section className="py-14 lg:py-20 bg-sand/30">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="kicker text-bronze mb-3">At this salon</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-secondary leading-tight">
                Popular services in {location.neighborhood ?? "this salon"}
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {location.popularServices.map((svc) => (
                <Link
                  key={svc}
                  to="/#services"
                  className="group flex items-start gap-2 bg-white rounded-2xl border border-sand p-4 hover:border-bronze hover:shadow-card transition-all"
                >
                  <Sparkles size={16} className="text-bronze shrink-0 mt-0.5" />
                  <span className="text-secondary text-sm font-medium group-hover:text-bronze">
                    {svc}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-warmGray text-sm mt-6">
              Full menu and pricing on the{" "}
              <Link to="/#services" className="text-bronze underline hover:text-secondary">
                services page
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* Other locations */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl text-secondary">Our other salons</h2>
            <Link to="/locations" className="text-bronze hover:text-secondary text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/locations/${o.slug}`}
                className="group bg-white rounded-2xl border border-sand overflow-hidden hover:shadow-card transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="kicker text-bronze text-[10px] mb-1">{o.neighborhood}</p>
                  <h3 className="font-serif text-lg text-secondary leading-tight group-hover:text-bronze transition-colors">
                    {o.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile sticky call */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-pearl/95 backdrop-blur border-t border-sand px-4 py-3 shadow-card">
        <a
          href={`tel:${location.phone}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-pearl px-5 py-3.5 rounded-full text-sm font-semibold shadow-card active:scale-[0.98]"
        >
          <Phone size={16} /> Call {location.name}
        </a>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />

      <Footer />
    </div>
  );
};

export default LocationDetail;
