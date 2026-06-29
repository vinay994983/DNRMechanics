import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Wrench, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Camera, 
  ArrowLeftRight, 
  Sparkles,
  ArrowRight,
  UserCheck
} from "lucide-react";
import { DISPLAY_MOBILE_NUMBER } from "../data";

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  date: string;
  rating: number;
  serviceType: string;
  brand: string;
  feedback: string;
  tags: string[];
  caseStudy?: {
    title: string;
    beforeText: string;
    afterText: string;
    beforeImageUrl: string;
    afterImageUrl: string;
    type: "spider" | "tub" | "parts" | "ifb" | "lg";
    labelBefore: string;
    labelAfter: string;
  };
}

const STATIC_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Srinivas Rao",
    location: "Secunderabad, Hyderabad",
    date: "June 24, 2026",
    rating: 5,
    serviceType: "Drum & Spider Replacement",
    brand: "Samsung (Inverter Front Load)",
    feedback: "Our washing machine was making an unbearable roaring and grinding metallic noise during high spin speeds. The technician from DNR arrived in 30 minutes, disassembled the machine on-spot, and showed me the completely corroded, cracked 3-arm drum spider flange (it was literally crumbling due to hard water scale). He fitted a brand new OEM heavy-duty spider shaft right in front of me. Now the machine runs in pin-drop silence! Highly professional on-spot restoration.",
    tags: ["Grinding Noise Fixed", "Spider Replacement", "OEM Spares"],
    caseStudy: {
      title: "Samsung Front Load Drum Spider Restoration",
      beforeText: "3-arm drum spider completely corroded, cracked, and caked with thick lime scale and chemical deposits, causing severe drum misalignment and metallic roaring noises.",
      afterText: "Pristine brand-new heavy-duty OEM support spider and high-speed shaft bolted securely onto the stainless steel drum, fully calibrated for vibration-free 1200 RPM rotation.",
      beforeImageUrl: "/images/spider_before.svg",
      afterImageUrl: "/images/spider_after.svg",
      type: "spider",
      labelBefore: "Rusted & Cracked Spider",
      labelAfter: "New OEM Support Restored"
    }
  },
  {
    id: "rev-2",
    name: "Anitha Reddy",
    location: "Gachibowli, Hyderabad",
    date: "June 18, 2026",
    rating: 5,
    serviceType: "Tub Descaling & Deep Cleaning",
    brand: "IFB (Seno 6.5KG Front Load)",
    feedback: "The clothes were smelling musty and leaving gray spots. DNR technicians did a full tub-out descaling service. When they split the outer plastic tub halves, it was shockingly covered in black sludge, slimy soap scum, and hard water scale. The heating element was completely coated in limestone. They pressure washed the tub, cleaned the heating coil to like-new condition, and reassembled it with fresh sealant. The fresh scent is back! Excellent work.",
    tags: ["Smell Removed", "Tub Deep Clean", "Heater Serviced"],
    caseStudy: {
      title: "IFB Front Load Outer Tub & Heater Descaling",
      beforeText: "Outer plastic tub interior heavily caked in black muddy sludge, soap scum buildup, and a highly scaled heating element resulting in cold washes and foul mildew odor.",
      afterText: "Polished and pressure-washed outer tub structure with a thoroughly descaled, clean heating element, delivering hygienic, fresh-smelling water cycles.",
      beforeImageUrl: "/images/tub_before.svg",
      afterImageUrl: "/images/tub_after.svg",
      type: "tub",
      labelBefore: "Muddy Scum & Sludge",
      labelAfter: "Decalcified & Pressure Cleaned"
    }
  },
  {
    id: "rev-3",
    name: "Nikhil Kumar",
    location: "Kukatpally, Hyderabad",
    date: "June 12, 2026",
    rating: 5,
    serviceType: "Drum Bearing & Suspension Repair",
    brand: "LG (Direct Drive 8KG)",
    feedback: "The machine had severe high-vibration shaking during spins and a grinding noise. The technician diagnostic was worn-out dual bearings and damaged dampers. He fully disassembled the tub, took out the stainless steel drum, pressed out the damaged bearings, and replaced them with genuine SKF water-sealed bearings along with fresh suspension dampers. Took about 2 hours at my house but the workmanship was absolutely premium. No vibrations at all now!",
    tags: ["High Shaking Fixed", "SKF Bearings", "Suspension Restored"],
    caseStudy: {
      title: "LG Direct Drive Tub Disassembly & Bearing Replacement",
      beforeText: "Blown water seals allowed detergent water to rusted out the rear drum bearings, causing extreme shaft play, loud thumping, and severe cabinet vibrations.",
      afterText: "Pristine stainless steel drum cleaned, fitted with premium double-sealed SKF bearings and premium hydraulic shock absorber dampers on the cabinet floor.",
      beforeImageUrl: "/images/bearing_before.svg",
      afterImageUrl: "/images/bearing_after.svg",
      type: "parts",
      labelBefore: "Worn Rusty Bearings",
      labelAfter: "Double-Sealed SKF Bearings"
    }
  },
  {
    id: "rev-4",
    name: "Priya Sharma",
    location: "Madhapur, Hyderabad",
    date: "June 05, 2026",
    rating: 5,
    serviceType: "Door Lock & Gasket Leakage Fix",
    brand: "LG (Inverter Front Load)",
    feedback: "Very satisfied with the quick response! There was water pooling in front of our LG front-loader due to a tear in the rubber door bellow. DNR technician carried the exact compatible LG grey bellows and replaced it on-spot in 45 minutes. He also adjusted the door strike alignment so it locks smoothly without dE error codes. Very polite, professional, and gave helpful tips on keeping the rubber dry to prevent mold. Highly recommended!",
    tags: ["Water Leak Fixed", "Rubber Gasket Replacement", "dE Error Code solved"],
    caseStudy: {
      title: "LG Front Load Door Rubber Bellows Service",
      beforeText: "Torn door rubber gasket leading to active water leakage during washing cycles, with mold and soap scum accumulated in the folds.",
      afterText: "A brand-new, sterile OEM grey rubber door bellow gasket fitted and sealed with high-tension rings, completely leak-proofed.",
      beforeImageUrl: "/images/gasket_before.svg",
      afterImageUrl: "/images/gasket_after.svg",
      type: "lg",
      labelBefore: "Torn, Moldy Rubber Seal",
      labelAfter: "Pristine New Gray Bellow"
    }
  },
  {
    id: "rev-5",
    name: "Vikram Malhotra",
    location: "Kondapur, Hyderabad",
    date: "May 29, 2026",
    rating: 5,
    serviceType: "Emergency Diagnostics & PCB Repair",
    brand: "IFB (Senorita Front Load)",
    feedback: "The machine had a total power failure on a Sunday morning. Called DNR and their senior mechanic came in less than an hour. He used a multimeter to check the power supply card and discovered a capacitor burnout on the control PCB caused by voltage fluctuation. He repaired the track on the board, replaced the faulty capacitor on-spot, and installed a single-phase voltage surge protector. Machine started immediately! Saved me from buying an expensive new board.",
    tags: ["No Power Fixed", "PCB Motherboard Repair", "Sunday Doorstep Emergency"],
    caseStudy: {
      title: "IFB Senorita Controller PCB Diagnostic & Repair",
      beforeText: "Completely unresponsive power status with a shorted capacitor on the electronic control module due to heavy monsoon voltage spikes.",
      afterText: "Micro-soldered controller card with upgraded thermal capacitor fuse, fully sealed and tested on high spin cycles.",
      beforeImageUrl: "/images/pcb_before.svg",
      afterImageUrl: "/images/pcb_after.svg",
      type: "ifb",
      labelBefore: "Shorted Control PCB",
      labelAfter: "Micro-Soldered Restoration"
    }
  }
];

