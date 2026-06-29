import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ServicesDetail from "./components/ServicesDetail";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { ServiceID } from "./types";
import { Phone, MessageSquare, Wrench } from "lucide-react";
import { DISPLAY_MOBILE_NUMBER, ALTERNATE_MOBILE_NUMBER } from "./data";

export default function App() {
  const [activePage, setActivePage] = useState<string>("home");
  const [activeServiceId, setActiveServiceId] = useState<ServiceID>("top-loading");

  // Synchronize with URL hash to support deep linking across the "6 static pages"
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#home") {
        setActivePage("home");
      } else if (hash === "#about") {
        setActivePage("about");
      } else if (hash === "#contact") {
        setActivePage("contact");
      } else if (hash === "#reviews") {
        setActivePage("reviews");
      } else if (hash.startsWith("#services/")) {
        const id = hash.replace("#services/", "") as ServiceID;
        setActivePage("service-detail");
        setActiveServiceId(id);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Call once initially
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page: string, serviceId?: ServiceID) => {
    setActivePage(page);
    if (serviceId) {
      setActiveServiceId(serviceId);
      window.location.hash = `#services/${serviceId}`;
    } else {
      window.location.hash = `#${page}`;
    }
    // Smooth scroll to top when changing views
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "service-detail":
        return <ServicesDetail serviceId={activeServiceId} onNavigate={handleNavigate} />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <ContactUs />;
      case "reviews":
        return <Reviews />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-natural-bg selection:bg-natural-sage selection:text-white" id="app-root-wrapper">
      
      {/* 24/7 Top Sticky Notification Strip */}
      <div className="bg-natural-dark-sage text-natural-bg py-2 px-4 text-center text-[11px] sm:text-xs font-medium border-b border-natural-cream flex items-center justify-center gap-2" id="top-notification-strip">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-natural-sage opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-natural-sage"></span>
        </span>
        <span className="font-sans">
          <span className="hidden sm:inline">
            <b>DNR Doorstep Washers Hub:</b> Providing emergency 24/7 repair covers &amp; spares in Hyderabad.
          </span>
          <span className="inline sm:hidden">
            Providing emergency 24/7 repairs in Hyderabad.
          </span>
        </span>
        <a 
          href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
          className="ml-2 px-2.5 py-0.5 bg-natural-brown hover:bg-[#8f6749] text-white rounded text-[10px] font-bold uppercase transition-colors font-sans"
        >
          Call Emergency
        </a>
      </div>

      {/* Main Navigation bar */}
      <Navbar 
        activePage={activePage} 
        activeServiceId={activeServiceId} 
        onNavigate={handleNavigate} 
      />

      {/* Dynamic Sub-Page Content Area with Staggered Fade Transition */}
      <main className="flex-grow animate-fade-in" id="main-content-flow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage + (activePage === "service-detail" ? `-${activeServiceId}` : "")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            id="page-motion-container"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Floating Utility Hub (Bottom Right corner) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3" id="persistent-float-hub">
        <a
          href={`https://wa.me/${ALTERNATE_MOBILE_NUMBER.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 bg-natural-dark-sage hover:bg-[#3b4d3d] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/10"
          title="WhatsApp Quick Consultation"
          id="float-whatsapp"
        >
          <MessageSquare className="w-5 h-5 fill-white" />
        </a>
        
        <a
          href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
          className="p-3.5 bg-natural-sage hover:bg-natural-sage-hover text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border border-white/10"
          title="24/7 Urgent Repair Call"
          id="float-call"
        >
          <Phone className="w-5 h-5 fill-white animate-pulse" />
        </a>
      </div>

      {/* Footer component */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

