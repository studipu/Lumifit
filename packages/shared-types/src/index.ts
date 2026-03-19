export const tenantStatusOptions = ["draft", "active", "paused"] as const;
export type TenantStatus = (typeof tenantStatusOptions)[number];

export const bodyShapeScale = ["narrow", "average", "broad"] as const;
export type BodyShapeScale = (typeof bodyShapeScale)[number];

export const lengthScale = ["short", "average", "long"] as const;
export type LengthScale = (typeof lengthScale)[number];

export const generationStates = ["queued", "processing", "completed", "failed"] as const;
export type GenerationState = (typeof generationStates)[number];

export const ethnicityOptions = ["korean", "japanese", "chinese", "southeast-asian", "south-asian", "caucasian", "african", "hispanic"] as const;
export type Ethnicity = (typeof ethnicityOptions)[number];

export type ShopperProfile = {
  heightCm: number;
  weightKg: number;
  ethnicity: Ethnicity;
  shoulderWidth: BodyShapeScale;
  torsoLength: LengthScale;
  hipSize: BodyShapeScale;
  bustSize: BodyShapeScale;
  waistToHipRatio: BodyShapeScale;
  legLength: LengthScale;
};

export type Avatar = {
  id: string;
  label: string;
  imageUrl: string;
  bodyShape: ShopperProfile;
};

export type Product = {
  id: string;
  tenantId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  imageUrls: string[];
  sizes: string[];
  fitComparisonEnabled: boolean;
  createdAt: string;
};

export type GenerationJob = {
  id: string;
  productId: string;
  avatarId: string;
  state: GenerationState;
  resultUrl?: string;
  createdAt: string;
  updatedAt: string;
};

export const demoShopperProfile: ShopperProfile = {
  heightCm: 168,
  weightKg: 58,
  ethnicity: "korean",
  shoulderWidth: "average",
  torsoLength: "average",
  hipSize: "broad",
  bustSize: "average",
  waistToHipRatio: "broad",
  legLength: "long",
};
