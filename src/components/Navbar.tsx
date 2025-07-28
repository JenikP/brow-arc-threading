import { useState } from "react";
import { Menu, X, Phone, MapPin, AlertCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLocationStore } from "../stores/locationStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LoadingSpinner from "./ui/loading-spinner";

const locationNames = {
  location1: "Brandon Park",
  location2: "Southland",
  location3: "Pakenham",
  location4: "Stud Park",
  location5: "Heidelberg"
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedLocation, setSelectedLocation, isLoading } = useLocationStore();

  const handleCall = () => {
    window.location.href = "tel:+61415469594";
  };

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 lg:h-24 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center p-1 sm:p-2 md:p-3">
              <img 
  src="/lovable-uploads/c3344f81-1e98-4f81-9573-1d658bc58c98.png" 
  alt="Brow Arc Threading Logo" 
  className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-auto max-h-[64px] sm:max-h-[80px] md:max-h-[96px] lg:max-h-[112px]"
/>

            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center md:space-x-4 lg:space-x-8">
            <button 
              onClick={() => handleNavigation('services')} 
              className="text-charcoal hover:text-secondary transition-colors relative group md:text-sm lg:text-base"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className="text-charcoal hover:text-secondary transition-colors relative group md:text-sm lg:text-base"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavigation('testimonials')} 
              className="text-charcoal hover:text-secondary transition-colors relative group md:text-sm lg:text-base"
            >
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link 
              to="/locations" 
              className="text-charcoal hover:text-secondary transition-colors relative group md:text-sm lg:text-base"
            >
              Locations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button 
              onClick={() => handleNavigation('contact')} 
              className="text-charcoal hover:text-secondary transition-colors relative group md:text-sm lg:text-base"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger 
                className="flex items-center space-x-2 md:px-2 lg:px-3 md:py-1 lg:py-2 rounded-md bg-white border-2 border-primary/20 hover:border-primary text-charcoal hover:text-secondary transition-colors md:h-8 lg:h-10 xl:h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <MapPin size={20} className="sm:w-5 sm:h-5" />
                    <AlertCircle size={22} className="sm:w-6 sm:h-6 text-yellow-500" />
                    <span className="md:text-xs lg:text-sm xl:text-base font-bold">{selectedLocation ? locationNames[selectedLocation as keyof typeof locationNames] : "Select Location"}</span>
                  </>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-primary/20 shadow-[0_8px_30px_rgb(247,202,201,0.4)] backdrop-blur-sm z-50">
                {Object.entries(locationNames).map(([key, name]) => (
                  <DropdownMenuItem
                    key={key}
                    className={`cursor-pointer hover:bg-primary/20 py-3 sm:py-2 text-base sm:text-sm ${
                      selectedLocation === key ? 'bg-primary/10 font-medium text-secondary' : ''
                    }`}
                    onClick={() => setSelectedLocation(key)}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button 
              onClick={handleCall}
              className="bg-primary hover:bg-primary-dark text-secondary md:px-3 lg:px-6 md:py-1 lg:py-2 rounded-full transition-colors flex items-center md:gap-1 lg:gap-2 hover:scale-105 transform duration-200 md:text-sm lg:text-base"
            >
              <Phone size={16} className="md:w-4 md:h-4 lg:w-5 lg:h-5" />
              Book Now
            </button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 px-2 py-2 bg-white/90 border-2 border-primary/20 hover:border-primary rounded-md text-charcoal hover:text-secondary transition-colors backdrop-blur-sm text-xs max-w-[140px]">
                <MapPin size={16} />
                <AlertCircle size={18} className="text-yellow-500" />
                <span className="font-bold truncate">{selectedLocation ? locationNames[selectedLocation as keyof typeof locationNames].split(' ')[0] : "Location"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-2 border-primary/20 shadow-[0_8px_30px_rgb(247,202,201,0.4)] backdrop-blur-sm z-50 w-44">
                {Object.entries(locationNames).map(([key, name]) => (
                  <DropdownMenuItem
                    key={key}
                    className={`cursor-pointer hover:bg-primary/20 py-3 text-sm font-bold ${selectedLocation === key ? 'bg-primary/10 font-bold text-secondary' : ''}`}
                    onClick={() => setSelectedLocation(key)}
                  >
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button onClick={() => setIsOpen(!isOpen)} className="text-charcoal hover:text-secondary transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => handleNavigation('services')} 
                className="block w-full text-left px-3 py-2 text-charcoal hover:text-secondary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavigation('about')} 
                className="block w-full text-left px-3 py-2 text-charcoal hover:text-secondary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('testimonials')} 
                className="block w-full text-left px-3 py-2 text-charcoal hover:text-secondary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                Testimonials
              </button>
              <Link 
                to="/locations" 
                className="block px-3 py-2 text-charcoal hover:text-secondary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                Locations
              </Link>
              <button 
                onClick={() => handleNavigation('contact')} 
                className="block w-full text-left px-3 py-2 text-charcoal hover:text-secondary hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                Contact
              </button>
              <button 
                onClick={handleCall}
                className="w-full mt-4 bg-primary hover:bg-primary-dark text-secondary px-6 py-2 rounded-full flex items-center justify-center gap-2 hover:scale-105 transform duration-200"
              >
                <Phone size={18} />
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
