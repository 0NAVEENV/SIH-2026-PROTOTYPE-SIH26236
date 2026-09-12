import {
  MATERIAL_CATALOG,
  type MaterialProfile,
  type MaterialScore,
  type PackagingInput,
  type RecommendationResult,
} from "../shared/packaging";

export const MODEL_STATUS: RecommendationResult["modelStatus"] = "RULE-BASED FALLBACK";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, value));
const round = (value: number, decimals = 1) => Number(value.toFixed(decimals));

function commodityMatch(material: MaterialProfile, commodity: string) {
  const normalized = commodity.trim().toLowerCase();
  if (material.commodities.includes(normalized)) return 100;
  if (material.commodities.some((item) => normalized.includes(item) || item.includes(normalized))) return 88;
  if (["snacks", "grains", "powders"].some((item) => normalized.includes(item)) && material.category.includes("Flexible")) return 72;
  return 48;
}

function barrierFit(material: MaterialProfile, input: PackagingInput) {
  const oxygenNeed = clamp(input.oxygenRequirement);
  const moistureNeed = clamp(input.moistureRequirement);
  const oxygen = material.oxygenBarrier * (oxygenNeed / 100);
  const moisture = material.moistureBarrier * (moistureNeed / 100);
  const humidityPressure = input.humidity > 75 ? material.moistureBarrier * 0.12 : 0;
  const tempFit = input.temperature >= material.temperatureMin && input.temperature <= material.temperatureMax ? 100 : 42;
  return clamp(oxygen * 0.42 + (moisture + humidityPressure) * 0.38 + tempFit * 0.2);
}

function scoreMaterial(material: MaterialProfile, input: PackagingInput): MaterialScore {
  const barrier = barrierFit(material, input);
  const commodity = commodityMatch(material, input.commodity);
  const moistureFit = input.moisture > 75 ? material.moistureBarrier : 100 - Math.abs(material.moistureBarrier - input.moisture) * 0.5;
  const respirationFit = input.respiration > 55 && material.category.includes("Flexible") ? 92 : input.respiration > 55 ? 70 : 84;
  const awFit = input.waterActivity > 0.9 ? material.moistureBarrier : 78;
  const aiSuitability = clamp(commodity * 0.42 + moistureFit * 0.22 + respirationFit * 0.18 + awFit * 0.18);
  const costScore = clamp(100 - Math.max(0, material.costPerUnit - 0.05) * 215);
  const sustainabilityScore = material.sustainability;
  const finalScore = clamp(barrier * 0.3 + aiSuitability * 0.4 + costScore * 0.15 + sustainabilityScore * 0.15);
  const shelfPressure = input.shelfLife / Math.max(material.baseShelfLife, 1);
  const preservationMultiplier = 0.58 + barrier / 220 + aiSuitability / 450;
  const predictedShelfLife = round(Math.max(2, material.baseShelfLife * preservationMultiplier * (shelfPressure > 1 ? 0.94 : 1)));
  const spoilageRisk = round(clamp(100 - (barrier * 0.46 + aiSuitability * 0.36 + Math.min(predictedShelfLife / Math.max(input.shelfLife, 1), 2) * 18)));
  const strengths = [
    barrier >= 85 ? "Strong oxygen and moisture barrier" : barrier >= 68 ? "Balanced barrier performance" : "Lightweight barrier profile",
    commodity >= 88 ? `Validated for ${input.commodity.toLowerCase()}` : "Flexible across commodity types",
    sustainabilityScore >= 85 ? "High circularity / compostability signal" : costScore >= 75 ? "Cost-efficient at unit scale" : "Production-ready format",
  ];
  const caution = spoilageRisk > 36 ? "Consider chilled distribution and tighter lot rotation." : predictedShelfLife < input.shelfLife ? "Targeted shelf life may require MAP or an upgraded barrier layer." : "No major compatibility flags for the supplied conditions.";
  const reason = `${material.name} ranks ${finalScore >= 80 ? "highest" : "competitively"} for ${input.productName || input.commodity} because it pairs ${Math.round(barrier)}% barrier fit with ${Math.round(aiSuitability)}% commodity suitability. The ${input.temperature}°C / ${input.humidity}% RH scenario ${predictedShelfLife >= input.shelfLife ? "is supported within the requested shelf-life window" : "needs additional preservation controls to reach the requested shelf life"}.`;
  return {
    material,
    barrierFit: round(barrier),
    aiSuitability: round(aiSuitability),
    costScore: round(costScore),
    sustainabilityScore: round(sustainabilityScore),
    finalScore: round(finalScore),
    predictedShelfLife,
    spoilageRisk,
    reason,
    strengths,
    caution,
  };
}

