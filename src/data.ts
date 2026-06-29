import { ServiceDetail, WashingMachineType } from "./types";

export const MOBILE_NUMBER = "+91 99896 83276";
export const DISPLAY_MOBILE_NUMBER = "+91 99896 83276";
export const ALTERNATE_MOBILE_NUMBER = "+91 99896 83276";

export const HYDERABAD_AREAS = [
  "Old Bowenpally",
  "Madhapur",
  "Gachibowli",
  "Kukatpally",
  "Kondapur",
  "Jubilee Hills",
  "Banjara Hills",
  "Begumpet",
  "Miyapur",
  "Secunderabad",
  "Ameerpet",
  "Dilsukhnagar",
  "LB Nagar",
  "Hitech City",
  "Manikonda",
  "Nallagandla",
  "Tolichowki",
];

export const BRANDS_SERVED = [
  "LG",
  "Samsung",
  "Whirlpool",
  "Bosch",
  "IFB",
  "Godrej",
  "Haier",
  "Panasonic",
  "Maytag",
  "Lloyd",
];

export const WASHING_MACHINE_TYPES: WashingMachineType[] = [
  {
    id: "top-load",
    name: "Top Loading Washing Machines",
    description:
      "Top-loading washing machines are popular for their ergonomic design, allowing you to load clothes without bending down. They use either an agitator or an impeller to wash fabrics. Impeller models are more water-efficient, while agitator models provide deep, vigorous scrubbing.",
    keyFeatures: [
      "Ergonomic loading height",
      "Ability to add clothes mid-cycle",
      "Faster wash cycles",
      "Budget-friendly purchase options",
    ],
    commonProblems: [
      "Unbalanced drum causing excessive vibrations",
      "Agitator not spinning or slipping",
      "Water drainage failures",
      "Inlet valve clogging or slow filling",
    ],
    imageUrl: "/images/top_load.svg",
  },
  {
    id: "front-load",
    name: "Front Loading Washing Machines",
    description:
      "Front-loading washing machines are highly energy-efficient and water-saving. They tumble clothes gently using gravity rather than an agitator, making them perfect for delicate fabrics. They offer high spin speeds, which extracts more water and significantly reduces drying times.",
    keyFeatures: [
      "Superior water and energy efficiency",
      "Gentlest care for premium fabrics",
      "High spin speeds (up to 1400 RPM)",
      "Stackable design for space saving",
    ],
    commonProblems: [
      "Foul mildew odor from the rubber door gasket",
      "Water leaks around the front door seal",
      "Drum suspension or shock absorber failure",
      "Door lock sensor errors preventing cycles",
    ],
    imageUrl: "/images/front_load.svg",
  },
  {
    id: "semi-auto",
    name: "Semi-Automated Washing Machines",
    description:
      "Semi-automated washing machines feature a classic dual-tub design: one tub for washing and another separate tub for spin-drying. These systems are highly cost-effective, consume very little water, allow manual control over wash times, and can function perfectly without continuous water pressure.",
    keyFeatures: [
      "No constant running water connection required",
      "Highly affordable and low maintenance",
      "Extremely robust mechanical design",
      "Fast wash and separate spin operations",
    ],
    commonProblems: [
      "Spin tub motor not spinning or spinning slowly",
      "Broken wash timer or selector dial",
      "Damaged wash motor belt",
      "Lint filter tearing and clogging the drain pipe",
    ],
    imageUrl: "/images/semi_auto.svg",
  },
  {
    id: "fully-auto",
    name: "Fully-Automated Washing Machines",
    description:
      "Fully-automated machines manage the entire wash, rinse, and spin cycle automatically based on intelligent sensor feedback. They optimize water levels, detergent dispersion, and tumbling programs, giving you a completely hands-off laundry experience with maximum precision.",
    keyFeatures: [
      "Single-tub continuous smart cycle",
      "Fuzzy logic automatic load detection",
      "Advanced delay-timers and digital control panels",
      "Custom specialized settings for babywear, woolens, and express washing",
    ],
    commonProblems: [
      "Motherboard (PCB) power or functional failure",
      "Pressure sensor issues causing overfilling or dry running",
      "Water inlet valve solenoid burnout",
      "Digital display displaying error codes (e.g., dE, OE, PE)",
    ],
    imageUrl: "/images/fully_auto.svg",
  },
];

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "top-loading",
    title: "Top Loading Washing Machine Repair",
    shortDesc: "Comprehensive repair for agitator/impeller issues, balance problems, and fill faults in top load machines.",
    fullDesc:
      "DNR Smart Service specializes in professional doorstep repair for all brands of Top Loading washing machines. Our expert technicians carry high-grade spare parts to fix water supply issues, balance-ring failures, faulty inlet valves, and worn-out agitator drive dogs on their first visit.",
    commonIssues: [
      "Washing machine vibrates aggressively and moves across the room",
      "Agitator is not spinning while the motor runs",
      "Water fills slowly or does not stop filling",
      "Drain pump is clogged and leaves clothes soaking wet",
    ],
    solutions: [
      "Suspension rod set replacement and calibration",
      "Drive coupler, belt, or clutch pulley replacement",
      "Water inlet solenoid valve cleaning or replacement",
      "Drain pump assembly motor cleaning or replacement",
    ],
    repairTime: "45 - 90 Minutes",
    priceEstimate: "Free inspection upon repair",
    imageUrl: "/images/top_load_repair.svg",
  },
  {
    id: "front-loading",
    title: "Front Load Washing Machine Repair",
    shortDesc: "Expert solutions for rubber gasket leaks, drum bearing noises, and lock assembly failures.",
    fullDesc:
      "Front-load washing machines require highly precise care due to their specialized shock absorbers, electronic door lock systems, and heavy internal counter-weights. DNR Smart Service provides skilled mechanics equipped with specialized diagnostic tools to handle high-end brand mechanics.",
    commonIssues: [
      "Water leaks continuously from the front rubber door bellows/gasket",
      "Door refuses to lock or open, displaying error symbols (e.g., dE, dL)",
      "Loud metallic roaring noise during the high-speed spin cycle",
      "Soap dispenser drawer clogged with stale powder",
    ],
    solutions: [
      "Premium rubber bellows/door gasket replacement",
      "Electronic door lock switch and interlock latch replacement",
      "Heavy-duty drum bearing and tub seal replacement",
      "Inlet water hose manifold and detergent tray servicing",
    ],
    repairTime: "60 - 120 Minutes",
    priceEstimate: "Genuine OEM spares used",
    imageUrl: "/images/front_load_repair.svg",
  },
  {
    id: "semi-automated",
    title: "Semi-Automated Washing Machine Repair",
    shortDesc: "Fast fix for wash/spin motor burnouts, damaged belts, and timer dial malfunctions.",
    fullDesc:
      "Dual-tub semi-automatic washers are highly reliable, but belt wear, water leakage from the wash tub to the spin motor, and selector wear can cause sudden breakdowns. We offer reliable, low-cost maintenance to restore both washing and drying features quickly.",
    commonIssues: [
      "Spin dryer tub completely dead or makes a humming sound but won't turn",
      "Wash pulsator rotates in only one direction instead of reversing",
      "Water leaks from the bottom of the machine directly onto the motor",
      "Mechanical timer knob is jammed or spins freely without ticking",
    ],
    solutions: [
      "Spin motor, buffer seal, and brake assembly replacement",
      "Dual-gearbox replacement or pulsator belt tension adjustment",
      "Water drain valve bellows and seal ring cleaning/replacement",
      "Wash/Spin heavy-duty mechanical timer dial replacement",
    ],
    repairTime: "30 - 60 Minutes",
    priceEstimate: "Pocket-friendly rates",
    imageUrl: "/images/semi_auto_repair.svg",
  },
  {
    id: "fully-automated",
    title: "Fully-Automated Washing Machine Repair",
    shortDesc: "Complete smart diagnostic and electronic motherboard (PCB) repairs for advanced single-tub washers.",
    fullDesc:
      "A fully-automated machine relies on an integrated electronic circuit board (motherboard) and precise pressure sensors. Our advanced diagnostics quickly locate the exact sensor, relay, or solenoid causing problems, offering durable board-level micro-soldering and sensor upgrades.",
    commonIssues: [
      "Washing machine turns on but the display flashes random letters and stays stuck",
      "Water levels are miscalculated, leading to overfilling or dry running",
      "The washing machine does not switch from wash mode to spin/dry mode",
      "Sudden short-circuits blowing up house circuit breakers when turned on",
    ],
    solutions: [
      "Motherboard (PCB) repairing or brand-new chip replacement",
      "Electronic pressure sensor and air dome pipe replacement",
      "Automatic drainage actuator solenoid installation",
      "Electrical wiring harness repair and earthing checks",
    ],
    repairTime: "60 - 120 Minutes",
    priceEstimate: "Complete computer diagnostics",
    imageUrl: "/images/fully_auto_repair.svg",
  },
  {
    id: "loud-noise",
    title: "Washer is Making Loud Noise Repair",
    shortDesc: "Eliminate roaring, grinding, squeaking, and banging noises during wash and spin cycles.",
    fullDesc:
      "A noisy washing machine is a critical warning sign. Ignoring grinding sounds or loud vibrations can cause irreversible damage to the drum and motor shaft. DNR Smart Service can quickly quiet down your laundry room by addressing bearing wear and loose counterweights.",
    commonIssues: [
      "Grinding metallic noise during drum rotation",
      "Thumping or banging sounds, even with light clothing loads",
      "High-pitched whistling or squealing during the spin cycle",
      "Rattling sound suggesting loose debris or coins stuck in the tub",
    ],
    solutions: [
      "High-durability inner drum bearing and oil seal replacement",
      "Suspension shocks, tension springs, and damper replacement",
      "Drive motor pulley tightening or drive belt replacement",
      "Foreign object extraction from the drain pump filter and outer tub",
    ],
    repairTime: "45 - 90 Minutes",
    priceEstimate: "Preventative checkup included",
    imageUrl: "/images/loud_noise.svg",
  },
  {
    id: "does-not-run",
    title: "Washing Machine Does Not Run Repair",
    shortDesc: "Fixing power supply faults, tripped relays, door locks, and engine starting failures.",
    fullDesc:
      "If your washing machine is completely unresponsive or refuses to start a cycle after you press start, the culprit is typically a failed fuse, a faulty main power relay, a broken door safety interlock, or motor capacitor burnout. We diagnose and fix power flows safely.",
    commonIssues: [
      "Washing machine display is completely black with no power indicator lights",
      "Power indicator turns on but the start button produces no motor response",
      "Machine starts humming but the drum fails to rotate or agitate",
      "Sudden power shut-off immediately after the cycle starts",
    ],
    solutions: [
      "Main power cord, fuse box, and thermal fuse replacement",
      "Capacitor check and wash motor carbon brush replacement",
      "Door lock striker, hook, and micro-switch replacement",
      "Internal wiring terminal polishing and power supply repair",
    ],
    repairTime: "30 - 75 Minutes",
    priceEstimate: "Safety inspection included",
    imageUrl: "/images/not_running.svg",
  },
];
