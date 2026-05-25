import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const MobileCallBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-pearl/95 backdrop-blur border-t border-sand shadow-[0_-8px_24px_rgba(45,37,32,0.08)] px-3 py-2.5 flex gap-2 safe-area-pb">
      <Link
        to="/locations"
        className="flex-1 flex items-center justify-center gap-2 border border-secondary/30 text-secondary font-medium py-3 rounded-full text-sm active:scale-95 transition-transform"
        aria-label="View our 5 Melbourne locations"
      >
        <MapPin size={16} />
        Locations
      </Link>
      <a
        href="tel:+61415469594"
        className="flex-[1.5] flex items-center justify-center gap-2 bg-secondary text-pearl font-semibold py-3 rounded-full text-sm shadow-card active:scale-95 transition-transform"
        aria-label="Call to book an appointment"
      >
        <Phone size={16} />
        Call to Book
      </a>
    </div>
  );
};

export default MobileCallBar;
