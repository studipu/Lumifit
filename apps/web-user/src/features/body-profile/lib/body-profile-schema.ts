import { z } from "zod";

export const bodyProfileSchema = z.object({
  heightCm: z.number().min(100, "100cm 이상이어야 합니다").max(220, "220cm 이하여야 합니다"),
  weightKg: z.number().min(30, "30kg 이상이어야 합니다").max(200, "200kg 이하여야 합니다"),
  shoulderWidth: z.enum(["narrow", "average", "broad"]),
  torsoLength: z.enum(["short", "average", "long"]),
  hipSize: z.enum(["narrow", "average", "broad"]),
  bustSize: z.enum(["narrow", "average", "broad"]),
  waistToHipRatio: z.enum(["narrow", "average", "broad"]),
  legLength: z.enum(["short", "average", "long"]),
});

export type BodyProfileFormData = z.infer<typeof bodyProfileSchema>;
