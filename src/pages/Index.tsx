
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import LoadingSpinner from "../components/ui/loading-spinner";

// Lazy load components that aren't immediately visible
const ServiceSlideshow = lazy(() => import("../components/ServiceSlideshow"));
const ThreadingInfo = lazy(() => import("../components/ThreadingInfo"));
const Services = lazy(() => import("../components/Services"));
const About = lazy(() => import("../components/About"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  // Loading fallback for lazy-loaded components
  const renderLoader = () => <div className="flex justify-center py-12"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <SEO
        title="Brow Arc Threading — Eyebrow Threading & Beauty Services"
        description="Brow Arc Threading offers expert eyebrow threading, tinting, lamination and lash extensions across 5 convenient Melbourne locations."
        canonical="/"
      />
      <Navbar />
      <Hero />
      <Suspense fallback={renderLoader()}>
        <ServiceSlideshow />
        <ThreadingInfo />
        <Services />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </Suspense>

    </div>
  );
};

export default Index;
