
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
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">
            Our Services & Prices
          </h2>
          <p className="text-warmGray text-sm sm:text-base max-w-2xl mx-auto">
            Browse our treatments below. Pick your salon at the top of the page to see exact prices for that location.
          </p>
          {selectedLocation ? (
            <p className="mt-3 inline-block bg-primary/10 text-secondary font-semibold text-sm sm:text-base px-4 py-2 rounded-full">
              ✓ Showing prices for: {locationNames[selectedLocation as keyof typeof locationNames]}
            </p>
          ) : (
            <p className="mt-3 inline-block bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium text-sm px-4 py-2 rounded-full">
              👆 Tip: Choose your salon at the top to see prices
            </p>
          )}
          
          {/* Search functionality */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmGray" size={20} />
              <Input
                type="text"
                placeholder="Search a service (e.g. eyebrow, facial, wax)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 border-primary/20 focus:border-primary focus:ring-primary"
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

        <div className="text-center mt-10 sm:mt-12">
          <button 
            onClick={handleCall}
            className="bg-primary hover:bg-primary-dark text-secondary px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg transition-colors flex items-center gap-2 mx-auto"
          >
            <Phone size={18} />
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
