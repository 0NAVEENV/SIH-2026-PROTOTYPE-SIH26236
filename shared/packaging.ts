export type PackagingInput = {
  commodity: string;
  productName?: string;
  temperature: number;
  humidity: number;
  shelfLife: number;
  weight: number;
  moisture: number;
  ph: number;
  waterActivity: number;
  respiration: number;
  oxygenRequirement: number;
  moistureRequirement: number;
};

export type MaterialProfile = {
  id: string;
  name: string;
  shortName: string;
  category: string;
  finish: string;
  oxygenBarrier: number;
  moistureBarrier: number;
  temperatureMin: number;
  temperatureMax: number;
  costPerUnit: number;
  sustainability: number;
  baseShelfLife: number;
  commodities: string[];
  color: string;
};

export type MaterialScore = {
  material: MaterialProfile;
  barrierFit: number;
  aiSuitability: number;
  costScore: number;
  sustainabilityScore: number;
  finalScore: number;
  predictedShelfLife: number;
  spoilageRisk: number;
  reason: string;
  strengths: string[];
  caution: string;
};

export type RecommendationResult = {
  input: PackagingInput;
  recommendations: MaterialScore[];
  generatedAt: number;
  modelStatus: "ACTIVE" | "RULE-BASED FALLBACK";
  confidence: number;
};

export type HistoryItem = {
  id: number;
  commodity: string;
  productName?: string;
  topMaterial: string;
  finalScore: number;
  predictedShelfLife: number;
  createdAt: string;
};

export const MATERIAL_CATALOG: MaterialProfile[] = [
  {
    id: "map-laminate",
    name: "MAP Multilayer Laminate",
    shortName: "MAP laminate",
    category: "Flexible barrier",
    finish: "PET / EVOH / PE",
    oxygenBarrier: 96,
    moistureBarrier: 94,
    temperatureMin: -20,
    temperatureMax: 70,
    costPerUnit: 0.18,
    sustainability: 61,
    baseShelfLife: 28,
    commodities: ["berries", "leafy greens", "meat", "cheese", "bakery", "fresh produce"],
    color: "#6c63ff",
  },
  {
    id: "glass-jar",
    name: "Recycled Glass Jar",
    shortName: "Recycled glass",
    category: "Rigid primary",
    finish: "Amber / clear glass",
    oxygenBarrier: 100,
    moistureBarrier: 100,
    temperatureMin: -40,
    temperatureMax: 220,
    costPerUnit: 0.42,
    sustainability: 88,
    baseShelfLife: 180,
    commodities: ["sauce", "jam", "pickles", "beverages", "spreads", "cheese"],
    color: "#16a394",
  },
  {
    id: "aluminum-pouch",
    name: "Aluminum Barrier Pouch",
    shortName: "Aluminum pouch",
    category: "Flexible barrier",
    finish: "AL / PET / PE",
    oxygenBarrier: 99,
    moistureBarrier: 99,
    temperatureMin: -30,
    temperatureMax: 110,
    costPerUnit: 0.23,
    sustainability: 70,
    baseShelfLife: 120,
    commodities: ["coffee", "snacks", "spices", "grains", "pet food", "powders"],
    color: "#f59e0b",
  },
  {
    id: "pp-tub",
    name: "Rigid PP Reuse-Ready Tub",
    shortName: "PP tub",
    category: "Rigid primary",
    finish: "Injection-molded PP",
    oxygenBarrier: 54,
    moistureBarrier: 73,
    temperatureMin: -20,
    temperatureMax: 120,
    costPerUnit: 0.16,
    sustainability: 76,
    baseShelfLife: 18,
    commodities: ["dairy", "sauce", "salad", "fresh produce", "meal prep", "spreads"],
    color: "#2e90fa",
  },
  {
    id: "rpet-tray",
    name: "rPET Lidding Tray",
    shortName: "rPET tray",
    category: "Rigid primary",
    finish: "Recycled PET / lidding",
    oxygenBarrier: 64,
    moistureBarrier: 79,
    temperatureMin: -40,
    temperatureMax: 70,
    costPerUnit: 0.19,
    sustainability: 82,
    baseShelfLife: 12,
    commodities: ["berries", "leafy greens", "fresh produce", "bakery", "meat", "meal prep"],
    color: "#db6b41",
  },
  {
    id: "pla-film",
    name: "Home-Compostable PLA Film",
    shortName: "PLA film",
    category: "Compostable flexible",
    finish: "Bio-based PLA",
    oxygenBarrier: 47,
    moistureBarrier: 42,
    temperatureMin: -10,
    temperatureMax: 55,
    costPerUnit: 0.25,
    sustainability: 93,
    baseShelfLife: 9,
    commodities: ["bakery", "dry snacks", "leafy greens", "fresh produce"],
    color: "#65a30d",
  },
  {
    id: "ldpe-film",
    name: "LDPE Produce Film",
    shortName: "LDPE film",
    category: "Flexible film",
    finish: "Low-density PE",
    oxygenBarrier: 34,
    moistureBarrier: 70,
    temperatureMin: -40,
    temperatureMax: 80,
    costPerUnit: 0.08,
    sustainability: 45,
    baseShelfLife: 7,
    commodities: ["leafy greens", "fresh produce", "bakery", "meat"],
    color: "#9ca3af",
  },
  {
    id: "corrugated-liner",
    name: "Corrugated Fiberboard + Liner",
    shortName: "Fiberboard liner",
    category: "Secondary pack",
    finish: "Recycled kraft / PE liner",
    oxygenBarrier: 22,
    moistureBarrier: 38,
    temperatureMin: -10,
    temperatureMax: 50,
    costPerUnit: 0.12,
    sustainability: 91,
    baseShelfLife: 10,
    commodities: ["bakery", "dry snacks", "grains", "fresh produce", "meal prep"],
    color: "#b07a43",
  },
];

export const COMMODITY_OPTIONS = [
  "Berries",
  "Leafy greens",
  "Fresh produce",
  "Meat",
  "Dairy",
  "Cheese",
  "Bakery",
  "Sauce",
  "Coffee",
  "Dry snacks",
  "Spices",
  "Grains",
  "Beverages",
];

export const DEFAULT_PACKAGING_INPUT: PackagingInput = {
  commodity: "Berries",
  temperature: 4,
  humidity: 88,
  shelfLife: 14,
  weight: 250,
  moisture: 89,
  ph: 3.5,
  waterActivity: 0.97,
  respiration: 72,
  oxygenRequirement: 12,
  moistureRequirement: 8,
};
