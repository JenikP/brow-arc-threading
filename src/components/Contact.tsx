import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
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
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      const error = createSecurityError('RATE_LIMIT', 'Rate limit exceeded');
      logSecurityEvent(error);
      toast.error("Too Many Requests", { description: `Please wait ${rateLimitCheck.resetIn} minutes before submitting again` });
      return;
    }
    if (!captchaValue) {
      toast.error("Verification Required", { description: "Please complete the captcha verification" });
      return;
    }
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const name = sanitizeInput(formData.get('user_name') as string || '');
    const email = sanitizeEmail(formData.get('user_email') as string || '');
    const message = formData.get('message') as string || '';
    const messageValidation = validateMessage(message);
    if (!messageValidation.isValid) {
      toast.error("Validation Error", { description: messageValidation.error });
      return;
    }
    if (name.length < 2 || name.length > 50) {
      toast.error("Validation Error", { description: "Name must be between 2 and 50 characters" });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Validation Error", { description: "Please enter a valid email address" });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await emailjs.sendForm(
        config.emailjs.serviceId,
        config.emailjs.templateId,
        formRef.current,
        config.emailjs.publicKey
      );
      if (response.status !== 200) throw new Error("Failed to send message");
      toast.success("Success!", { description: "Your message has been sent successfully." });
      formRef.current?.reset();
      recaptchaRef.current?.reset();
      setCaptchaValue(null);
    } catch (error) {
      const securityError = createSecurityError('NETWORK', 'Email sending failed');
      logSecurityEvent(securityError);
      toast.error("Error", { description: getSafeErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Info column */}
          <div className="lg:col-span-2">
            <p className="kicker text-bronze mb-4">Get in touch</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary mb-5">
              Visit Us Today
            </h2>
            <p className="text-warmGray leading-relaxed mb-8">
              Walk-ins are welcome at all 5 Melbourne salons. The fastest way to book is to give us a call.
            </p>

            <div className="space-y-5">
              <a href="tel:+61415469594" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sand flex items-center justify-center flex-shrink-0 group-hover:bg-bronze group-hover:text-pearl transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="kicker text-bronze mb-1">Call to book</p>
                  <p className="text-secondary font-medium text-lg">+61 415 469 594</p>
                </div>
              </a>

              <a href="mailto:browarcthreading@yahoo.com" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sand flex items-center justify-center flex-shrink-0 group-hover:bg-bronze group-hover:text-pearl transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="kicker text-bronze mb-1">Email</p>
                  <p className="text-secondary font-medium break-all">browarcthreading@yahoo.com</p>
                </div>
              </a>

              <Link to="/locations" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-full bg-sand flex items-center justify-center flex-shrink-0 group-hover:bg-bronze group-hover:text-pearl transition-colors">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="kicker text-bronze mb-1">5 Melbourne locations</p>
                  <p className="text-secondary font-medium inline-flex items-center gap-1.5 group-hover:text-bronze transition-colors">
                    View all locations &amp; hours <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </p>
                </div>
              </Link>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-sand flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="kicker text-bronze mb-1">Typical hours</p>
                  <div className="text-secondary text-sm space-y-0.5">
                    <p>Mon – Wed: 9:00 AM – 5:30 PM</p>
                    <p>Thu – Fri: 9:00 AM – 7:00 PM</p>
                    <p>Saturday: 9:00 AM – 5:00 PM</p>
                    <p>Sunday: 10:00 AM – 5:00 PM</p>
                  </div>
                  <p className="text-warmGray text-xs mt-2">Hours may vary by location — please call to confirm.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3 bg-pearl p-7 sm:p-10 rounded-3xl shadow-soft border border-sand">
            <h3 className="font-serif text-2xl sm:text-3xl text-secondary mb-2">Have a question?</h3>
            <p className="text-warmGray text-sm mb-6">For bookings, please call us — we don't take appointments by email.</p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-secondary text-sm font-medium mb-1.5">Name</label>
                <input
                  name="user_name"
                  type="text"
                  required
                  maxLength={50}
                  className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/10 transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-secondary text-sm font-medium mb-1.5">Email</label>
                <input
                  name="user_email"
                  type="email"
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/10 transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-secondary text-sm font-medium mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  maxLength={1000}
                  minLength={10}
                  className="w-full px-4 py-3 bg-white border border-sand rounded-xl focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/10 h-32 transition"
                  placeholder="Your message (minimum 10 characters)"
                />
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
                className="w-full bg-secondary hover:bg-bronze text-pearl px-6 py-4 rounded-full font-semibold tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
