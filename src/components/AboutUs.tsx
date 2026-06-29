import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Wrench,
  Sparkles,
  ThumbsUp
} from "lucide-react";

export default function AboutUs() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  
  const videoDuration = 9.0; // 9 seconds loop
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound Synthesizer function using Web Audio API
  const synthBeep = (freq: number, duration: number, type: OscillatorType = "sine", gainVal = 0.04) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gainNode.gain.setValueAtTime(gainVal, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context failed to load or browser blocked interaction
    }
  };

  // Manage video timer ticking
  useEffect(() => {
    if (isPlaying) {
      const tickRate = 50; // ms
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextVal = prev + tickRate / 1000;
          if (nextVal >= videoDuration) {
            // Loop sound chime
            synthBeep(440, 0.1, "sine", 0.02);
            return 0;
          }
          return nextVal;
        });
      }, tickRate);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isMuted]);

  // Audio trigger effects on state boundaries
  const prevTimeRef = useRef(0);
  useEffect(() => {
    const prev = prevTimeRef.current;
    
    // 1. Clinking sounds during wrenching phase (State 1: 2s - 4.5s)
    if (currentTime >= 2.0 && currentTime < 4.5) {
      const step = Math.floor((currentTime - 2.0) * 1.6);
      const prevStep = Math.floor((prev - 2.0) * 1.6);
      if (step !== prevStep) {
        synthBeep(1200, 0.08, "triangle", 0.03); // clink
      }
    }
    
    // 2. Beepbeep dial turn (State 3 entry: 6.0s)
    if (currentTime >= 6.0 && prev < 6.0) {
      synthBeep(880, 0.1, "sine", 0.05);
      setTimeout(() => synthBeep(1100, 0.1, "sine", 0.05), 100);
    }

    // 3. Triumphant finish chime (State 4 entry: 7.8s)
    if (currentTime >= 7.8 && prev < 7.8) {
      synthBeep(523.25, 0.15, "sine", 0.06); // C5
      setTimeout(() => synthBeep(659.25, 0.3, "sine", 0.06), 120); // E5
    }

    prevTimeRef.current = currentTime;
  }, [currentTime]);

  // Determine current active animation state
  let activeState = 0; // 0 = Inspection, 1 = Wrenching, 2 = Clean Up, 3 = Test Run, 4 = Thumbs Up
  let subtitleText = "Let's see what's going on here...";

  if (currentTime < 2.0) {
    activeState = 0;
    subtitleText = "Let's see what's going on here...";
  } else if (currentTime >= 2.0 && currentTime < 4.8) {
    activeState = 1;
    subtitleText = "Just need to tighten this up a bit...";
  } else if (currentTime >= 4.8 && currentTime < 6.2) {
    activeState = 2;
    subtitleText = "There we go, brand new!";
  } else if (currentTime >= 6.2 && currentTime < 7.8) {
    activeState = 3;
    subtitleText = "Time for a test run.";
  } else {
    activeState = 4;
    subtitleText = "Works perfectly.";
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    synthBeep(600, 0.1, "sine");
  };

  const handleScrub = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 font-sans" id="about-us-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20" id="about-hero-grid">
          
          <div className="lg:col-span-6 space-y-6 text-left" id="about-text-block">
            <span className="text-natural-brown font-mono text-xs font-bold uppercase tracking-widest block">
              ESTABLISHED IN 2012
            </span>
            <h1 className="font-serif text-4xl font-extrabold text-natural-dark-sage tracking-tight leading-tight">
              About DNR Smart Service
            </h1>

            {/* HIGH FIDELITY MEDIA PLAYER FOR UPLOADED VIDEO */}
            <div className="w-full rounded-2xl border border-slate-200 bg-slate-900 shadow-xl overflow-hidden relative" id="about-video-player-root">
              {/* Video Header Bar */}
              <div className="bg-slate-950/80 px-4 py-2 flex items-center justify-between border-b border-slate-800/60 text-[11px] font-mono text-slate-400 z-10">
                <div className="flex items-center gap-2">
                  <span className="block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-bold uppercase tracking-wider text-slate-200">DNR_REPAIR_DEMO.MP4</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-white font-medium">
                  1080p HD
                </div>
              </div>

              {/* Main Video Canvas Screen Area (16:9 Aspect Ratio) */}
              <div className="relative w-full aspect-video bg-gradient-to-b from-[#D4EDDA] to-[#C3E6CB] overflow-hidden flex items-end justify-center select-none pointer-events-none" id="video-canvas-screen">
                
                {/* Kitchen Workspace Background Details */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute top-4 left-6 w-20 h-28 bg-white border border-slate-400/40 rounded-md" /> {/* Cabinet */}
                  <div className="absolute top-4 left-28 w-20 h-28 bg-white border border-slate-400/40 rounded-md" /> {/* Cabinet */}
                  <div className="absolute top-16 right-8 w-1.5 h-1.5 rounded-full bg-slate-600" /> {/* Wall socket */}
                  <div className="absolute top-18 right-8 w-3 h-2 bg-slate-200 rounded-sm border border-slate-400" />
                  {/* Floor tile grid lines */}
                  <div className="absolute bottom-0 inset-x-0 h-16 border-t border-slate-400 flex justify-around">
                    <div className="w-px h-full bg-slate-400" />
                    <div className="w-px h-full bg-slate-400" />
                    <div className="w-px h-full bg-slate-400" />
                  </div>
                </div>

                {/* ANIMATION COMPONENT STAGES */}
                <div className="relative w-full h-full flex items-end justify-center pb-4 px-6 gap-6 sm:gap-10 scale-90 sm:scale-100 origin-bottom">
                  
                  {/* Washing Machine Element */}
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex flex-col justify-between bg-slate-50 rounded-2xl border-4 border-slate-300 p-2.5 shadow-md flex-shrink-0 mb-1">
                    
                    {/* Top Console */}
                    <div className="flex justify-between items-center pb-1 border-b border-slate-200">
                      <div className="w-8 h-1.5 bg-slate-300 rounded" />
                      {/* LED Timer Display */}
                      <div className="flex gap-0.5 items-center bg-slate-900 px-1 py-0.5 rounded">
                        <div className={`w-1 h-1 rounded-full ${activeState === 3 ? "bg-green-500 animate-pulse" : "bg-amber-400"}`} />
                        <span className="text-[7px] font-mono text-cyan-400 leading-none">
                          {activeState === 3 ? "RUN" : "0:09"}
                        </span>
                      </div>
                    </div>

                    {/* Window Drum */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-slate-800 border-4 border-slate-300 flex items-center justify-center overflow-hidden shadow-inner">
                      {/* Glass drum spin lines */}
                      <motion.div 
                        className="absolute inset-1 rounded-full border border-dashed border-slate-500"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: activeState === 3 ? 0.6 : 8, ease: "linear" }}
                      />

                      {/* Sparkles waves during tightening repair */}
                      {activeState === 1 && (
                        <motion.div 
                          className="absolute inset-2 rounded-full bg-yellow-400/10 flex items-center justify-center"
                          animate={{ scale: [0.95, 1.1, 0.95] }}
                          transition={{ repeat: Infinity, duration: 1.0 }}
                        >
                          <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                        </motion.div>
                      )}

                      {/* Water splashes & Spinning cloths during active test-run */}
                      {activeState === 3 && (
                        <motion.div 
                          className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500/35 border border-blue-300/40 flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 0.9, 1], rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        >
                          {/* Inner water swirls */}
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-blue-200/40 border-t-blue-100 animate-spin" />
                        </motion.div>
                      )}

                      {/* Drum reflection highlight */}
                      <div className="absolute top-1 left-1 w-6 h-3 bg-white/10 rounded-full rotate-[-30deg]" />
                    </div>

                    {/* Lower access panel door */}
                    <div className="absolute bottom-2 right-2.5 w-6 h-5 border border-slate-300 rounded flex items-center justify-center bg-slate-50">
                      {activeState === 1 ? (
                        /* Open Panel showing internal electronics */
                        <div className="w-4 h-3 bg-slate-900 rounded flex flex-col justify-around p-0.5 border border-amber-500/50">
                          <div className="w-full h-px bg-red-400" />
                          <div className="w-full h-px bg-yellow-400" />
                        </div>
                      ) : (
                        /* Closed Panel door */
                        <div className="w-3.5 h-0.5 bg-slate-300 rounded-sm" />
                      )}
                    </div>

                    {/* Base stabilizers */}
                    <div className="absolute -bottom-1.5 inset-x-4 flex justify-between">
                      <div className="w-3 h-1.5 bg-slate-400 rounded-b" />
                      <div className="w-3 h-1.5 bg-slate-400 rounded-b" />
                    </div>
                  </div>

                  {/* Technician Character Illustration */}
                  <div className="relative w-18 h-32 sm:w-20 sm:h-36 flex flex-col items-center flex-shrink-0 mb-1" id="video-tech-character">
                    
                    {/* Head & Hat */}
                    <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFE0BD] shadow-sm">
                      {/* Green Cap with Visor */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 sm:w-9 h-3.5 sm:h-4 bg-[#7FA48F] rounded-t-full" />
                      <div className="absolute top-0.5 -right-0.5 w-4 h-1 bg-[#7FA48F] rounded rotate-6" />
                      {/* Hair */}
                      <div className="absolute top-1.5 inset-x-0.5 h-2 bg-slate-800 rounded-b-sm opacity-90" />
                      {/* Face features */}
                      <div className="absolute top-4 sm:top-4.5 left-2.5 w-1 h-1 bg-slate-800 rounded-full" />
                      <div className="absolute top-4 sm:top-4.5 right-2.5 w-1 h-1 bg-slate-800 rounded-full" />
                      
                      {/* Smiley or Wink expression depending on cycle */}
                      {activeState === 4 ? (
                        /* Wink Smile */
                        <>
                          <div className="absolute top-4.5 right-2 w-1.5 h-0.5 bg-slate-800 rounded rotate-[-15deg]" /> {/* Winking eye */}
                          <div className="absolute top-6.5 left-1/2 -translate-x-1/2 w-3.5 h-1.5 border-b-2 border-slate-800 rounded-b-full bg-red-300/30" />
                        </>
                      ) : (
                        /* Standard Smiley */
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-1 border-b-2 border-slate-800 rounded-b-full" />
                      )}

                      {/* Grease smudge on cheek for State 2 & onwards */}
                      {activeState >= 2 && (
                        <div className="absolute top-5 left-1.5 w-2 h-1.5 bg-slate-600 rounded-full rotate-12 opacity-65 blur-[0.3px]" />
                      )}
                    </div>

                    {/* Neck */}
                    <div className="w-1.5 h-1 bg-[#FFE0BD]" />

                    {/* Overalls Over White Shirt */}
                    <div className="relative w-10 h-16 sm:w-11 sm:h-18 bg-[#7FA48F] rounded-t-lg flex flex-col items-center pt-1.5 border-t border-slate-100 shadow-sm">
                      {/* Straps */}
                      <div className="absolute top-0 left-1 w-1.5 h-3 bg-[#A88870] rounded-b-xs" />
                      <div className="absolute top-0 right-1 w-1.5 h-3 bg-[#A88870] rounded-b-xs" />
                      
                      {/* Chest pocket */}
                      <div className="mt-1 w-5 h-4 rounded bg-[#E4DED1] border border-[#A88870]/30 flex items-center justify-center">
                        <span className="text-[5px] font-black tracking-tight text-[#A88870]">DNR</span>
                      </div>

                      {/* Tool Belt */}
                      <div className="absolute bottom-1 px-1 inset-x-0 h-1.5 bg-[#A88870] flex justify-around">
                        <div className="w-1 h-full bg-slate-300 rounded-sm" />
                        <div className="w-1 h-full bg-slate-300 rounded-sm" />
                      </div>
                    </div>

                    {/* Animated Repair Arm with Wrench or Thumbs up */}
                    <motion.div
                      className="absolute -left-3 sm:-left-3.5 top-11 sm:top-12 origin-right"
                      animate={
                        activeState === 1 
                          ? { rotate: [15, -25, 15] } // Active wrenching motion
                          : activeState === 4
                          ? { rotate: [-10] } // Holding proud stance
                          : { rotate: [5, -5, 5] }
                      }
                      transition={{ 
                        repeat: Infinity, 
                        duration: activeState === 1 ? 0.5 : 1.5,
                        ease: "easeInOut" 
                      }}
                    >
                      {/* Arm sleeve */}
                      <div className="w-5 sm:w-6 h-3 bg-[#7FA48F] rounded-l-full relative flex items-center justify-end">
                        {/* Hand & tool */}
                        <div className="absolute -left-2.5 w-3 h-3 bg-[#FFE0BD] rounded-full flex items-center justify-center">
                          {activeState === 1 ? (
                            /* Silver wrench tool */
                            <Wrench className="w-3.5 h-3.5 text-slate-500 absolute -left-1 -rotate-45" />
                          ) : activeState === 4 ? (
                            /* Thumbs Up hand symbol */
                            <ThumbsUp className="w-3 h-3 text-emerald-600 fill-emerald-500 absolute -left-0.5 -top-0.5 animate-bounce" />
                          ) : (
                            /* Idle screwdriver */
                            <div className="w-4 h-0.5 bg-slate-400 rounded-sm absolute -left-2.5 rotate-12" />
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Toolbox on the floor right beside him */}
                    <div className="absolute -right-5 bottom-0 w-5 h-4 bg-slate-500 rounded border border-slate-600 flex items-center justify-center">
                      <div className="w-2.5 h-0.5 bg-slate-700 rounded-sm absolute -top-0.5" /> {/* handle */}
                    </div>
                  </div>

                </div>

                {/* Subtitle Text Overlay */}
                {showSubtitles && (
                  <div className="absolute bottom-4 inset-x-4 flex justify-center z-10">
                    <span className="bg-black/85 px-4 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-sans font-medium text-slate-100 border border-slate-800 text-center shadow-lg max-w-[90%] tracking-wide">
                      {subtitleText}
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Bar / Scrubber Timeline */}
              <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800/80 flex flex-col gap-2 z-10 relative">
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max={videoDuration}
                    step="0.05"
                    value={currentTime}
                    onChange={handleScrub}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-natural-brown border-none outline-none focus:ring-1 focus:ring-natural-brown"
                    id="video-timeline-scrubber"
                  />
                </div>

                {/* Player Controls Panel */}
                <div className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-4">
                    {/* Play/Pause Button */}
                    <button
                      onClick={handlePlayPause}
                      className="p-1.5 rounded-full hover:bg-slate-800 hover:text-white transition duration-200 focus:outline-none"
                      title={isPlaying ? "Pause" : "Play"}
                      id="play-pause-btn"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    {/* Replay Button */}
                    <button
                      onClick={handleReplay}
                      className="p-1.5 rounded-full hover:bg-slate-800 hover:text-white transition duration-200 focus:outline-none"
                      title="Replay"
                      id="replay-btn"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Timer Display */}
                    <span className="text-[11px] font-mono text-slate-400">
                      0:0{Math.floor(currentTime)} / 0:0{Math.floor(videoDuration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Subtitle CC Toggle */}
                    <button
                      onClick={() => setShowSubtitles(!showSubtitles)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition duration-200 focus:outline-none ${
                        showSubtitles 
                          ? "bg-natural-brown border-natural-brown text-white" 
                          : "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                      }`}
                      title="Toggle Captions"
                      id="subtitles-cc-btn"
                    >
                      CC
                    </button>

                    {/* Mute/Unmute Synthesized Sound Effects */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full hover:bg-slate-800 hover:text-white transition duration-200 focus:outline-none"
                      title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
                      id="mute-unmute-btn"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-lg font-semibold text-natural-brown">
              Your Trusted On-Spot Doorstep Repair Team in Hyderabad
            </h2>
            <p className="text-natural-text/90 text-sm leading-relaxed font-sans">
              DNR Smart Service began with a single mission: to eliminate the hassle of appliance repair. We realized that transporting heavy, broken washing machines to offsite service centers was expensive, time-consuming, and risky. 
            </p>
            <p className="text-natural-text/90 text-sm leading-relaxed font-sans">
              To solve this, we assembled a elite team of factory-trained, multi-brand certified mechanics and equipped them with specialized mobile testing gear and original manufacturer spare parts. Today, we stand as Hyderabad's premier doorstep repair platform, servicing thousands of households annually with standard 24/7 coverage.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-natural-cream/60">
              <div>
                <span className="text-2xl font-serif font-extrabold text-natural-dark-sage block">15,000+</span>
                <span className="text-xs text-[#6B756B] font-medium">Washing Machines Repaired</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-extrabold text-natural-dark-sage block">45 Mins</span>
                <span className="text-xs text-[#6B756B] font-medium">Average Response Time</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-extrabold text-natural-dark-sage block">100%</span>
                <span className="text-xs text-[#6B756B] font-medium">Genuine Spare Parts Only</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-extrabold text-natural-dark-sage block">90 Days</span>
                <span className="text-xs text-[#6B756B] font-medium">Comprehensive Warranty</span>
              </div>
            </div>
          </div>

          {/* Graphical Trust Illustration */}
          <div className="lg:col-span-6" id="about-illu-block">
            <div className="relative bg-natural-warm-white rounded-2xl border border-natural-cream p-8 shadow-sm space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B756B] font-mono block">OUR GUARANTEE DECAL</span>
              
              <div className="p-4 bg-natural-light-green border border-natural-sage/20 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-natural-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-natural-dark-sage">100% Genuine Spare Parts</h4>
                  <p className="text-xs text-natural-text/80 mt-1">We never install generic or duplicate components. All belts, solenoid valves, drain pumps, and timers carry the official OEM logo and hologram.</p>
                </div>
              </div>

              <div className="p-4 bg-natural-sand/50 border border-natural-cream/60 rounded-xl flex items-start gap-3">
                <UserCheck className="w-6 h-6 text-natural-brown flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-natural-dark-sage">Certified Senior Mechanics</h4>
                  <p className="text-xs text-natural-text/80 mt-1">Our technicians undergo mandatory testing and brand certifications to safely diagnose high-efficiency inverter motherboards and electronic panels.</p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F6] border border-natural-cream rounded-xl flex items-start gap-3">
                <HeartHandshake className="w-6 h-6 text-natural-sage flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm text-natural-dark-sage">Honest Upfront Pricing</h4>
                  <p className="text-xs text-natural-text/80 mt-1">No surprise charges. After diagnosis, we supply a line-by-line cost estimation. If you proceed with the repair, our visiting fee is completely waived!</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Step Service Cycle */}
        <div className="mb-20" id="about-cycle">
          <div className="text-center mb-12">
            <span className="text-natural-brown font-mono text-xs font-bold uppercase tracking-widest block mb-1">OUR SERVICE WORKFLOW</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-natural-dark-sage tracking-tight">How We Fix Your Appliance</h3>
            <p className="text-xs sm:text-sm text-[#6B756B] mt-2">Smooth, effortless doorstep solutions from booking to clean run</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-natural-warm-white rounded-xl p-6 border border-natural-cream shadow-sm relative text-left">
              <span className="absolute top-4 right-4 text-natural-cream/35 font-serif font-black text-3xl select-none">01</span>
              <div className="w-10 h-10 bg-natural-sand text-natural-brown rounded-lg flex items-center justify-center mb-4 font-bold">📞</div>
              <h4 className="font-serif font-bold text-base text-natural-dark-sage">Step 1: Rapid Booking</h4>
              <p className="text-xs text-natural-text/85 mt-2 leading-relaxed">Call or WhatsApp our dispatcher. Specify your machine brand and current symptoms to schedule an immediate slot.</p>
            </div>

            <div className="bg-natural-warm-white rounded-xl p-6 border border-natural-cream shadow-sm relative text-left">
              <span className="absolute top-4 right-4 text-natural-cream/35 font-serif font-black text-3xl select-none">02</span>
              <div className="w-10 h-10 bg-natural-sand text-natural-brown rounded-lg flex items-center justify-center mb-4 font-bold">🚗</div>
              <h4 className="font-serif font-bold text-base text-natural-dark-sage">Step 2: On-Time Arrival</h4>
              <p className="text-xs text-natural-text/85 mt-2 leading-relaxed">Our nearest mobile technician van is deployed. We arrive at your doorstep equipped with diagnostic tools in under 45 minutes.</p>
            </div>

            <div className="bg-natural-warm-white rounded-xl p-6 border border-natural-cream shadow-sm relative text-left">
              <span className="absolute top-4 right-4 text-natural-cream/35 font-serif font-black text-3xl select-none">03</span>
              <div className="w-10 h-10 bg-natural-sand text-natural-brown rounded-lg flex items-center justify-center mb-4 font-bold">⚙️</div>
              <h4 className="font-serif font-bold text-base text-natural-dark-sage">Step 3: On-Spot Fixing</h4>
              <p className="text-xs text-natural-text/85 mt-2 leading-relaxed">We perform advanced fault diagnosis, share transparent cost estimates, and fit original spare parts on the spot.</p>
            </div>

            <div className="bg-natural-warm-white rounded-xl p-6 border border-natural-cream shadow-sm relative text-left">
              <span className="absolute top-4 right-4 text-natural-cream/35 font-serif font-black text-3xl select-none">04</span>
              <div className="w-10 h-10 bg-natural-sand text-natural-brown rounded-lg flex items-center justify-center mb-4 font-bold">✨</div>
              <h4 className="font-serif font-bold text-base text-natural-dark-sage">Step 4: Warranty Handover</h4>
              <p className="text-xs text-natural-text/85 mt-2 leading-relaxed">After a test run at high spin speeds, we hand over a digital tax invoice and an official 90-day service warranty card.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
