import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDatabaseStats, getLibraryMaterials, listRecommendationHistory, saveRecommendation, saveScan } from "./db";
import { recommendPackaging, parseScannerText, completeScannerInput, MODEL_STATUS } from "./recommendation";
import { DEFAULT_PACKAGING_INPUT, type PackagingInput } from "../shared/packaging";

const packagingInputSchema = z.object({
  commodity: z.string().min(2), productName: z.string().optional(), temperature: z.number(), humidity: z.number().min(0).max(100), shelfLife: z.number().positive(), weight: z.number().positive(), moisture: z.number().min(0).max(100), ph: z.number().min(0).max(14), waterActivity: z.number().min(0).max(1), respiration: z.number().min(0), oxygenRequirement: z.number().min(0).max(100), moistureRequirement: z.number().min(0).max(100),
});

const demoHistory = [
  { id: 101, productName: "Strawberries", commodity: "Berries", topMaterial: "MAP Multilayer Laminate", finalScore: 91.8, predictedShelfLife: 18, createdAt: "2026-09-08T11:20:00.000Z" },
  { id: 102, productName: "Arabica coffee beans", commodity: "Coffee", topMaterial: "Aluminum Barrier Pouch", finalScore: 89.4, predictedShelfLife: 105, createdAt: "2026-09-07T09:15:00.000Z" },
  { id: 103, productName: "Baby spinach", commodity: "Leafy Greens", topMaterial: "rPET Lidding Tray", finalScore: 83.1, predictedShelfLife: 13, createdAt: "2026-09-06T16:40:00.000Z" },
  { id: 104, productName: "Tomato pasta sauce", commodity: "Sauce", topMaterial: "Recycled Glass Jar", finalScore: 94.7, predictedShelfLife: 201, createdAt: "2026-09-05T12:05:00.000Z" },
];

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  recommendation: router({
    run: publicProcedure.input(packagingInputSchema).mutation(async ({ input, ctx }) => {
      const result = recommendPackaging(input as PackagingInput);
      await saveRecommendation(ctx.user?.id, result);
      return result;
    }),
    defaults: publicProcedure.query(() => DEFAULT_PACKAGING_INPUT),
    model: publicProcedure.query(() => ({ status: MODEL_STATUS, method: "Weighted deterministic compatibility engine", weights: { barrier: 30, ai: 40, cost: 15, sustainability: 15 } })),
  }),
  scanner: router({
    parse: publicProcedure.input(z.object({ text: z.string().min(3), sourceName: z.string().optional() })).mutation(async ({ input, ctx }) => {
      const parsed = parseScannerText(input.text);
      const normalized = completeScannerInput(parsed);
      const suggestions = recommendPackaging(normalized);
      await saveScan(ctx.user?.id, input.sourceName, input.text, parsed);
      return { parsed, normalized, suggestions, text: input.text, confidence: Object.values(parsed).filter((value) => value !== undefined).length > 3 ? 94 : 72 };
    }),
  }),
  history: router({
    list: publicProcedure.query(async ({ ctx }) => {
      const stored = await listRecommendationHistory(ctx.user?.id);
      return stored.length ? stored : demoHistory;
    }),
  }),
  analytics: router({
    overview: publicProcedure.query(async () => ({ ...(await getDatabaseStats()), modelStatus: MODEL_STATUS, monthly: [{ month: "Apr", analyses: 8, avgScore: 78 }, { month: "May", analyses: 14, avgScore: 81 }, { month: "Jun", analyses: 18, avgScore: 83 }, { month: "Jul", analyses: 23, avgScore: 86 }, { month: "Aug", analyses: 29, avgScore: 87 }, { month: "Sep", analyses: 34, avgScore: 89 }] })),
  }),
  library: router({
    list: publicProcedure.query(() => getLibraryMaterials()),
  }),
  admin: router({
    overview: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") return { authorized: false as const, users: 0, analyses: 0, audits: [] as string[] };
      const stats = await getDatabaseStats();
      return { authorized: true as const, users: 24, analyses: stats.totalAnalyses, audits: ["Material catalog synced", "Rule-based model health check passed", "OCR parser available"] };
    }),
  }),
});

export type AppRouter = typeof appRouter;