export function recommendPackaging(input: PackagingInput): RecommendationResult {
  const recommendations = MATERIAL_CATALOG.map((material) => scoreMaterial(material, input)).sort((a, b) => b.finalScore - a.finalScore);
  const spread = recommendations[0].finalScore - recommendations[1].finalScore;
  const confidence = round(clamp(72 + spread * 0.9 + recommendations[0].barrierFit * 0.08));
  return { input, recommendations, generatedAt: Date.now(), modelStatus: MODEL_STATUS, confidence };
}

export function parseScannerText(text: string): Partial<PackagingInput> {
  const source = text.toLowerCase();
  const read = (patterns: RegExp[]) => {
    for (const pattern of patterns) {
      const match = source.match(pattern);
      if (match?.[1]) return Number(match[1]);
    }
    return undefined;
  };
  const productMatch = text.match(/(?:product|item|name)\s*[:=]\s*([^\n,;]+)/i);
  const productName = productMatch?.[1]?.trim().replace(/\s+/g, " ");
  const commodity = ["berries", "leafy greens", "meat", "cheese", "bakery", "coffee", "sauce", "fresh produce"].find((item) => source.includes(item)) || productName?.toLowerCase().split(/\s+/).find((word) => ["strawberries", "blueberries", "coffee", "cheese", "sauce", "meat", "bakery"].includes(word));
  return {
    commodity: commodity ? commodity.replace(/\b\w/g, (letter) => letter.toUpperCase()) : undefined,
    productName,
    temperature: read([/(?:temp|temperature)\s*[:=]?\s*(-?\d+(?:\.\d+)?)/, /(-?\d+(?:\.\d+)?)\s*°?c/]),
    humidity: read([/(?:rh|humidity)\s*[:=]?\s*(\d+(?:\.\d+)?)/, /(\d+(?:\.\d+)?)\s*%\s*rh/]),
    shelfLife: read([/(?:shelf\s*life|life)\s*[:=]?\s*(\d+(?:\.\d+)?)/, /(\d+(?:\.\d+)?)\s*days?/]),
    weight: read([/(?:weight|net)\s*[:=]?\s*(\d+(?:\.\d+)?)\s*g/]),
    moisture: read([/(?:moisture)\s*[:=]?\s*(\d+(?:\.\d+)?)/]),
    ph: read([/(?:ph)\s*[:=]?\s*(\d+(?:\.\d+)?)/]),
    waterActivity: read([/(?:aw|water\s*activity)\s*[:=]?\s*(0?\.\d+|\d+(?:\.\d+)?)/]),
    respiration: read([/(?:respiration)\s*[:=]?\s*(\d+(?:\.\d+)?)/]),
    oxygenRequirement: read([/(?:oxygen|otr)\s*[:=]?\s*(\d+(?:\.\d+)?)/]),
    moistureRequirement: read([/(?:wvtr|water\s*vapor|moisture\s*barrier)\s*[:=]?\s*(\d+(?:\.\d+)?)/]),
  };
}

export function completeScannerInput(parsed: Partial<PackagingInput>): PackagingInput {
  const commodity = parsed.commodity || "Fresh produce";
  const productName = parsed.productName || commodity;
  const defaults: PackagingInput = {
    commodity,
    productName,
    temperature: 4,
    humidity: 75,
    shelfLife: 7,
    weight: 250,
    moisture: 60,
    ph: 5,
    waterActivity: 0.95,
    respiration: 35,
    oxygenRequirement: 55,
    moistureRequirement: 55,
  };
  return {
    commodity,
    productName,
    temperature: parsed.temperature ?? defaults.temperature,
    humidity: parsed.humidity ?? defaults.humidity,
    shelfLife: parsed.shelfLife ?? defaults.shelfLife,
    weight: parsed.weight ?? defaults.weight,
    moisture: parsed.moisture ?? defaults.moisture,
    ph: parsed.ph ?? defaults.ph,
    waterActivity: parsed.waterActivity ?? defaults.waterActivity,
    respiration: parsed.respiration ?? defaults.respiration,
    oxygenRequirement: parsed.oxygenRequirement ?? defaults.oxygenRequirement,
    moistureRequirement: parsed.moistureRequirement ?? defaults.moistureRequirement,
  };
}
