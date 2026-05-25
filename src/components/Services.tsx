
import { Phone, Search } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../stores/locationStore";
import { toast } from "sonner";
import { services, locationNames } from "../data/servicesData";
import LoadingSpinner from "./ui/loading-spinner";
import { Input } from "./ui/input";

// Lazy load the ServiceCategory component
const ServiceCategory = lazy(() => import('./services/ServiceCategory'));

const Services = () => {
  const { selectedLocation, setSelectedLocation, isLoading, error } = useLocationStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (error) {
      toast.error("Location Error", {
        description: error
      });
    }
  }, [error]);

  const handleLocationSelect = (location: string) => {
    try {
      if (!location) {
        throw new Error("Please select a valid location");
      }
      setSelectedLocation(location);
    } catch (error) {
      toast.error("Selection Error", {
        description: error instanceof Error ? error.message : "Failed to select location"
      });
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+61123456789";
  };

  const handleViewLocations = () => {
    navigate('/locations');
  };

  // Filter services based on search query
  const filterServices = () => {
    if (!searchQuery.trim()) return services;
    
    const filtered: any = {};
    Object.entries(services).forEach(([category, items]) => {
      const filteredItems = items.filter((item: any) => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    return filtered;
  };

  const filteredServices = filterServices();


  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
          <p className="kicker text-bronze mb-4">Services & Prices</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-5">
            Crafted for <em className="italic text-bronze">every brow</em>
          </h2>
          <p className="text-warmGray text-base sm:text-lg leading-relaxed">
            Browse our treatments below. Pick your salon at the top of the page to see exact pricing for that location.
          </p>
          {selectedLocation ? (
            <p className="mt-5 inline-flex items-center gap-2 bg-sand text-secondary font-medium text-sm px-5 py-2.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-bronze" />
              Showing prices for {locationNames[selectedLocation as keyof typeof locationNames]}
            </p>
          ) : (
            <p className="mt-5 inline-block bg-sand/60 border border-sand text-secondary text-sm px-5 py-2.5 rounded-full">
              Tip: choose your salon at the top to see exact prices
            </p>
          )}

          <div className="mt-7 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warmGray" size={18} />
              <Input
                type="text"
                placeholder="Search a service (e.g. eyebrow, facial, wax)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 bg-pearl border border-sand focus:border-bronze focus:ring-bronze rounded-full"
              />
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="py-12 flex justify-center"><LoadingSpinner /></div>}>
          {searchQuery.trim() && Object.keys(filteredServices).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-warmGray text-lg">No services found matching "{searchQuery}"</p>
              <p className="text-warmGray text-sm mt-2">Try searching with different keywords</p>
            </div>
          ) : (
            Object.entries(filteredServices).map(([category, items]) => (
              <ServiceCategory 
                key={category} 
                category={category} 
                items={items as any} 
                selectedLocation={selectedLocation}
              />
            ))
          )}
        </Suspense>

        <div className="text-center mt-10 lg:mt-14">
          <a
            href="tel:+61415469594"
            className="inline-flex items-center gap-2.5 bg-secondary hover:bg-bronze text-pearl px-8 py-4 rounded-full text-base font-semibold shadow-card hover:shadow-lux transition-all"
          >
            <Phone size={18} />
            Call to Book Your Treatment
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
