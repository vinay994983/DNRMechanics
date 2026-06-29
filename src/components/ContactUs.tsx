import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  Navigation,
  Sparkles
} from "lucide-react";
import { DISPLAY_MOBILE_NUMBER, ALTERNATE_MOBILE_NUMBER, HYDERABAD_AREAS } from "../data";

export default function ContactUs() {
  // Spinning Background State
  const [isSpinning, setIsSpinning] = useState(true);
  const [spinSecondsLeft, setSpinSecondsLeft] = useState(5);

  // 5 Second spin cycle count down
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (spinSecondsLeft > 0) {
      timer = setInterval(() => {
        setSpinSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsSpinning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [spinSecondsLeft]);

  const handleRestartSpin = () => {
    setIsSpinning(true);
    setSpinSecondsLeft(5);
  };

  return (
    <div className="relative min-h-screen py-16 bg-[#FAF9F6] overflow-hidden font-sans" id="contact-page-container">
      
      {/* THEMATIC 5-SECOND BACKGROUND SPINNING DRUM ANIMATION */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" id="spinning-background-container">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-[0.03] sm:opacity-[0.04]">
          {/* Outer spin rings */}
          <motion.div 
            className="w-full h-full rounded-full border-8 border-dashed border-natural-dark-sage"
            animate={{ 
              rotate: isSpinning ? 1800 : 360 
            }}
            transition={{ 
              duration: isSpinning ? 5 : 45, 
              ease: isSpinning ? "easeInOut" : "linear",
              repeat: isSpinning ? 0 : Infinity
            }}
          />
          
          {/* Inner spin chamber representing suds and water */}
          <motion.div 
            className="absolute inset-16 rounded-full border-4 border-natural-sage/30 flex items-center justify-center bg-natural-sage/5"
            animate={{ 
              scale: isSpinning ? [1, 1.05, 0.98, 1] : 1,
              rotate: isSpinning ? -1800 : -360
            }}
            transition={{ 
              duration: isSpinning ? 5 : 60, 
              ease: "linear",
              repeat: isSpinning ? 0 : Infinity
            }}
          >
            {/* Swishing laundry particles */}
            <span className="absolute top-12 left-24 w-8 h-8 rounded-full bg-natural-sage/20 animate-ping" />
            <span className="absolute bottom-20 right-32 w-12 h-12 rounded-full bg-natural-brown/10 animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="contact-header">
          <span className="inline-flex items-center gap-1 bg-natural-sand text-natural-dark-sage text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2 border border-natural-cream/30">
            <Sparkles className="w-3.5 h-3.5 text-natural-brown" /> Direct Doorstep Booking
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-dark-sage tracking-tight">
            24/7 Washing Machine Repair Hub
          </h1>
          <p className="text-[#6B756B] mt-4 text-base sm:text-lg font-sans max-w-xl mx-auto leading-relaxed">
            Contact DNR Smart Service now. Our mobile engineers are fully loaded with authentic spare parts, ready to fix your washing machine today.
          </p>

          {/* Mini notifier for the background spinning animation */}
          <div className="mt-4 flex justify-center items-center gap-2" id="animation-trigger-panel">
            <span className="text-xs font-mono text-[#6B756B]/70">
              {isSpinning ? (
                <span className="flex items-center gap-1.5 text-natural-brown font-semibold">
                  🌀 Background Spin Cycle active ({spinSecondsLeft}s left)
                </span>
              ) : (
                <span>Spin cycle complete.</span>
              )}
            </span>
            {!isSpinning && (
              <button 
                onClick={handleRestartSpin}
                className="text-[10px] bg-natural-warm-white border border-natural-cream px-2.5 py-1 rounded hover:bg-natural-sand transition-colors font-bold text-[#6B756B]"
              >
                🔄 Spin 5s Again
              </button>
            )}
          </div>
        </div>

        {/* 2 Column Sections (Mobile & Location) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" id="contact-info-grid">
          
          {/* SECTION 1: MOBILE HELPLINE INFORMATION */}
          <div className="bg-natural-warm-white rounded-2xl border border-natural-cream p-6 sm:p-8 shadow-sm flex flex-col justify-between" id="section-mobile">
            <div>
              <div className="flex items-center gap-3.5 pb-4 border-b border-natural-cream/60 mb-6">
                <div className="p-3 bg-natural-sand text-natural-brown rounded-xl border border-natural-cream/40">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-natural-dark-sage">1. Instant Phone Helpline</h3>
                  <p className="text-xs text-[#6B756B] font-mono">CALL 24/7 FOR HOME INQUIRIES</p>
                </div>
              </div>

              <p className="text-natural-text/90 text-sm leading-relaxed mb-6 font-sans">
                Our support desk is open 24 hours a day, 7 days a week, including Sunday holidays. You can place calls directly to book appointments or ask for immediate technical consultations regarding fault codes and replacement quotes.
              </p>

              {/* Mobile dial boxes */}
              <div className="space-y-4">
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-natural-cream flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#6B756B] block uppercase">PRIMARY DIRECT HELPLINE</span>
                    <span className="text-lg font-serif font-bold text-natural-dark-sage block mt-0.5">{DISPLAY_MOBILE_NUMBER}</span>
                  </div>
                  <a
                    href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                    className="w-full sm:w-auto px-5 py-2.5 bg-natural-brown hover:bg-[#8f6749] text-white rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm"
                    id="contact-call-btn-1"
                  >
                    <Phone className="w-4 h-4 fill-white" /> Dial Helpline
                  </a>
                </div>

                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-natural-cream flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#6B756B] block uppercase">EMERGENCY WHATSAPP HELPLINE</span>
                    <span className="text-lg font-serif font-bold text-natural-dark-sage block mt-0.5">{ALTERNATE_MOBILE_NUMBER}</span>
                  </div>
                  <a
                    href={`https://wa.me/${ALTERNATE_MOBILE_NUMBER.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#4B6B4D] hover:bg-natural-dark-sage text-white rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2 shadow-sm"
                    id="contact-whatsapp-btn"
                  >
                    <MessageSquare className="w-4 h-4" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-natural-cream/60 text-xs text-[#6B756B] flex items-center gap-2">
              <Clock className="w-4 h-4 text-natural-sage flex-shrink-0" />
              <span>Response Time: Typically under 15 minutes for phone calls.</span>
            </div>
          </div>

          {/* SECTION 2: PHYSICAL LOCATION DETAILS */}
          <div className="bg-natural-warm-white rounded-2xl border border-natural-cream p-6 sm:p-8 shadow-sm flex flex-col justify-between" id="section-location">
            <div>
              <div className="flex items-center gap-3.5 pb-4 border-b border-natural-cream/60 mb-6">
                <div className="p-3 bg-natural-light-green text-natural-sage rounded-xl border border-natural-sage/15">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-natural-dark-sage">2. Active Service Locations</h3>
                  <p className="text-xs text-[#6B756B] font-mono">HYDERABAD WIDE COVERAGE HUB</p>
                </div>
              </div>

              <p className="text-natural-text/90 text-sm leading-relaxed mb-6 font-sans">
                Our central workshop is located at <strong className="text-natural-brown font-semibold">8-7-33/51&amp;52, Gori Nagar, Bhavani Nagar, Old Bowenpally, Secunderabad, Telangana 500011</strong>, with mobile technician vans strategically parked in major suburban sectors to reach your doorstep within 45 minutes of booking.
              </p>

              {/* Geographic Hub Areas Representation */}
              <div>
                <span className="text-[10px] font-bold font-mono text-[#6B756B] uppercase tracking-widest block mb-3">Suburbs We Serve (Doorstep Fixes)</span>
                <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-2 border border-natural-cream p-3 rounded-xl bg-[#FAF9F6]">
                  {HYDERABAD_AREAS.map((area) => (
                    <span 
                      key={area} 
                      className="text-xs px-2.5 py-1 bg-natural-warm-white border border-natural-cream text-natural-dark-sage rounded-lg font-medium flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3 text-natural-sage flex-shrink-0" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-natural-cream/60 text-xs text-[#6B756B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-natural-sage flex-shrink-0" />
              <span>Full compliance with safety and sanitization protocols.</span>
            </div>
          </div>

        </div>

        {/* HYDERABAD GOOGLE MAPS EMBED */}
        <div className="bg-natural-warm-white rounded-2xl border border-natural-cream p-4 shadow-sm" id="google-maps-container">
          <div className="px-4 py-3 border-b border-natural-cream/60 flex items-center justify-between flex-wrap gap-3 mb-4">
            <div>
              <h3 className="font-serif font-bold text-base text-natural-dark-sage flex items-center gap-2">
                <MapPin className="w-5 h-5 text-natural-brown" />
                <span>Hyderabad Service Hub Coverage Map</span>
              </h3>
              <p className="text-xs text-[#6B756B] mt-0.5">24/7 Doorstep Repair network across twin cities</p>
            </div>
            
            <a 
              href={`https://maps.google.com/?q=Hyderabad`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-natural-brown hover:text-natural-dark-sage flex items-center gap-1 bg-natural-sand/60 px-3 py-1.5 rounded-lg border border-natural-cream/30"
            >
              <span>Open in Google Maps App</span>
              <Navigation className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-[350px] sm:h-[450px] rounded-xl overflow-hidden border border-natural-cream/60" id="maps-iframe-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!1m3!1s0x3bcb99daeaebd2c7:0xae93b78022c02cf2!2sHyderabad%2C+Telangana!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="DNR Smart Service Hyderabad GMap Network"
              id="hyderabad-gmaps-iframe"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
