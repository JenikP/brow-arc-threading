import { motion } from "framer-motion";

interface ServiceDetailsProps {
  title: string;
  price: string;
  description: string;
}

const ServiceDetails = ({ title, price, description }: ServiceDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-full p-6 bg-white flex flex-col"
    >
      <h4 className="font-serif text-xl text-secondary mb-2">{title}</h4>
      <p className="text-sm text-warmGray leading-relaxed mb-4 flex-1">{description}</p>
      <div className="pt-3 border-t border-sand flex items-baseline justify-between">
        <span className="kicker text-bronze">From</span>
        <span className="font-serif text-2xl text-bronze">{price}</span>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;
