import { FacebookIcon, InstagramIcon, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-pearl pt-16 pb-10">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl mb-3">Brow Arc Threading</h3>
            <p className="text-pearl/70 max-w-md leading-relaxed">
              Where precision meets beauty. Melbourne's trusted destination for expert eyebrow threading, brows, lashes and beauty since 2014.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/browarcthreading/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-pearl/20 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="http://instagram.com/browarcthreading/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-pearl/20 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="kicker text-primary mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="text-pearl/70 hover:text-primary transition-colors">Services</a></li>
              <li><a href="#about" className="text-pearl/70 hover:text-primary transition-colors">About</a></li>
              <li><a href="#testimonials" className="text-pearl/70 hover:text-primary transition-colors">Reviews</a></li>
              <li><a href="/#faq" className="text-pearl/70 hover:text-primary transition-colors">FAQ</a></li>
              <li><Link to="/locations" className="text-pearl/70 hover:text-primary transition-colors">Locations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="kicker text-primary mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+61415469594" className="flex items-center gap-2 text-pearl/70 hover:text-primary transition-colors">
                  <Phone size={14} /> +61 415 469 594
                </a>
              </li>
              <li>
                <a href="mailto:browarcthreading@yahoo.com" className="flex items-center gap-2 text-pearl/70 hover:text-primary transition-colors break-all">
                  <Mail size={14} /> browarcthreading@yahoo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pearl/10 mt-12 pt-6 text-center text-pearl/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Brow Arc Threading. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
