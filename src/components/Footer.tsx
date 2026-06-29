import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Wrench, 
  Facebook, 
  Instagram, 
  Star,
  CheckCircle
} from "lucide-react";
import { DISPLAY_MOBILE_NUMBER, ALTERNATE_MOBILE_NUMBER, HYDERABAD_AREAS, BRANDS_SERVED } from "../data";
import { ServiceID } from "../types";

interface FooterProps {
  onNavigate: (page: string, serviceId?: ServiceID) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-natural-dark-sage text-natural-bg border-t border-natural-cream/20 font-sans" id="main-footer">
      
      {/* Top section: Local Search Optimization & Reviews banner */}
      <div className="border-b border-natural-cream/15 bg-natural-dark-sage/95 py-8" id="footer-top-trust-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3.5">
            <div className="flex text-natural-brown">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">4.9 / 5.0 Star Rating in Hyderabad</p>
              <p className="text-xs text-natural-bg/75">Based on 2,850+ verified customer doorstep feedback</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center text-xs text-natural-bg/85">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-natural-sage" /> LG Service Certified</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-natural-sage" /> Samsung Certified</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-natural-sage" /> IFB &amp; Bosch Expert</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="footer-links-grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4" id="footer-col-profile">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-natural-brown rounded text-white">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-lg text-white">
                DNR <span className="text-natural-brown">Smart</span>
              </span>
            </div>
            <p className="text-xs text-natural-bg/75 leading-relaxed">
              Provides expert 24/7 doorstep repair and maintenance for all kinds of automatic, front-load, and top-load washing machines. We sell high-quality machine covers and spare parts across Hyderabad.
            </p>
            
            {/* Social media contact links */}
            <div className="flex items-center gap-3 pt-2" id="footer-social-icons">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-[#2D332D]/40 rounded-lg text-natural-bg hover:text-natural-brown hover:bg-[#2D332D]/75 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-[#2D332D]/40 rounded-lg text-natural-bg hover:text-natural-brown hover:bg-[#2D332D]/75 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={`https://wa.me/${ALTERNATE_MOBILE_NUMBER.replace(/[^0-9]/g, "")}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-[#2D332D]/40 rounded-lg text-natural-bg hover:text-natural-brown hover:bg-[#2D332D]/75 transition-all"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-4" id="footer-col-nav">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-natural-bg/80 flex flex-col">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-white transition-colors cursor-pointer">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-white transition-colors cursor-pointer">
                  About DNR Smart Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("reviews")} className="hover:text-white transition-colors cursor-pointer">
                  Feedbacks &amp; Reviews
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors cursor-pointer">
                  Contact Hub / Hyderabad Maps
                </button>
              </li>
              <li>
                <a 
                  href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-natural-sage" /> Urgent Call Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand Support catalog */}
          <div className="space-y-4" id="footer-col-brands">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Washing Machine Brands</h4>
            <div className="flex flex-wrap gap-1.5">
              {BRANDS_SERVED.map((brand) => (
                <span 
                  key={brand} 
                  className="text-[10px] bg-[#2D332D]/50 border border-natural-cream/15 text-natural-bg/90 px-2.5 py-1 rounded hover:text-white transition-colors"
                >
                  {brand} Repair
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Hub info */}
          <div className="space-y-4" id="footer-col-contacts">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Hyderabad Hub</h4>
            <div className="space-y-3 text-xs text-natural-bg/85">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-natural-brown flex-shrink-0 mt-0.5" />
                <span>8-7-33/51&amp;52, Gori Nagar, Bhavani Nagar, Old Bowenpally, Secunderabad, Telangana 500011</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-natural-brown flex-shrink-0" />
                <a href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                  {DISPLAY_MOBILE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-natural-sage flex-shrink-0" />
                <a href={`https://wa.me/${ALTERNATE_MOBILE_NUMBER.replace(/[^0-9]/g, "")}`} className="hover:text-white transition-colors">
                  {ALTERNATE_MOBILE_NUMBER} (WhatsApp)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Served Suburbs Listing inside footer for high SEO power */}
        <div className="mt-12 pt-8 border-t border-natural-cream/20 text-center" id="footer-seo-areas">
          <p className="text-[11px] font-bold text-[#E5E2D9] uppercase tracking-widest mb-3">
            📍 Doorstep Services Covered Suburbs in Hyderabad
          </p>
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[11px] text-natural-bg/70">
            {HYDERABAD_AREAS.map((area, idx) => (
              <span key={area} className="hover:text-white transition-colors cursor-pointer">
                Washing Machine Repair in {area} {idx < HYDERABAD_AREAS.length - 1 && "•"}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="mt-12 pt-8 border-t border-natural-cream/20 text-center text-xs text-natural-bg/50 flex flex-col sm:flex-row justify-between items-center gap-4" id="footer-bottom">
          <p>© {currentYear} DNR Smart Service. All Rights Reserved.</p>
          <p className="text-[11px] text-[#FAF9F6]/80 font-medium">
            Design and Developed By <span className="text-white font-semibold tracking-wide">Porendla Vinay Kumar</span>
          </p>
          <p className="text-[10px] text-natural-bg/40 max-w-sm sm:text-right">
            Disclaimer: We are an independent multi-brand doorstep washing machine repair agency. Brand names are used for representative purposes only.
          </p>
        </div>

      </div>
    </footer>
  );
}
