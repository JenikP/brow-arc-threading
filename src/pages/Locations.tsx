
import { useState, useEffect, lazy, Suspense } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/ui/loading-spinner";
import SEO from "../components/SEO";
import { locations as allLocations } from "../data/locationData";

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

// Lazy-loaded components
const LocationMap = lazy(() => import("../components/locations/LocationMap"));
const LocationList = lazy(() => import("../components/locations/LocationList"));

// Location data moved to a separate file
import { locations } from "../data/locationData";

const Locations = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC4hE2uAkHRHhoZ23Iv8JH_0eXdrDA3ZX0",
    libraries: ["places"] as any,
  });

  // Handle resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show loading state while map is initializing
  if (!isLoaded) return (
    <div className="min-h-screen bg-pearl flex items-center justify-center">
      <div className="animate-pulse text-secondary text-lg">Loading map...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pearl w-full overflow-x-hidden">
      <SEO
        title="Our 5 Melbourne Locations | Brow Arc Threading"
        description="Find Brow Arc Threading at Brandon Park, Southland, Pakenham, Stud Park and Heidelberg. Addresses, hours and maps for all 5 Melbourne studios."
        canonical="/locations"
        jsonLd={locationsJsonLd}
      />
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 pt-24 sm:pt-28">
        <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <p className="kicker text-bronze mb-4">Find us</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-4 leading-[1.1]">
            5 Convenient <em className="italic text-bronze">Melbourne</em> Locations
          </h1>
          <p className="text-warmGray text-base sm:text-lg">
            Walk into any of our salons — each space is designed for privacy, comfort and beautifully precise results.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'lg:grid-cols-2 gap-8'} mb-8 sm:mb-12`}>
          {/* Conditionally show map based on screen size */}
          <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>}>
            {(!isMobile || (isMobile && selectedLocation === null)) && (
              <div className="h-[400px] sm:h-[500px] bg-white rounded-lg shadow-lg overflow-hidden">
                <LocationMap 
                  locations={locations}
                  selectedLocation={selectedLocation}
                  onLocationSelect={setSelectedLocation}
                />
              </div>
            )}
          </Suspense>
          
          <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>}>
            <LocationList 
              locations={locations} 
              selectedLocation={selectedLocation}
              onLocationSelect={setSelectedLocation} 
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Locations;
