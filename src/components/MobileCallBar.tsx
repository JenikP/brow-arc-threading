import { Phone, MapPin } from "lucide-react";

const MobileCallBar = () => {
  const handleCall = () => {
    window.location.href = "tel:+61415469594";
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t-2 border-primary/30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 py-2 flex gap-2 safe-area-pb">
      <button
        onClick={scrollToServices}
        className="flex-1 flex items-center justify-center gap-2 border-2 border-secondary text-secondary font-semibold py-3 rounded-full text-sm active:scale-95 transition-transform"
        aria-label="View our services and prices"
      >
        <MapPin size={16} />
        Services
      </button>
      <button
        onClick={handleCall}
        className="flex-[1.4] flex items-center justify-center gap-2 bg-secondary text-white font-bold py-3 rounded-full text-sm shadow-md active:scale-95 transition-transform"
        aria-label="Call to book an appointment"
      >
        <Phone size={18} />
        Tap to Call & Book
      </button>
    </div>
  );
};

export default MobileCallBar;
