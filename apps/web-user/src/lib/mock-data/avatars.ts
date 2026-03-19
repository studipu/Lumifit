import type { Avatar, ShopperProfile, BodyShapeScale, LengthScale } from "@lumifit/shared-types";

const shapeVariants: BodyShapeScale[] = ["narrow", "average", "broad"];
const lengthVariants: LengthScale[] = ["short", "average", "long"];

function shiftShape(base: BodyShapeScale, offset: number): BodyShapeScale {
  const idx = shapeVariants.indexOf(base);
  return shapeVariants[Math.max(0, Math.min(2, idx + offset))] ?? base;
}

function shiftLength(base: LengthScale, offset: number): LengthScale {
  const idx = lengthVariants.indexOf(base);
  return lengthVariants[Math.max(0, Math.min(2, idx + offset))] ?? base;
}

function generateVariant(
  base: ShopperProfile,
  id: string,
  label: string,
  heightDelta: number,
  weightDelta: number,
  shapeOffset: number,
): Avatar {
  return {
    id,
    label,
    imageUrl: `/avatars/${id}.svg`,
    bodyShape: {
      heightCm: base.heightCm + heightDelta,
      weightKg: base.weightKg + weightDelta,
      ethnicity: base.ethnicity,
      shoulderWidth: shiftShape(base.shoulderWidth, shapeOffset),
      torsoLength: shiftLength(base.torsoLength, shapeOffset),
      hipSize: shiftShape(base.hipSize, shapeOffset),
      bustSize: shiftShape(base.bustSize, shapeOffset),
      waistToHipRatio: shiftShape(base.waistToHipRatio, shapeOffset),
      legLength: shiftLength(base.legLength, shapeOffset),
    },
  };
}

export function getMockAvatars(profile?: ShopperProfile | null): Promise<Avatar[]> {
  const base: ShopperProfile = profile ?? {
    heightCm: 165,
    weightKg: 58,
    ethnicity: "korean",
    shoulderWidth: "average",
    torsoLength: "average",
    hipSize: "average",
    bustSize: "average",
    waistToHipRatio: "average",
    legLength: "average",
  };

  const avatars: Avatar[] = [
    generateVariant(base, "avatar-1", "슬림한 체형", -2, -4, -1),
    generateVariant(base, "avatar-2", "나와 비슷한 체형", 0, 0, 0),
    generateVariant(base, "avatar-3", "풍성한 체형", 1, 4, 1),
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(avatars), 500);
  });
}
