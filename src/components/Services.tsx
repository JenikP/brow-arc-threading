
import { Phone } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../stores/locationStore";
import { toast } from "sonner";
import { services, locationNames } from "../data/servicesData";
import LoadingSpinner from "./ui/loading-spinner";

// Lazy load the ServiceCategory component
const ServiceCategory = lazy(() => import('./services/ServiceCategory'));

const Services = () => {
  const { selectedLocation, setSelectedLocation, isLoading, error } = useLocationStore();
  const navigate = useNavigate();

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


  return (
    <section id="services" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">
            Our Services
          </h2>
          <p className="text-warmGray text-sm sm:text-base max-w-2xl mx-auto">
            Experience our comprehensive range of professional beauty services, 
            tailored to enhance your natural beauty.
          </p>
          {selectedLocation && (
            <p className="mt-2 text-primary text-sm sm:text-base">
              Showing prices for: {locationNames[selectedLocation as keyof typeof locationNames]}
            </p>
          )}
        </div>

        <Suspense fallback={<div className="py-12 flex justify-center"><LoadingSpinner /></div>}>
          {Object.entries(services).map(([category, items]) => (
            <ServiceCategory 
              key={category} 
              category={category} 
              items={items} 
              selectedLocation={selectedLocation}
            />
          ))}
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
