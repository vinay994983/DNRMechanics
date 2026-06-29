import { useState, useRef, useEffect } from "react";
import { Phone, ChevronDown, Menu, X, Wrench } from "lucide-react";
import { SERVICES_DATA, DISPLAY_MOBILE_NUMBER } from "../data";
import { ServiceID } from "../types";

interface NavbarProps {
  activePage: string;
  activeServiceId?: string;
  onNavigate: (page: string, serviceId?: ServiceID) => void;
}

export default function Navbar({ activePage, activeServiceId, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceClick = (id: ServiceID) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate("service-detail", id);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-natural-cream/70" id="main-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Corner Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => { onNavigate("home"); setIsMobileMenuOpen(false); }}
            id="nav-logo"
          >
            <div className="p-2 bg-natural-sage rounded-lg text-white group-hover:bg-natural-sage-hover transition-colors">
              <Wrench className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-serif font-extrabold text-xl tracking-tight text-natural-dark-sage block leading-tight">
                DNR <span className="text-natural-brown">Smart</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#6B756B] uppercase block">
                24/7 DOORSTEP SERVICE
              </span>
            </div>
          </div>

          {/* Centered Navigation Titles */}
          <div className="hidden md:flex items-center gap-8 justify-center flex-1">
            <button
              onClick={() => onNavigate("home")}
              className={`font-sans font-medium text-sm transition-colors relative py-2 ${
                activePage === "home" ? "text-natural-brown" : "text-natural-text/85 hover:text-natural-brown"
              }`}
              id="nav-btn-home"
            >
              Home
              {activePage === "home" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-natural-brown rounded-full" />
              )}
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef} id="nav-dropdown-wrapper">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`font-sans font-medium text-sm transition-colors flex items-center gap-1.5 py-2 ${
                  activePage === "service-detail" || activePage === "services"
                    ? "text-natural-brown"
                    : "text-natural-text/85 hover:text-natural-brown"
                }`}
                id="nav-btn-services"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                {(activePage === "service-detail" || activePage === "services") && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-natural-brown rounded-full" />
                )}
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-natural-warm-white rounded-xl shadow-xl border border-natural-cream py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                  id="nav-dropdown-menu"
                >
                  <div className="px-4 py-2 border-b border-natural-cream/50">
                    <p className="text-[10px] font-semibold text-natural-dark-sage/70 uppercase tracking-wider font-serif">Washing Machine Services</p>
                  </div>
                  {SERVICES_DATA.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex flex-col hover:bg-natural-sand-light ${
                        activePage === "service-detail" && activeServiceId === service.id
                          ? "bg-natural-sand text-natural-dark-sage font-medium"
                          : "text-natural-text hover:text-natural-brown"
                      }`}
                      id={`nav-opt-${service.id}`}
                    >
                      <span className="font-semibold">{service.title}</span>
                      <span className="text-[11px] text-[#6B756B] font-normal line-clamp-1">{service.shortDesc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate("about")}
              className={`font-sans font-medium text-sm transition-colors relative py-2 ${
                activePage === "about" ? "text-natural-brown" : "text-natural-text/85 hover:text-natural-brown"
              }`}
              id="nav-btn-about"
            >
              About
              {activePage === "about" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-natural-brown rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate("reviews")}
              className={`font-sans font-medium text-sm transition-colors relative py-2 ${
                activePage === "reviews" ? "text-natural-brown" : "text-natural-text/85 hover:text-natural-brown"
              }`}
              id="nav-btn-reviews"
            >
              Feedbacks
              {activePage === "reviews" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-natural-brown rounded-full" />
              )}
            </button>
          </div>

          {/* Right Corner Mobile Number with Call Now title */}
          <div className="hidden md:flex items-center gap-3" id="nav-call-now-desktop">
            <a
              href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
              className="flex items-center gap-2.5 px-4.5 py-2.5 bg-natural-sage text-white rounded-full font-serif font-semibold text-sm hover:bg-natural-sage-hover hover:scale-102 hover:shadow-md transition-all duration-200 cursor-pointer"
              id="nav-btn-call"
            >
              <Phone className="w-4 h-4 fill-white animate-bounce" />
              <div className="text-left leading-tight">
                <span className="text-[10px] block font-medium opacity-90 uppercase tracking-widest">Call Now 24/7</span>
                <span className="text-sm font-bold">{DISPLAY_MOBILE_NUMBER}</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-natural-dark-sage hover:text-natural-brown p-2 focus:outline-none"
              id="nav-mobile-hamburger"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-natural-warm-white border-t border-natural-cream/50 py-4 px-4 shadow-inner" id="nav-mobile-panel">
          <div className="space-y-2 flex flex-col">
            <button
              onClick={() => { onNavigate("home"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg font-sans text-sm font-semibold transition-colors ${
                activePage === "home" ? "bg-natural-sand text-natural-dark-sage" : "text-natural-text hover:bg-natural-sand-light"
              }`}
              id="mobile-nav-home"
            >
              Home
            </button>

            {/* Services Toggle for Mobile */}
            <div className="w-full">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg font-sans text-sm font-semibold transition-colors ${
                  activePage === "service-detail" || activePage === "services"
                    ? "bg-natural-sand text-natural-dark-sage"
                    : "text-natural-text hover:bg-natural-sand-light"
                }`}
                id="mobile-nav-services-toggle"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              {isMobileServicesOpen && (
                <div className="mt-1 ml-4 border-l-2 border-natural-cream pl-3 space-y-1 py-1" id="mobile-services-dropdown-list">
                  {SERVICES_DATA.map((service) => (
                    <button
                       key={service.id}
                       onClick={() => handleServiceClick(service.id)}
                       className={`w-full text-left py-2 px-2 rounded text-xs transition-colors block ${
                         activePage === "service-detail" && activeServiceId === service.id
                           ? "bg-natural-sand/80 text-natural-dark-sage font-semibold"
                           : "text-natural-text hover:text-natural-brown hover:bg-natural-sand-light"
                       }`}
                       id={`mobile-nav-service-${service.id}`}
                    >
                      • {service.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => { onNavigate("about"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg font-sans text-sm font-semibold transition-colors ${
                activePage === "about" ? "bg-natural-sand text-natural-dark-sage" : "text-natural-text hover:bg-natural-sand-light"
              }`}
              id="mobile-nav-about"
            >
              About
            </button>

            <button
              onClick={() => { onNavigate("reviews"); setIsMobileMenuOpen(false); }}
              className={`w-full text-left py-2 px-3 rounded-lg font-sans text-sm font-semibold transition-colors ${
                activePage === "reviews" ? "bg-natural-sand text-natural-dark-sage" : "text-natural-text hover:bg-natural-sand-light"
              }`}
              id="mobile-nav-reviews"
            >
              Feedbacks
            </button>

            {/* Mobile Call CTA */}
            <div className="pt-4 border-t border-natural-cream/50" id="mobile-nav-call-block">
              <a
                href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-3 py-3 bg-natural-sage hover:bg-natural-sage-hover text-white rounded-xl font-sans font-bold text-sm tracking-wide transition-colors"
                id="mobile-nav-call-btn"
              >
                <Phone className="w-4 h-4 fill-white animate-bounce" />
                <span>Call Now: {DISPLAY_MOBILE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
