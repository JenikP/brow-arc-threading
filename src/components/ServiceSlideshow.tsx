
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useEffect } from "react";

const services = [
  {
    title: "Eyebrow Threading",
    description: "Expert shaping and definition for your brows",
    image: "https://media.istockphoto.com/id/1210999190/photo/eyebrow-threading-macro.jpg?s=612x612&w=0&k=20&c=E8clbQve_mdCyOFqbSYv7SO6pdHNle7Qp_xq50Kyd60="
  },
  {
    title: "Facial Threading",
    description: "Gentle hair removal for a smoother complexion",
    image: "https://media.istockphoto.com/id/1060643400/photo/beautiful-young-woman-with-healthy-clean-skin-waxing-epilation-threading-hair-removal-cream.jpg?s=612x612&w=0&k=20&c=CdBjtGFBiQQYqrZ8jQOkO6NPaS9jbDDdcY_Wmhy3zuo="
  },
  {
    title: "Body Waxing",
    description: "Professional waxing services for lasting smoothness",
    image: "https://media.istockphoto.com/id/1226105739/photo/close-up-photo-of-a-sugaring-procedure-done-at-the-salon-during-a-leg-skin-protection-session.jpg?s=612x612&w=0&k=20&c=aDP_J72jwDzBxNcHw0EKRIozeLpkcmH5HfwvYlbGLZg="
  },
  {
    title: "Beauty Add-Ons",
    description: "Enhance your look with our beauty services",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
  },
  {
    title: "Facial Treatments",
    description: "Rejuvenating facials for glowing skin",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"
  }
];

const ServiceSlideshow = () => {
  // Create a plugin with restart on mouse leave to ensure it continues on mobile
  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false, // Changed to false so it doesn't stop on touch
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  // Effect to ensure autoplay is working correctly on mobile
  useEffect(() => {
    const autoplayPlugin = plugin.current;
    return () => {
      // Cleanup function
      autoplayPlugin.stop();
    };
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-pearl">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <p className="kicker text-bronze mb-3">What we do</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary">
            Our Beauty Services
          </h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {services.map((service, index) => (
                <CarouselItem key={index} className="md:basis-1/2 sm:basis-4/5 basis-full">
                  <div className="p-4">
                    <div className="rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 hover:scale-105">
                      <div className="relative h-72">
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white text-center p-6 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                            <p className="text-lg leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-semibold text-secondary mb-3">
                          {service.title}
                        </h3>
                        <p className="text-warmGray text-lg">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 md:hidden">
              <CarouselPrevious className="mx-2" />
              <CarouselNext className="mx-2" />
            </div>
            <CarouselPrevious className="hidden md:flex -left-16" />
            <CarouselNext className="hidden md:flex -right-16" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlideshow;
