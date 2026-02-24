export const WORKFLOWS = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Mobile command center for field sales and distributor calls.",
    icon: "LayoutDashboard",
    fields: [
      { name: "query", label: "Quick Search / Ask Curtis", type: "text", placeholder: "e.g., 'Show stale deals' or 'WUI check California'" },
    ]
  },
  {
    id: "sku_library",
    name: "SKU Library",
    description: "Species → Treatment → Profile → Finish → Length",
    icon: "Library",
    fields: [
      { name: "species", label: "Species", type: "text", placeholder: "e.g., Ayous, Nordic Pine" },
      { name: "profile", label: "Profile", type: "text", placeholder: "e.g., Bevel, Channel" },
      { name: "treatment", label: "Treatment", type: "text", placeholder: "Standard / Thermex-FR" },
    ]
  },
  {
    id: "fire_checker",
    name: "Fire Compliance Checker",
    description: "Logic-driven fire compliance for WUI and regulated zones.",
    icon: "Flame",
    fields: [
      { name: "location", label: "Project Location (State/Province)", type: "text", placeholder: "e.g., California, BC" },
      { name: "isWui", label: "Is it WUI?", type: "text", placeholder: "Yes/No" },
      { name: "exterior", label: "Exterior Use?", type: "text", placeholder: "Yes/No" },
      { name: "rating", label: "Required Rating?", type: "text", placeholder: "Class A / B / None" },
    ]
  },
  {
    id: "deal_capture",
    name: "Deal Capture",
    description: "Enforce pipeline discipline and auto-flag risks.",
    icon: "UserPlus",
    fields: [
      { name: "company", label: "Company", type: "text", placeholder: "e.g., East Coast Lumber" },
      { name: "application", label: "Application", type: "text", placeholder: "e.g., Cladding, Soffit" },
      { name: "stage", label: "Stage", type: "text", placeholder: "Target → Discovery → Sample → Spec → Quote → Commit → Won/Lost" },
      { name: "volume", label: "Estimated LF", type: "text", placeholder: "e.g., 5000 LF" },
      { name: "margin", label: "Target Margin %", type: "text", placeholder: "e.g., 25%" },
    ]
  },
  {
    id: "install_intel",
    name: "Installation Intelligence",
    description: "Quick lookup for fasteners, rainscreen, and acclimation.",
    icon: "Wrench",
    fields: [
      { name: "topic", label: "Topic", type: "text", placeholder: "e.g., Fasteners, Rainscreen, Sealing" },
    ]
  },
  {
    id: "market_intel",
    name: "Import & Market Intel",
    description: "Analyze competitor lane moves and demand hotspots.",
    icon: "Globe",
    fields: [
      { name: "competitor", label: "Competitor", type: "text", placeholder: "e.g., Lunawood, Claymark" },
      { name: "port", label: "Port", type: "text", placeholder: "e.g., Vancouver, Seattle" },
    ]
  },
  {
    id: "objection_handling",
    name: "Objection Handling",
    description: "10s/30s technical responses to common myths.",
    icon: "ShieldAlert",
    fields: [
      { name: "myth", label: "Myth / Objection", type: "text", placeholder: "e.g., 'Wood burns', 'It warps like cedar'" },
    ]
  }
];