export default function Reviews() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(STATIC_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newService, setNewService] = useState("Tub Descaling & Deep Cleaning");
  const [newBrand, setNewBrand] = useState("LG");
  const [newFeedback, setNewFeedback] = useState("");
  const [newRating, setNewRating] = useState(5);

  const filterTags = ["All", "Drum & Spider", "Tub Descaling", "Bearing & Shaking", "Leakage Fixed", "PCB & Electronics"];

  const handleFilter = (tag: string) => {
    setSelectedTag(tag);
  };

  const getFilteredReviews = () => {
    if (selectedTag === "All") return reviewsList;
    if (selectedTag === "Drum & Spider") {
      return reviewsList.filter(r => r.serviceType.includes("Spider") || r.tags.includes("Spider Replacement"));
    }
    if (selectedTag === "Tub Descaling") {
      return reviewsList.filter(r => r.serviceType.includes("Descaling") || r.tags.includes("Tub Deep Clean"));
    }
    if (selectedTag === "Bearing & Shaking") {
      return reviewsList.filter(r => r.serviceType.includes("Bearing") || r.tags.includes("High Shaking Fixed"));
    }
    if (selectedTag === "Leakage Fixed") {
      return reviewsList.filter(r => r.tags.includes("Water Leak Fixed") || r.feedback.toLowerCase().includes("leak"));
    }
    if (selectedTag === "PCB & Electronics") {
      return reviewsList.filter(r => r.serviceType.includes("PCB") || r.tags.includes("PCB Motherboard Repair") || r.tags.includes("No Power Fixed"));
    }
    return reviewsList;
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation || !newFeedback) return;

    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const newReviewItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newName,
      location: `${newLocation}, Hyderabad`,
      date: formattedDate,
      rating: newRating,
      serviceType: newService,
      brand: newBrand,
      feedback: newFeedback,
      tags: ["Verified Customer", `${newBrand} Serviced`],
    };

    setReviewsList([newReviewItem, ...reviewsList]);
    setIsFormOpen(false);
    setShowToast(true);

    // Reset Form
    setNewName("");
    setNewLocation("");
    setNewFeedback("");
    setNewRating(5);

    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 font-sans" id="reviews-page-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Summary Cards */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="reviews-header">
          <span className="inline-flex items-center gap-1.5 bg-natural-sand text-natural-dark-sage text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2 border border-natural-cream/30">
            <Sparkles className="w-3.5 h-3.5 text-natural-brown animate-spin" /> Verified Customer Portals
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-natural-dark-sage tracking-tight">
            Our Feedbacks &amp; Reviews
          </h1>
          <p className="text-[#6B756B] mt-4 text-sm sm:text-base leading-relaxed">
            Read transparent doorstep case summaries and honest reviews from residents in Hyderabad who trust DNR Smart Service with their expensive home appliances.
          </p>
        </div>

        {/* Global Rating Dashboard */}
        <div className="bg-natural-warm-white rounded-3xl border border-natural-cream p-6 sm:p-8 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="reviews-dashboard">
          
          <div className="lg:col-span-4 text-center lg:text-left lg:border-r lg:border-natural-cream/70 lg:pr-8" id="db-column-1">
            <span className="text-[11px] font-mono font-bold text-[#6B756B] uppercase tracking-widest block mb-1">HYDERABAD SATISFACTION INDEX</span>
            <div className="flex items-baseline justify-center lg:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-serif font-black text-natural-dark-sage">5.0</span>
              <span className="text-lg font-mono font-bold text-[#6B756B]">/ 5.0</span>
            </div>
            
            <div className="flex justify-center lg:justify-start mt-2 text-natural-brown" id="stars-display">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            
            <p className="text-xs text-natural-text/80 mt-3 leading-relaxed">
              Based on over <b>2,850+ verified doorstep repair feedbacks</b> in Hyderabad from top-load and front-load washing machine repairs.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-2.5" id="db-column-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-natural-dark-sage w-12">5 Star</span>
              <div className="flex-1 bg-natural-sand h-3.5 rounded-full overflow-hidden">
                <div className="bg-natural-sage h-full rounded-full" style={{ width: "100%" }} />
              </div>
              <span className="text-xs font-mono text-[#6B756B] w-10 text-right">100%</span>
            </div>
            <div className="flex items-center gap-3 opacity-30">
              <span className="text-xs font-mono font-bold text-natural-dark-sage w-12">4 Star</span>
              <div className="flex-1 bg-natural-sand h-3.5 rounded-full overflow-hidden">
                <div className="bg-natural-sage h-full rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-xs font-mono text-[#6B756B] w-10 text-right">0%</span>
            </div>
            <div className="flex items-center gap-3 opacity-30">
              <span className="text-xs font-mono font-bold text-natural-dark-sage w-12">3 Star</span>
              <div className="flex-1 bg-natural-sand h-3.5 rounded-full overflow-hidden">
                <div className="bg-natural-sage h-full rounded-full" style={{ width: "0%" }} />
              </div>
              <span className="text-xs font-mono text-[#6B756B] w-10 text-right">0%</span>
            </div>
            <p className="text-[11px] text-[#6B756B] font-medium italic mt-1 text-center lg:text-left">
              * Showing 100% 5 out of 5 ratings based on real-world customer appreciation and happy outcomes.
            </p>
          </div>

          <div className="lg:col-span-3 text-center lg:pl-6" id="db-column-3">
            <h4 className="font-serif font-bold text-lg text-natural-dark-sage">Share Your Feedback</h4>
            <p className="text-xs text-[#6B756B] mt-1 mb-4 leading-relaxed">Happy with our doorstep washing machine service? Leave a review!</p>
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-5 py-3 bg-natural-brown hover:bg-[#8f6749] text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 mx-auto lg:w-full"
              id="write-review-btn"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isFormOpen ? "Close Form" : "Write Feedback"}</span>
            </button>
          </div>

        </div>

        {/* Dynamic Submission Form */}
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-natural-warm-white border-2 border-natural-brown/20 rounded-3xl p-6 sm:p-8 shadow-md mb-12"
            id="review-submission-form-container"
          >
            <h3 className="font-serif font-bold text-xl text-natural-dark-sage mb-2 flex items-center gap-2">
              <UserCheck className="w-5.5 h-5.5 text-natural-brown" /> Write Your Service Review
            </h3>
            <p className="text-xs text-[#6B756B] mb-6">Your feedback is appreciated and helps us maintain DNR Smart Service excellence.</p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Rajesh Khanna"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-cream bg-white text-sm focus:outline-none focus:border-natural-brown"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Suburb / Area in Hyderabad *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Kukatpally / Madhapur"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-cream bg-white text-sm focus:outline-none focus:border-natural-brown"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Washing Machine Brand *</label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-cream bg-white text-sm focus:outline-none"
                  >
                    <option value="LG">LG</option>
                    <option value="Samsung">Samsung</option>
                    <option value="IFB">IFB</option>
                    <option value="Bosch">Bosch</option>
                    <option value="Whirlpool">Whirlpool</option>
                    <option value="Godrej">Godrej</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Service Received *</label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-natural-cream bg-white text-sm focus:outline-none"
                  >
                    <option value="Drum & Spider Replacement">Drum & Spider Replacement</option>
                    <option value="Tub Descaling & Deep Cleaning">Tub Descaling & Deep Cleaning</option>
                    <option value="Bearing & Suspension Repair">Bearing & Suspension Repair</option>
                    <option value="Door Lock & Gasket Leakage Fix">Door Lock & Gasket Leakage Fix</option>
                    <option value="Inlet Valve / Motor Replacement">Inlet Valve / Motor Replacement</option>
                    <option value="Emergency Diagnostics & PCB Repair">Emergency Diagnostics & PCB Repair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Rating *</label>
                  <div className="flex items-center gap-1.5 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${star <= newRating ? "text-natural-brown fill-current" : "text-natural-sand"}`} />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-[#6B756B] ml-2">({newRating}/5 Stars)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-natural-dark-sage uppercase mb-1.5">Your Feedback Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How fast did we arrive? Was the problem solved on the spot? Are you happy with our 90-day warranty card?"
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-natural-cream bg-white text-sm focus:outline-none focus:border-natural-brown resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-natural-sand text-natural-dark-sage rounded-xl font-semibold text-xs hover:bg-natural-sand/70 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-natural-sage hover:bg-natural-sage-hover text-white rounded-xl font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Submit Feedback</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-6 left-6 z-50 bg-natural-dark-sage text-white p-4 rounded-xl shadow-2xl border border-natural-sage/30 flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5.5 h-5.5 text-natural-sage" />
            <div>
              <p className="text-xs font-bold font-serif">Review Posted Successfully!</p>
              <p className="text-[10px] text-[#FAF9F6]/80">Thank you Rajesh for appreciating DNR doorstep repairs in Hyderabad!</p>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" id="reviews-filters">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleFilter(tag)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 border ${
                selectedTag === tag
                  ? "bg-natural-dark-sage text-white border-natural-dark-sage shadow-sm"
                  : "bg-natural-warm-white text-[#6B756B] border-natural-cream hover:bg-natural-sand-light hover:text-natural-dark-sage"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-12" id="reviews-feed">
          {getFilteredReviews().map((review) => (
            <div 
              key={review.id} 
              className="bg-natural-warm-white rounded-3xl border border-natural-cream shadow-sm p-6 sm:p-8 space-y-6 text-left relative overflow-hidden"
              id={`review-card-${review.id}`}
            >
              {/* Reviewer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-natural-cream/50 pb-5" id="review-header-section">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-natural-sand text-natural-brown flex items-center justify-center font-serif text-lg font-bold border border-natural-cream shadow-inner flex-shrink-0">
                    {review.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-natural-dark-sage leading-tight flex items-center gap-2">
                      <span>{review.name}</span>
                      <span className="text-[10px] bg-natural-light-green text-natural-sage font-sans font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Repair
                      </span>
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-[#6B756B] text-xs">
                      <MapPin className="w-3.5 h-3.5 text-natural-sage" />
                      <span>{review.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 flex-shrink-0">
                  <div className="flex text-natural-brown" id="review-stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#6B756B] font-mono mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{review.date}</span>
                  </div>
                </div>

              </div>

              {/* Service & Machine details pill */}
              <div className="flex flex-wrap gap-2 items-center text-xs" id="review-meta-pills">
                <span className="font-mono bg-natural-sand/75 text-natural-dark-sage font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-natural-brown" />
                  <span>{review.serviceType}</span>
                </span>
                <span className="font-sans font-semibold text-[#6B756B] bg-natural-cream/35 border border-natural-cream/40 px-3 py-1 rounded-lg">
                  Appliance: {review.brand}
                </span>
              </div>

              {/* Review Text Body */}
              <p className="text-natural-text text-sm sm:text-base leading-relaxed font-sans font-normal" id="review-feedback-text">
                "{review.feedback}"
              </p>

              {/* Verified Case Study Photo block (Representing the attached pictures before/after) */}
              {review.caseStudy && (
                <div className="bg-[#FAF9F6] border border-natural-cream rounded-2xl p-5 sm:p-6 space-y-4" id={`review-case-${review.id}`}>
                  
                  <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-natural-cream/60">
                    <div className="flex items-center gap-2">
                      <Camera className="w-5 h-5 text-natural-sage" />
                      <h4 className="font-serif font-bold text-sm sm:text-base text-natural-dark-sage">
                        {review.caseStudy.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-natural-brown text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Technical Job Details
                    </span>
                  </div>

                  {/* 2-Column Before / After visual cards with actual side-by-side photos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="case-before-after-grid">
                    
                    {/* Before Card */}
                    <div className="bg-white rounded-2xl p-4 border border-natural-cream relative flex flex-col justify-between hover:border-rose-200 hover:shadow-md transition-all duration-300">
                      <div>
                        {/* Image Container */}
                        <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-3 bg-natural-sand border border-natural-cream/60 relative group flex items-center justify-center">
                          <img 
                            src={review.caseStudy.beforeImageUrl} 
                            alt={review.caseStudy.labelBefore}
                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-[9px] font-mono font-bold text-rose-600 bg-white/95 backdrop-blur-xs border border-rose-200 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                              ❌ Before State
                            </span>
                          </div>
                        </div>

                        <h5 className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider mb-1">
                          {review.caseStudy.labelBefore}
                        </h5>
                        <p className="text-xs text-[#6B756B] leading-relaxed font-sans">
                          {review.caseStudy.beforeText}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-natural-cream/60 flex items-center justify-between text-[10px] font-mono text-[#6B756B]">
                        <span>Diagnostic State</span>
                        <span className="text-rose-600 font-bold">FAULTY &amp; UNUSABLE</span>
                      </div>
                    </div>

                    {/* After Card */}
                    <div className="bg-white rounded-2xl p-4 border-2 border-natural-sage/20 relative flex flex-col justify-between hover:border-natural-sage/50 hover:shadow-md transition-all duration-300 shadow-sm">
                      <div>
                        {/* Image Container */}
                        <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-3 bg-natural-sand border border-natural-sage/25 relative group flex items-center justify-center">
                          <img 
                            src={review.caseStudy.afterImageUrl} 
                            alt={review.caseStudy.labelAfter}
                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-[9px] font-mono font-bold text-natural-sage bg-white/95 backdrop-blur-xs border border-natural-sage/25 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                              ✓ After Restoration
                            </span>
                          </div>
                        </div>

                        <h5 className="text-xs font-mono font-bold text-natural-sage uppercase tracking-wider mb-1">
                          {review.caseStudy.labelAfter}
                        </h5>
                        <p className="text-xs text-[#6B756B] leading-relaxed font-sans">
                          {review.caseStudy.afterText}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-natural-cream/60 flex items-center justify-between text-[10px] font-mono text-[#6B756B]">
                        <span>Restoration State</span>
                        <span className="text-natural-sage font-bold flex items-center gap-0.5">
                          ✓ 100% OPERATIONAL
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Assurance Note */}
                  <div className="pt-2 text-[11px] text-[#6B756B] flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-natural-sage" />
                    <span>All work performed on-site at customer's doorstep with a 90-Day DNR warranty card handed over.</span>
                  </div>

                </div>
              )}

              {/* Tags panel */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-natural-cream/50" id="review-tags">
                {review.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] font-mono bg-natural-sand/35 text-natural-dark-sage font-semibold px-2.5 py-1 rounded-lg border border-natural-cream/35"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* HELPLINE CTA BANNER BELOW REVIEWS */}
        <div className="bg-natural-dark-sage text-natural-bg rounded-3xl p-6 sm:p-10 shadow-md border border-natural-cream/20 mt-16 flex flex-col lg:flex-row justify-between items-center gap-8 text-left" id="reviews-cta">
          <div className="space-y-2">
            <span className="text-natural-brown font-mono text-xs font-bold uppercase tracking-widest block">
              EXPERIENCING THE SAME PROBLEMS?
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FAF9F6] tracking-tight">
              Get Your Washing Machine Restored Today
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF9F6]/85 max-w-xl font-sans leading-relaxed">
              Don't wait for complete mechanical failure. Our nearby mobile van carrying genuine bearings, spider shafts, valves, and gaskets can be at your Hyderabad doorstep in 45 minutes!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto" id="reviews-cta-actions">
            <a
              href={`tel:${DISPLAY_MOBILE_NUMBER.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-natural-brown text-white rounded-2xl font-bold text-sm hover:bg-[#8f6749] transition-colors w-full sm:w-auto cursor-pointer shadow-md"
              id="reviews-cta-call"
            >
              <Wrench className="w-4.5 h-4.5" />
              <span>Call Emergency Repair</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
