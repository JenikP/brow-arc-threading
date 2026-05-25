import { FC } from 'react';
import { motion } from 'framer-motion';
import ServiceDetails from './ServiceDetails';

interface ServiceCardProps {
  title: string;
  price: string;  // This remains required as it's always provided by ServiceCategory
  description: string;
  image: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, price, description, image }) => {
  return (
    <motion.div 
      className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-sand shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-56 sm:h-60 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      <div className="flex-grow flex flex-col">
        <ServiceDetails
          title={title}
          price={price}
          description={description}
        />
      </div>
    </motion.div>
  );
};

export default ServiceCard;