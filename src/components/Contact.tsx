import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { sanitizeInput, sanitizeEmail, validateMessage } from "../utils/security";
import { checkRateLimit } from "../utils/rateLimiting";
import { config } from "../utils/config";
import { createSecurityError, logSecurityEvent, getSafeErrorMessage } from "../utils/errorHandling";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const error = createSecurityError('RATE_LIMIT', 'Rate limit exceeded');
      logSecurityEvent(error);
      toast.error("Too Many Requests", {
        description: `Please wait ${rateLimitCheck.resetIn} minutes before submitting again`
      });
      return;
    }

    if (!captchaValue) {
      toast.error("Verification Required", {
        description: "Please complete the captcha verification"
      });
      return;
    }

    if (!formRef.current) {
      toast.error("Form Error", {
        description: "Please try again"
      });
      return;
    }

    // Enhanced input validation and sanitization
    const formData = new FormData(formRef.current);
    const name = sanitizeInput(formData.get('user_name') as string || '');
    const email = sanitizeEmail(formData.get('user_email') as string || '');
    const message = formData.get('message') as string || '';

    // Validate message content
    const messageValidation = validateMessage(message);
    if (!messageValidation.isValid) {
      const error = createSecurityError('VALIDATION', messageValidation.error || 'Invalid input');
      logSecurityEvent(error);
      toast.error("Validation Error", {
        description: messageValidation.error
      });
      return;
    }

    // Validate name and email
    if (name.length < 2 || name.length > 50) {
      toast.error("Validation Error", {
        description: "Name must be between 2 and 50 characters"
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Validation Error", {
        description: "Please enter a valid email address"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create sanitized form data
      const sanitizedFormData = new FormData();
      sanitizedFormData.append('user_name', name);
      sanitizedFormData.append('user_email', email);
      sanitizedFormData.append('message', sanitizeInput(message));

      const response = await emailjs.sendForm(
        config.emailjs.serviceId,
        config.emailjs.templateId,
        formRef.current,
        config.emailjs.publicKey
      );

      if (response.status !== 200) {
        throw new Error("Failed to send message");
      }

      toast.success("Success!", {
        description: "Your message has been sent successfully."
      });

      if (formRef.current) {
        formRef.current.reset();
      }
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaValue(null);
    } catch (error) {
      const securityError = createSecurityError('NETWORK', 'Email sending failed');
      logSecurityEvent(securityError);
      
      toast.error("Error", {
        description: getSafeErrorMessage(error)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-pearl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
              Visit Us Today
            </h2>
            <p className="text-warmGray mb-8">
              We're conveniently located and ready to serve you. Walk-ins are welcome, 
              but appointments are recommended for minimal wait times.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary-dark mt-1" />
                <div>
                  <h3 className="font-semibold text-secondary">Our Locations Are</h3>
                  <p className="text-warmGray">Brandon Park Shopping Centre<br />Stud Park Shopping Centre<br />Pakenham Central Marketplace<br />Southland Shopping Centre<br />Warringal Shopping Centre</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary-dark mt-1" />
                <div>
                  <h3 className="font-semibold text-secondary">Phone</h3>
                  <p className="text-warmGray">+61415469594</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary-dark mt-1" />
                <div>
                  <h3 className="font-semibold text-secondary">Email</h3>
                  <p className="text-warmGray">browarcthreading@yahoo.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary-dark mt-1" />
                <div>
                  <h3 className="font-semibold text-secondary">Opening Hours</h3>
                  <p className="text-warmGray text-sm">
                    Hours may vary by location — please call to confirm.
                  </p>
                  <p className="text-warmGray mt-2">
                    Mon – Wed: 9:00 AM – 5:30 PM<br />
                    Thu – Fri: 9:00 AM – 7:00 PM<br />
                    Saturday: 9:00 AM – 5:00 PM<br />
                    Sunday: 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-secondary mb-6">Send Us a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-warmGray mb-2">Name</label>
                <input
                  name="user_name"
                  type="text"
                  required
                  maxLength={50}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-warmGray mb-2">Email</label>
                <input
                  name="user_email"
                  type="email"
                  required
                  maxLength={100}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label className="block text-warmGray mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  maxLength={1000}
                  minLength={10}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary h-32"
                  placeholder="Your message (minimum 10 characters)"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={config.recaptcha.siteKey}
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !captchaValue}
                className="w-full bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
