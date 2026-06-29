import { 
  Phone, 
  Clock, 
  BadgeCheck, 
  Wrench, 
  AlertTriangle, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { SERVICES_DATA, DISPLAY_MOBILE_NUMBER, ALTERNATE_MOBILE_NUMBER } from "../data";
import { ServiceID } from "../types";

interface ServicesDetailProps {
  serviceId: ServiceID;
  onNavigate: (page: string, serviceId?: ServiceID) => void;
}

export default function ServicesDetail({ serviceId, onNavigate }: ServicesDetailProps) {
  const currentService = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 font-sans" id="service-detail-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button and Path Hierarchy */}
        <div className="flex items-center justify-between mb-8" id="service-header-nav">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#6B756B] hover:text-natural-brown transition-colors uppercase tracking-wider"
            id="back-to-home-btn"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          
          <div className="text-xs font-mono text-[#6B756B]/70">
            Services / <span className="text-natural-dark-sage font-semibold">{currentService.title}</span>
          </div>
        </div>

        {/* Outer Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="service-outer-grid">
          
          {/* SIDEBAR: NAVIGATE BETWEEN THE 6 STATIC SERVICE PAGES */}
          <div className="lg:col-span-4 space-y-6" id="service-sidebar">
            <div className="bg-natural-warm-white rounded-2xl border border-natural-cream p-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-natural-dark-sage mb-4 pb-2 border-b border-natural-cream/60">
                Washing Machine Services
              </h3>
              <nav className="space-y-1.5 flex flex-col" id="sidebar-static-pages">
                {SERVICES_DATA.map((service) => {
                  const isSelected = service.id === serviceId;
                  return (
                    <button
                      key={service.id}
                      onClick={() => onNavigate("service-detail", service.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                        isSelected 
                          ? "bg-natural-brown text-white font-semibold shadow-md" 
                          : "text-[#6B756B] hover:bg-natural-sand/50 hover:text-natural-dark-sage border border-transparent hover:border-natural-cream/40"
                      }`}
                      id={`sidebar-link-${service.id}`}
                    >
                      <span>{service.title}</span>
                      <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-natural-sage"}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Helpline Card */}
            <div className="bg-natural-dark-sage text-natural-bg rounded-2xl p-6 shadow-md relative overflow-hidden" id="sidebar-call-card">
              <div className="absolute -right-6 -bottom-6 opacity-[0.07]">
                <Phone className="w-36 h-36 text-white" />
              </div>
              <span className="text-[10px] font-bold font-mono tracking-widest uppercase block text-[#FAF9F6]/80">
                NEED IMMEDIATE REPAIR?
              </span>
              <h4 className="font-serif font-bold text-xl mt-1 text-white">24/7 Doorstep Helpline</h4>
              <p className="text-xs text-[#FAF9F6]/90 mt-2 leading-relaxed">
                Contact our customer support directly. We deploy our closest technician in Hyderabad instantly!
              </p>
              
              <div className="mt-6 space-y-3">
                <a 
                  href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                  className="w-full flex items-center justify-center gap-2.5 py-3 bg-natural-brown text-white rounded-xl font-bold text-sm hover:bg-[#8f6749] transition-colors shadow-sm"
                  id="sidebar-call-primary"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Call {DISPLAY_MOBILE_NUMBER}</span>
                </a>
                
                {ALTERNATE_MOBILE_NUMBER && (
                  <a 
                    href={`tel:${ALTERNATE_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-xs hover:bg-white/15 transition-colors"
                    id="sidebar-call-alternate"
                  >
                    <span>Alternate: {ALTERNATE_MOBILE_NUMBER}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* MAIN PAGE CONTENT FOR THE SELECTED SERVICE */}
          <div className="lg:col-span-8 space-y-8" id="service-main-content">
            <div className="bg-natural-warm-white rounded-2xl border border-natural-cream overflow-hidden shadow-sm p-6 sm:p-8" id="service-detail-card">
              
              {/* Feature Image */}
              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-8 bg-natural-sand flex items-center justify-center" id="service-main-image-container">
                <img 
                  src={currentService.imageUrl} 
                  alt={currentService.title} 
                  className="w-full h-full object-contain p-6 sm:p-8 hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-natural-dark-sage/90 backdrop-blur-md border border-natural-cream/20 px-3.5 py-1.5 rounded-lg text-white text-xs font-mono">
                  DNR Smart Service Assurance
                </div>
              </div>

              {/* Title and Short Intro */}
              <h1 className="font-serif text-3xl font-bold text-natural-dark-sage tracking-tight" id="service-title-display">
                {currentService.title}
              </h1>
              <p className="font-sans text-sm text-natural-text/90 mt-4 leading-relaxed" id="service-desc-display">
                {currentService.fullDesc}
              </p>

              {/* Diagnostic Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8" id="service-meta-grid">
                <div className="p-4 bg-natural-sand/40 border border-natural-cream/50 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-[#FAF9F6] text-natural-brown rounded-lg border border-natural-cream/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6B756B] block uppercase tracking-wider">REPAIR TIMEFRAME</span>
                    <span className="text-sm font-bold text-natural-dark-sage">{currentService.repairTime}</span>
                  </div>
                </div>

                <div className="p-4 bg-natural-sand/40 border border-natural-cream/50 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-[#FAF9F6] text-natural-sage rounded-lg border border-natural-cream/30">
                    <BadgeCheck className="w-5 h-5 text-natural-sage" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6B756B] block uppercase tracking-wider">SERVICE GUARANTEE</span>
                    <span className="text-sm font-bold text-natural-dark-sage">{currentService.priceEstimate}</span>
                  </div>
                </div>
              </div>

              {/* 2 Column breakdown: Common Symptoms vs. Professional Solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 pt-8 border-t border-natural-cream/60" id="service-breakdown-grid">
                
                {/* COLUMN A: Common Symptoms */}
                <div>
                  <h3 className="font-serif font-bold text-base text-natural-dark-sage flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-natural-brown" />
                    <span>Common Warning Signs</span>
                  </h3>
                  <ul className="space-y-3" id="symptoms-list">
                    {currentService.commonIssues.map((issue, idx) => (
                      <li key={idx} className="flex gap-2 text-natural-text/95 text-xs sm:text-sm leading-relaxed items-start">
                        <span className="text-natural-brown font-bold select-none">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* COLUMN B: Our Solutions */}
                <div>
                  <h3 className="font-serif font-bold text-base text-natural-dark-sage flex items-center gap-2 mb-4">
                    <Wrench className="w-5 h-5 text-natural-sage" />
                    <span>Professional Solutions</span>
                  </h3>
                  <ul className="space-y-3" id="solutions-list">
                    {currentService.solutions.map((sol, idx) => (
                      <li key={idx} className="flex gap-2 text-natural-text/95 text-xs sm:text-sm leading-relaxed items-start">
                        <span className="text-natural-sage font-bold select-none">✓</span>
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Service checklist trust seals */}
              <div className="mt-10 p-5 bg-natural-light-green/90 border border-natural-sage/20 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4" id="service-seals-grid">
                <div className="flex items-center gap-2 text-natural-dark-sage">
                  <BadgeCheck className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-xs font-semibold">90 Days Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-natural-dark-sage">
                  <BadgeCheck className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-xs font-semibold">Original OEM Spare Parts</span>
                </div>
                <div className="flex items-center gap-2 text-natural-dark-sage">
                  <BadgeCheck className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-xs font-semibold">Zero Diagnostics Fee</span>
                </div>
              </div>

            </div>

            {/* HIGH-VISIBILITY BOOKING CTA DISPLAYED BELOW EACH SERVICE PAGE */}
            <div className="bg-natural-dark-sage text-natural-bg rounded-2xl p-6 sm:p-8 shadow-md border border-natural-cream/20 flex flex-col sm:flex-row justify-between items-center gap-6" id="service-bottom-cta">
              <div className="text-center sm:text-left space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#FAF9F6]">Ready to Fix Your Washing Machine?</h3>
                <p className="text-xs text-[#FAF9F6]/80">Get an expert certified mechanic at your Hyderabad doorstep in under 45 minutes.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" id="service-bottom-actions">
                <a
                  href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-natural-brown text-white rounded-xl font-bold text-sm hover:bg-[#8f6749] transition-colors w-full sm:w-auto cursor-pointer shadow-sm"
                  id="bottom-call-button"
                >
                  <Phone className="w-4.5 h-4.5 fill-white" />
                  <span>Call {DISPLAY_MOBILE_NUMBER}</span>
                </a>
                
                <button
                  onClick={() => onNavigate("contact")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-[#FAF9F6] border border-white/10 rounded-xl font-semibold text-sm transition-colors w-full sm:w-auto"
                  id="bottom-book-button"
                >
                  Contact Hub
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
