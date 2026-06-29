import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  RotateCcw, 
  Wrench, 
  Sparkles, 
  Tv, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Compass, 
  ThumbsUp, 
  ArrowRight,
  Package,
  Layers,
  Phone
} from "lucide-react";
import { WASHING_MACHINE_TYPES, DISPLAY_MOBILE_NUMBER, BRANDS_SERVED } from "../data";
import { ServiceID } from "../types";

interface HomeProps {
  onNavigate: (page: string, serviceId?: ServiceID) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Looping Repair Animation Step for the background "video"
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 4000); // 4-second intervals per repair phase
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-natural-bg min-h-screen" id="home-page-container">
      
      {/* SECTION 1: HERO & ANIMATED VIDEO PLAYER */}
      <section className="relative overflow-hidden bg-gradient-to-b from-natural-warm-white to-natural-bg pt-4 pb-12 sm:py-16 lg:py-24" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6 relative z-10" id="hero-text-block">
              <span className="mx-auto lg:mx-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-natural-sand text-natural-dark-sage tracking-wider uppercase border border-natural-cream/65">
                <Sparkles className="w-3.5 h-3.5" /> 24/7 Smart Doorstep Services
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-natural-dark-sage tracking-tight leading-tight">
                Hyderabad's <span className="text-natural-brown block sm:inline">No.1 Choice</span> For Washing Machine Repair
              </h1>
              <p className="font-sans text-sm sm:text-base font-semibold text-natural-brown/95 bg-natural-sand/50 px-4 py-2.5 rounded-xl border border-natural-brown/10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Same day doorstep service | Experienced Technicians | 100 % Customer Satisfaction
              </p>

              {/* Highlighted Mobile Number Banner */}
              <div className="bg-natural-sand border border-natural-brown/25 rounded-2xl p-4.5 my-5 max-w-md mx-auto lg:mx-0 shadow-sm flex items-center gap-4 text-left transition-transform hover:scale-[1.01]">
                <div className="p-3 bg-natural-brown text-white rounded-full flex-shrink-0 animate-bounce">
                  <Phone className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#6B756B] uppercase tracking-widest block">EMERGENCY DOORSTEP HELPLINE (24/7)</span>
                  <a 
                    href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`} 
                    className="text-2xl sm:text-3xl font-serif font-extrabold text-natural-brown hover:text-natural-dark-sage transition-colors block leading-none mt-1"
                  >
                    {DISPLAY_MOBILE_NUMBER}
                  </a>
                  <span className="text-[11px] text-natural-dark-sage/80 block mt-1">Click to Call • Under 45 Mins Arrival</span>
                </div>
              </div>
              
              {/* Trust highlights */}
              <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-2 text-natural-text justify-start">
                  <ShieldCheck className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-sm font-semibold">100% Genuine Spares</span>
                </div>
                <div className="flex items-center gap-2 text-natural-text justify-start">
                  <Clock className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-sm font-semibold">Under 45 Mins Arrival</span>
                </div>
                <div className="flex items-center gap-2 text-natural-text justify-start">
                  <MapPin className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-sm font-semibold">Hyderabad Coverage</span>
                </div>
                <div className="flex items-center gap-2 text-natural-text justify-start">
                  <ThumbsUp className="w-5 h-5 text-natural-sage flex-shrink-0" />
                  <span className="text-sm font-semibold">Certified Technicians</span>
                </div>
              </div>

              {/* Call-to-action blocks */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <a
                  href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-natural-sage text-white rounded-xl font-bold text-base shadow-lg shadow-natural-sage/20 hover:bg-natural-sage-hover hover:shadow-xl transition-all duration-200"
                  id="hero-call-cta"
                >
                  <Wrench className="w-5 h-5" />
                  <span>Schedule Doorstep Visit</span>
                </a>
                <button
                  onClick={() => onNavigate("contact")}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-natural-cream text-natural-text rounded-xl font-bold text-base hover:bg-natural-sand transition-colors"
                  id="hero-contact-cta"
                >
                  <span>Contact Our Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Ambient background video-style animation: No player framing, no timeline, no control overlays, no text */}
            <div className="absolute inset-x-0 top-[20%] sm:top-[25%] -translate-y-8 lg:translate-y-0 lg:relative lg:inset-auto lg:col-span-7 h-auto lg:h-full w-full flex items-center justify-center select-none pointer-events-none z-0 lg:z-10 opacity-15 sm:opacity-20 lg:opacity-100" id="hero-background-video-block">
              <div className="w-full h-full max-w-2xl min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden relative flex items-center justify-center">
                {/* Visual backdrop representing a workspace glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-natural-warm-white/10 to-natural-sand/15 lg:from-natural-sand/40 lg:to-natural-cream/30 opacity-60 lg:opacity-100 rounded-3xl" />
                
                {/* Spark particles for activity */}
                <div className="absolute inset-0 opacity-25 lg:opacity-35">
                  <div className="absolute top-10 left-20 w-3 h-3 bg-natural-brown/40 rounded-full animate-bounce" />
                  <div className="absolute bottom-20 right-10 w-2.5 h-2.5 bg-natural-sage/50 rounded-full animate-pulse" />
                  <div className="absolute top-1/3 right-1/4 w-4 h-4 border border-natural-brown/30 rounded-full animate-spin" />
                </div>

                {/* ANIMATED CANVAS */}
                <div className="relative w-full h-full flex items-center justify-center p-6 scale-95 sm:scale-105 lg:scale-110">
                  <div className="relative flex items-end justify-center gap-6 sm:gap-8" id="repair-scene-container">
                    
                    {/* Washing Machine Unit with Open panels / Repair View */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex flex-col justify-between bg-slate-100 rounded-3xl border-4 border-slate-300 p-4 shadow-xl flex-shrink-0">
                      
                      {/* Top control panel of washing machine */}
                      <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                        <div className="w-10 h-2 bg-slate-300 rounded" />
                        {/* Control LED Screen */}
                        <div className="flex gap-1 items-center">
                          <div className={`w-1.5 h-1.5 rounded-full ${animationStep === 2 ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
                          <div className="w-8 h-3.5 bg-slate-850 rounded flex items-center justify-center" />
                        </div>
                      </div>

                      {/* Central Area: Glass drum or open mechanical panel based on state */}
                      <div className="relative w-24 h-24 sm:w-30 sm:h-30 mx-auto rounded-full bg-slate-800 border-4 border-slate-300 flex items-center justify-center overflow-hidden shadow-inner">
                        
                        {/* Glass spin drum lines */}
                        <motion.div 
                          className="absolute inset-2 rounded-full border-2 border-dashed border-slate-500"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: animationStep === 2 ? 0.8 : 8, ease: "linear" }}
                        />

                        {/* Sparkles / Electric waves during electrical diagnosis (Step 0) */}
                        {animationStep === 0 && (
                          <motion.div 
                            className="absolute inset-4 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                          </motion.div>
                        )}

                        {/* Active mechanical spinning cogs during mechanical adjustment (Step 1) */}
                        {animationStep === 1 && (
                          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-900/45">
                            <motion.div 
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                              className="text-slate-400"
                            >
                              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                              </svg>
                            </motion.div>
                            <motion.div 
                              animate={{ rotate: -360 }}
                              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                              className="text-slate-500"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                              </svg>
                            </motion.div>
                          </div>
                        )}

                        {/* Splashing water waves / high-speed test run spin (Step 2) */}
                        {animationStep === 2 && (
                          <motion.div 
                            className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500/30 border-2 border-blue-400/50 flex items-center justify-center"
                            animate={{ scale: [1, 1.15, 0.9, 1], rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            {/* Inner water swirls */}
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-blue-200/40 border-t-blue-100 animate-spin" />
                          </motion.div>
                        )}
                      </div>

                      {/* Machine Feet Dampers */}
                      <div className="absolute -bottom-2 inset-x-6 flex justify-between">
                        <div className="w-4 h-2.5 bg-slate-400 rounded-b" />
                        <div className="w-4 h-2.5 bg-slate-400 rounded-b" />
                      </div>
                    </div>

                    {/* Animated Human Technician Character Standing Beside the Machine */}
                    <div className="relative w-20 h-36 sm:w-24 sm:h-40 flex flex-col items-center flex-shrink-0" id="tech-character-illustration">
                      {/* Face / Head */}
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFE0BD] shadow-sm">
                        {/* Cap with visor */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-4 sm:h-5 bg-natural-brown rounded-t-full" />
                        <div className="absolute top-0.5 -right-0.5 w-4 sm:w-5 h-1 bg-natural-brown rounded rotate-6" />
                        {/* Hair strands */}
                        <div className="absolute top-1.5 inset-x-1 h-2.5 bg-slate-800 rounded-b-sm" />
                        {/* Eyes */}
                        <div className="absolute top-5 left-3 w-1 h-1 bg-slate-800 rounded-full" />
                        <div className="absolute top-5 right-3 w-1 h-1 bg-slate-800 rounded-full" />
                        {/* Smile */}
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-3 h-1 border-b-2 border-slate-800 rounded-b-full" />
                      </div>

                      {/* Neck */}
                      <div className="w-2 h-1.5 bg-[#FFE0BD]" />

                      {/* Overalls / Body Torso */}
                      <div className="relative w-12 h-20 sm:w-14 sm:h-24 bg-natural-sage rounded-t-xl flex flex-col items-center pt-2 shadow-sm border-t border-natural-sage-hover">
                        {/* Overalls straps */}
                        <div className="absolute top-0 left-1.5 w-2 h-4 sm:h-5 bg-natural-brown/85 rounded-b-sm" />
                        <div className="absolute top-0 right-1.5 w-2 h-4 sm:h-5 bg-natural-brown/85 rounded-b-sm" />
                        
                        {/* Chest Pocket */}
                        <div className="mt-2.5 sm:mt-3 w-6 sm:w-7 h-5 sm:h-6 rounded bg-natural-sand border border-natural-brown/25 flex items-center justify-center">
                          <span className="text-[6px] sm:text-[7px] font-bold text-natural-brown tracking-tighter">DNR</span>
                        </div>
                        
                        {/* Tool Belt */}
                        <div className="absolute bottom-1.5 sm:bottom-2 inset-x-0 h-2 bg-natural-brown flex justify-around px-1.5">
                          <div className="w-1.5 h-full bg-slate-300" />
                          <div className="w-1.5 h-full bg-slate-300" />
                        </div>
                      </div>

                      {/* Animated Repair Arm carrying different tools depending on repair cycle */}
                      <motion.div
                        className="absolute -left-4 sm:-left-5 top-12 sm:top-14 origin-right"
                        animate={{ 
                          rotate: animationStep === 1 ? [15, -15, 15] : [5, -5, 5] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: animationStep === 1 ? 0.6 : 1.2,
                          ease: "easeInOut" 
                        }}
                      >
                        {/* Sleeve */}
                        <div className="w-6 sm:w-8 h-3.5 sm:h-4 bg-natural-sage rounded-l-full relative origin-right flex items-center justify-end">
                          {/* Arm skin */}
                          <div className="absolute -left-3 sm:-left-4 w-5 sm:w-6 h-2.5 sm:h-3 bg-[#FFE0BD] rounded-l-full flex items-center justify-start">
                            {/* Hand */}
                            <div className="absolute -left-0.5 w-3 h-3 bg-[#FFE0BD] rounded-full flex items-center justify-center">
                              {/* Tool representation */}
                              {animationStep === 0 ? (
                                <div className="absolute w-6 sm:w-8 h-1 bg-slate-500 rounded -left-4 sm:-left-5 rotate-12 flex items-center justify-start">
                                  <div className="w-1 h-1 bg-slate-600 rounded-l" />
                                </div>
                              ) : (
                                <Wrench className="w-3.5 h-3.5 text-slate-500 absolute -left-1 sm:-left-1.5 -rotate-45" />
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: TYPES OF WASHING MACHINES */}
      <section className="py-20 bg-[#FAF9F6] border-y border-natural-cream/40" id="washing-machine-types-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <span className="text-natural-brown font-mono text-xs font-bold uppercase tracking-widest block mb-2">
              APPLIANCES WE SERVICE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-natural-dark-sage tracking-tight">
              Types of Washing Machines We Repair
            </h2>
            <p className="text-[#6B756B] text-base mt-4 font-sans leading-relaxed">
              Different washing machine architectures require unique replacement parts and repair methods. Our expert mechanics carry customized toolsets and solutions for every variant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="types-grid">
            {WASHING_MACHINE_TYPES.map((type) => (
              <div 
                key={type.id}
                className="bg-natural-warm-white rounded-2xl border border-natural-cream p-6 sm:p-8 text-left hover:shadow-lg transition-all duration-300 flex flex-col justify-between shadow-sm"
                id={`type-card-${type.id}`}
              >
                <div>
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-6 bg-natural-sand flex items-center justify-center">
                    <img 
                      src={type.imageUrl} 
                      alt={type.name} 
                      className="object-contain w-full h-full p-4 sm:p-6 hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-natural-brown/10 text-natural-brown text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      Genuine Spares Available
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-natural-dark-sage flex items-center gap-2">
                    {type.name}
                  </h3>
                  <p className="text-natural-text/90 text-sm mt-3 leading-relaxed font-sans">
                    {type.description}
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-natural-sage flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High-Quality Features
                      </h4>
                      <ul className="mt-2 space-y-1 text-natural-text/75 text-xs">
                        {type.keyFeatures.slice(0, 3).map((feat, idx) => (
                          <li key={idx}>• {feat}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-natural-brown flex items-center gap-1">
                        <Wrench className="w-3.5 h-3.5" /> Common Breakdowns
                      </h4>
                      <ul className="mt-2 space-y-1 text-natural-text/75 text-xs">
                        {type.commonProblems.slice(0, 3).map((prob, idx) => (
                          <li key={idx}>• {prob}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-natural-cream/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#6B756B]">Same-day doorstep service</span>
                  <button 
                    onClick={() => {
                      // Map machine type to corresponding service detail ID
                      let serviceId: ServiceID = "top-loading";
                      if (type.id === "front-load") serviceId = "front-loading";
                      if (type.id === "semi-auto") serviceId = "semi-automated";
                      if (type.id === "fully-auto") serviceId = "fully-automated";
                      onNavigate("service-detail", serviceId);
                    }}
                    className="text-xs font-bold text-natural-brown hover:text-natural-dark-sage flex items-center gap-1"
                    id={`type-btn-view-${type.id}`}
                  >
                    View Service Details <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPANY INFO & PRODUCT QUALITY SHOWCASE */}
      <section className="py-20 bg-natural-dark-sage text-natural-bg relative overflow-hidden" id="company-quality-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,123,92,0.15),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Premium illustration overlay (washing machine with spares info) */}
            <div className="lg:col-span-6 space-y-6" id="quality-illu-block">
              <div className="relative rounded-2xl overflow-hidden border border-natural-cream/30 shadow-2xl bg-natural-warm-white p-8 text-natural-text">
                <div className="absolute top-0 right-0 p-4">
                  <Package className="w-12 h-12 text-blue-500/20" />
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-natural-dark-sage">Premium Spare Parts &amp; Covers Hub</h3>
                <p className="text-natural-text/80 text-sm mt-2 leading-relaxed">
                  We don't just repair washing machines; we also extend their life. DNR Smart Service sells original, high-quality waterproof washing machine covers and 100% genuine replacement components.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-natural-sand/50 border border-natural-cream/65">
                    <span className="text-natural-brown font-extrabold text-2xl block">All Sizes</span>
                    <span className="text-xs font-bold block mt-1 uppercase text-natural-dark-sage">Heavy-Duty Covers</span>
                    <span className="text-[11px] text-natural-text/85">Dust-proof, water-resistant protective covers custom-tailored for all sizes.</span>
                  </div>

                  <div className="p-4 rounded-xl bg-natural-sand/50 border border-natural-cream/65">
                    <span className="text-natural-brown font-extrabold text-2xl block">OEM</span>
                    <span className="text-xs font-bold block mt-1 uppercase text-natural-dark-sage">Certified Spares</span>
                    <span className="text-[11px] text-natural-text/85">We source inlet valves, timers, gearboxes, and drain pumps directly from official distributors.</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-natural-light-green/90 border border-natural-sage/20 rounded-xl text-xs text-natural-dark-sage flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-natural-sage flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-sm text-natural-dark-sage">Official Service Warranty</span>
                    Receive up to <b>90 Days Service Warranty</b> on any spare part replaced by DNR Smart Service technicians. Complete digital invoice provided.
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Info about company and quality */}
            <div className="lg:col-span-6 space-y-6 text-left" id="quality-info-block">
              <span className="text-[#E5E2D9] font-mono text-xs font-bold uppercase tracking-widest block">
                WHY CHOOSE DNR SMART SERVICE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight !text-white">
                Quality Washing Machine Services at Your Doorstep, 24/7
              </h2>
              <p className="text-slate-200 leading-relaxed text-sm">
                Established over a decade ago in Hyderabad, DNR Smart Service has fixed over <b>15,000+ washing machines</b>. Our core philosophy is simple: complete honesty, premium replacement quality, and ultimate convenience. You don't need to lift your appliance or bring it to a shop; our expert engineers fix it right inside your laundry area.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="p-1.5 h-fit rounded-lg bg-white/10 text-[#FAF9F6]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm !text-white">100% On-Spot Resolution</h4>
                    <p className="text-xs text-slate-300">95% of issues (motor faults, bearing wear, panel errors) are fixed on the first visit directly at your home.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-1.5 h-fit rounded-lg bg-white/10 text-[#FAF9F6]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm !text-white">All Brands Covered Under One Roof</h4>
                    <p className="text-xs text-slate-300">Specialist teams certified for LG, Samsung, Whirlpool, Bosch, IFB, and Godrej premium models.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-1.5 h-fit rounded-lg bg-white/10 text-[#FAF9F6]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm !text-white">24 Hours Emergency Doorstep Helpline</h4>
                    <p className="text-xs text-slate-300">Got a water leak flooding your apartment at midnight? Our emergency engineers are on standby for immediate rescue.</p>
                  </div>
                </div>
              </div>

              {/* Serviced brands logos ticker representation */}
              <div className="pt-6 border-t border-natural-cream/20">
                <p className="text-[10px] font-bold text-[#E5E2D9] uppercase tracking-widest mb-3">Brands We Support</p>
                <div className="flex flex-wrap gap-2">
                  {BRANDS_SERVED.map((brand) => (
                    <span key={brand} className="text-xs px-3 py-1 bg-[#2D332D]/80 border border-natural-cream/15 rounded font-medium text-natural-bg">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-natural-brown hover:bg-[#8f6749] text-white rounded-xl font-bold text-sm transition-colors"
                  id="quality-call-cta"
                >
                  <span>Speak to Technical Advisor</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
