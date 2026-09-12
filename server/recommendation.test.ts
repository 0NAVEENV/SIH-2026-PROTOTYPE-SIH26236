import { describe, expect, it } from "vitest";
import { DEFAULT_PACKAGING_INPUT } from "../shared/packaging";
import { completeScannerInput, parseScannerText, recommendPackaging } from "./recommendation";

describe("Packwise recommendation engine", () => {
  it("returns deterministic ranked material results", () => {
    const first = recommendPackaging(DEFAULT_PACKAGING_INPUT);
    const second = recommendPackaging(DEFAULT_PACKAGING_INPUT);
    expect(first.recommendations.map((item) => item.material.id)).toEqual(second.recommendations.map((item) => item.material.id));
    expect(first.recommendations[0].finalScore).toBeGreaterThan(first.recommendations[1].finalScore);
    expect(first.modelStatus).toBe("RULE-BASED FALLBACK");
  });

  it("applies the documented weighted score formula", () => {
    const result = recommendPackaging(DEFAULT_PACKAGING_INPUT);
    const top = result.recommendations[0];
    const expected = top.barrierFit * 0.3 + top.aiSuitability * 0.4 + top.costScore * 0.15 + top.sustainabilityScore * 0.15;
    expect(top.finalScore).toBeCloseTo(expected, 1);
    expect(top.predictedShelfLife).toBeGreaterThan(0);
    expect(top.spoilageRisk).toBeGreaterThanOrEqual(0);
    expect(top.spoilageRisk).toBeLessThanOrEqual(100);
  });

  it("normalizes scanner text into packaging inputs", () => {
    const parsed = parseScannerText("PRODUCT: Strawberries TEMP: 4°C RH: 88% RH SHELF LIFE: 14 days WEIGHT: 250g pH: 3.5 AW: 0.97");
    expect(parsed.commodity).toBe("Berries");
    expect(parsed.temperature).toBe(4);
    expect(parsed.humidity).toBe(88);
    expect(parsed.shelfLife).toBe(14);
    expect(parsed.weight).toBe(250);
    expect(parsed.ph).toBe(3.5);
    expect(parsed.waterActivity).toBe(0.97);
  });

  it("fills missing scanner values with transparent category baselines", () => {
    const normalized = completeScannerInput({ commodity: "Berries", temperature: 4 });
    expect(normalized.commodity).toBe("Berries");
    expect(normalized.temperature).toBe(4);
    expect(normalized.shelfLife).toBe(7);
    expect(recommendPackaging(normalized).recommendations.length).toBeGreaterThan(0);
  });
});
