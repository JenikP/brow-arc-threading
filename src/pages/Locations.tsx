import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import { locations as allLocations, locations } from "../data/locationData";
import LocationQuickNav from "../components/locations/LocationQuickNav";
import StylizedLocationMap from "../components/locations/StylizedLocationMap";

const LocationList = lazy(() => import("../components/locations/LocationList"));

const locationsJsonLd = {
  "@context": "https://schema.org",
  "@graph": allLocations.map((l) => ({
    "@type": "LocalBusiness",
    "name": `Brow Arc Threading — ${l.name}`,
    "image": `https://brow-arc-threading.lovable.app${l.image}`,
    "telephone": l.phone,
    "address": { "@type": "PostalAddress", "streetAddress": l.address, "addressLocality": "Melbourne", "addressRegion": "VIC", "addressCountry": "AU" },
    "geo": { "@type": "GeoCoordinates", "latitude": l.coordinates.lat, "longitude": l.coordinates.lng },
    "url": "https://brow-arc-threading.lovable.app/locations"
  }))
};

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-pearl w-full overflow-x-hidden">
      <SEO
        title="Our 5 Melbourne Locations | Brow Arc Threading"
        description="Find Brow Arc Threading at Brandon Park, Southland, Pakenham, Stud Park and Heidelberg. Addresses, hours and maps for all 5 Melbourne studios."
        canonical="/locations"
        jsonLd={locationsJsonLd}
      />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pt-24 sm:pt-28 pb-32 sm:pb-24">
        <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
          <p className="kicker text-bronze mb-4">Find us</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-4 leading-[1.1]">
            5 Convenient <em className="italic text-bronze">Melbourne</em> Locations
          </h1>
          <p className="text-warmGray text-base sm:text-lg">
            Walk into any of our salons — each space is designed for privacy, comfort and beautifully precise results.
          </p>
        </div>

        <LocationQuickNav locations={locations} onSelect={setSelectedLocation} />

        <div className="mb-8 sm:mb-12">
          <StylizedLocationMap />
        </div>

        <Suspense fallback={<div className="h-[400px] bg-sand/40 animate-pulse rounded-3xl"></div>}>
          <LocationList
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationSelect={setSelectedLocation}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Locations;
