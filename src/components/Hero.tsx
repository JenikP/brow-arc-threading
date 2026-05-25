import { Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const handleCall = () => {
    window.location.href = "tel:+61415469594";
  };

  return (
    <section className="relative bg-pearl pt-20 md:pt-24 lg:pt-28">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center min-h-[calc(100vh-6rem)] py-10 lg:py-16">
          {/* Left: copy */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <p className="kicker text-bronze mb-4 sm:mb-6">Melbourne · Est. 2014</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-secondary leading-[1.05] mb-5 sm:mb-6 text-balance">
              Melbourne Brow &amp; <em className="italic text-bronze">Threading</em> Specialists
            </h1>
            <p className="text-warmGray text-base sm:text-lg lg:text-xl leading-relaxed mb-7 sm:mb-9 max-w-xl">
              Precision eyebrow threading, lash extensions and beauty treatments — across 5 friendly Melbourne salons. Walk-ins welcome, no appointment needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <button
                onClick={handleCall}
                className="group inline-flex items-center justify-center gap-2.5 bg-secondary text-pearl px-7 py-4 rounded-full text-base font-semibold tracking-wide shadow-card hover:shadow-lux hover:bg-bronze transition-all duration-300"
                aria-label="Call now to book an appointment"
              >
                <Phone size={18} className="group-hover:rotate-12 transition-transform" />
                Call Now to Book
              </button>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 border border-secondary/30 text-secondary px-7 py-4 rounded-full text-base font-medium hover:bg-secondary hover:text-pearl transition-colors"
              >
                View Services &amp; Prices
              </a>
            </div>

            <div className="flex items-center gap-5 pt-2">
              <a href="tel:+61415469594" className="text-secondary font-medium hover:text-bronze transition-colors text-sm sm:text-base">
                +61&nbsp;415&nbsp;469&nbsp;594
              </a>
              <span className="text-warmGray/40">·</span>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-bronze text-bronze" />
                ))}
                <span className="text-warmGray text-sm ml-1">5.0 Google</span>
              </div>
            </div>
          </div>

          {/* Right: imagery split-screen */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden shadow-lux">
              <img
                src="/lovable-uploads/hero.jpg"
                alt="Eyebrow threading specialist shaping perfect brows in Melbourne"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <div className="hidden sm:block absolute -bottom-6 -left-4 lg:-left-8 bg-pearl px-5 py-4 rounded-2xl shadow-card border border-sand max-w-[220px]">
              <p className="font-serif text-2xl lg:text-3xl text-secondary leading-none">10+</p>
              <p className="kicker text-bronze mt-1">Years of artistry</p>
            </div>
            <div className="hidden sm:block absolute -top-4 -right-3 lg:-right-6 bg-secondary text-pearl px-5 py-3 rounded-2xl shadow-card">
              <p className="kicker mb-0.5 text-primary">Open 7 Days</p>
              <p className="text-sm font-medium">Walk-ins welcome</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
