export const tenantStatusOptions = ["draft", "active", "paused"] as const;
export type TenantStatus = (typeof tenantStatusOptions)[number];

export const bodyShapeScale = ["narrow", "average", "broad"] as const;
export type BodyShapeScale = (typeof bodyShapeScale)[number];

export const lengthScale = ["short", "average", "long"] as const;
export type LengthScale = (typeof lengthScale)[number];

export const generationStates = ["queued", "processing", "completed", "failed"] as const;
export type GenerationState = (typeof generationStates)[number];

export type ShopperProfile = {
  heightCm: number;
  weightKg: number;
  shoulderWidth: BodyShapeScale;
  torsoLength: LengthScale;
  hipSize: BodyShapeScale;
  bustSize: BodyShapeScale;
  waistToHipRatio: BodyShapeScale;
  legLength: LengthScale;
};

export const demoShopperProfile: ShopperProfile = {
  heightCm: 168,
  weightKg: 58,
  shoulderWidth: "average",
  torsoLength: "average",
  hipSize: "broad",
  bustSize: "average",
  waistToHipRatio: "broad",
  legLength: "long",
};
