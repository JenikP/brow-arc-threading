import { FC } from 'react';
import ServiceCard from './ServiceCard';

interface Service {
  title: string;
  description: string;
  price?: string;
  locationPrices?: {
    [key: string]: string;
  };
  image?: string;
}

interface ServiceCategoryProps {
  category: string;
  items: Service[];
  selectedLocation: string | null;
}

const ServiceCategory: FC<ServiceCategoryProps> = ({ category, items, selectedLocation }) => {
  const getServiceImage = (service: Service) => {
    if (service.image) {
      return service.image;
    }

    const images: { [key: string]: string } = {
      "Eyebrow Threading/Waxing": "https://media.istockphoto.com/id/1219595426/photo/applying-gold-colored-wax-with-spatula-on-womans-face-stock-photo.jpg?s=612x612&w=0&k=20&c=5foFCtmRPF-SWRmcOn8MpNZCnEM4KIgvbyN6sRqtnKQ=",
      "Upper Lip": "https://media.istockphoto.com/id/1075627666/photo/therapist-waxing-womans-upper-lip.jpg?s=612x612&w=0&k=20&c=_HVVmbTzVMuhpOQD1ZpLteJQdX4Yf5fJL1oFn3mohXg=",
      "Forehead": "https://media.istockphoto.com/id/1083288278/photo/eyebrow-threading-epilation-procedure-for-brow-shape-correction.jpg?s=612x612&w=0&k=20&c=ql2jQHMHAYhUxEMcP0RLVujWbCnHgjoRqWSvkBmS_G4=",
      "Chin": "https://media.istockphoto.com/id/163736832/photo/beauty-salon.jpg?s=612x612&w=0&k=20&c=RntBzJuayNaeSmw1LKvjVTAIJbYxWPfhIwBwr4dlHUc=",
      "Side Burns": "/sideburn.jpg",
      "Full Back": "/fullback.jpg",
      "Half Back": "/fullback.jpg",
      "Neck": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFxDPe1aUQJbTQMhmrWVM1teqvRxTOR2zuuByODTmi8MIkLFmYT3TFyYj7PdGCgLqcCo&usqp=CAU",
      "Full Face": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
      "Under Arms": "https://media.istockphoto.com/id/1391598082/photo/close-up-waxing-arm-paids-area-in-studio-spa.jpg?s=612x612&w=0&k=20&c=ChJ-khvd-TBS0RI8GQJdn61Bo3GT-iM36C--I1xi_3k=",
      "Half Arm": "https://t4.ftcdn.net/jpg/00/78/84/03/240_F_78840300_rGL4knquOPQPdhQF6Ljn5dPc3NSYTWTA.jpg",
      "Full Arm": "https://t4.ftcdn.net/jpg/06/09/83/29/240_F_609832959_84ZzrkR1fQVghlKpiJORBESB6ugbjt0k.jpg",
      "Half Leg": "https://t3.ftcdn.net/jpg/01/44/24/88/240_F_144248813_1PduH2CEnX2mdR9UpVNerzZs6Kv64qsw.jpg",
      "Full Leg": "https://t4.ftcdn.net/jpg/03/59/71/67/240_F_359716770_wbrpDj2nmWCo5pQWG06HvXS7r10S51rs.jpg",
      "Full Body": "https://t4.ftcdn.net/jpg/04/64/67/01/240_F_464670170_zmkaTyJxOmLIgq8GwwJrf3XQ4COJa9i8.jpg",
      "Mini Facial": "https://t3.ftcdn.net/jpg/01/92/98/42/240_F_192984281_jF619bZ4SwP0IgyCT5nPnQrpYi6dXQt7.jpg",
      "Full Facial": "https://t3.ftcdn.net/jpg/08/74/09/20/240_F_874092052_tyNQTd1VKpLnMF8FjGGTQMSJgechEHSK.jpg"
    };
    
    return images[service.title] || images["Eyebrow Threading/Waxing"];
  };

  // Filter out services that are not available for the selected location
  const availableServices = items.filter(service => {
    if (!selectedLocation) return true;
    if (service.locationPrices?.[selectedLocation] === "Not Available") return false;
    return true;
  });

  // Only render the category if there are available services
  if (availableServices.length === 0) return null;

  return (
    <div className="mb-14 sm:mb-16">
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="font-serif text-2xl sm:text-3xl text-secondary capitalize">
          {category.replace(/([A-Z])/g, ' $1').trim()}
        </h3>
        <div className="w-12 h-px bg-bronze mx-auto mt-3" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
        {availableServices.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            price={selectedLocation && service.locationPrices?.[selectedLocation] 
              ? service.locationPrices[selectedLocation]
              : service.price || 'Price varies by location'}
            image={getServiceImage(service)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
