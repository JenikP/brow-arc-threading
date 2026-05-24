
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the image in the background
    const img = new Image();
    img.src = '/lovable-uploads/hero.jpg';
    img.onload = () => setIsImgLoaded(true);
  }, []);
  
  const handleCall = () => {
    window.location.href = "tel:+61415469594";
  };

  return (
    <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-screen flex items-center bg-pearl">
      {/* Background image with fade-in effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isImgLoaded ? 'opacity-10' : 'opacity-0'}`}
        style={{ backgroundImage: `url('/lovable-uploads/hero.jpg')` }}
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-4 sm:mb-6">
            Expert Eyebrow Threading, Close to Home
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-warmGray mb-6 sm:mb-8">
            Perfect brows in minutes. 5 friendly salons across Melbourne — walk-ins welcome, no appointment needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={handleCall}
              className="bg-secondary hover:bg-secondary-light text-white px-6 sm:px-8 py-3 sm:py-3 rounded-full text-base sm:text-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              aria-label="Call now to book an appointment"
            >
              <Phone size={20} />
              Call Now to Book
            </button>
            <a 
              href="#services"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-6 sm:px-8 py-3 sm:py-3 rounded-full text-base sm:text-lg transition-colors text-center font-medium"
            >
              See Services & Prices
            </a>
          </div>
          <p className="mt-4 text-sm text-warmGray">
            📞 <a href="tel:+61415469594" className="font-semibold text-secondary hover:underline">+61 415 469 594</a> · Open 7 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
