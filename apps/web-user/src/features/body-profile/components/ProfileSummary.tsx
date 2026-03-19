"use client";

import type { ShopperProfile } from "@lumifit/shared-types";

type ProfileSummaryProps = {
  profile: ShopperProfile;
};

const labelMap: Record<string, string> = {
  heightCm: "키",
  weightKg: "몸무게",
  ethnicity: "국적",
  shoulderWidth: "어깨 너비",
  torsoLength: "상체 길이",
  hipSize: "골반 너비",
  bustSize: "가슴 볼륨",
  waistToHipRatio: "허리-골반 비율",
  legLength: "다리 길이",
};

const valueMap: Record<string, string> = {
  narrow: "좁은",
  average: "보통",
  broad: "넓은",
  short: "짧은",
  long: "긴",
  korean: "한국",
  japanese: "일본",
  chinese: "중국",
  "southeast-asian": "동남아시아",
  "south-asian": "남아시아",
  caucasian: "서양",
  african: "아프리카",
  hispanic: "히스패닉",
};

function formatValue(key: string, value: string | number): string {
  if (key === "heightCm") return `${value}cm`;
  if (key === "weightKg") return `${value}kg`;
  return valueMap[value as string] ?? String(value);
}

export function ProfileSummary({ profile }: ProfileSummaryProps) {
  const entries = Object.entries(profile) as [string, string | number][];
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">프로필 확인</h2>
        <p className="mt-1 text-sm text-muted-foreground">입력한 정보를 확인해주세요</p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <dl className="grid grid-cols-2 gap-3">
          {entries.map(([key, value]) => (
            <div key={key} className="space-y-0.5">
              <dt className="text-xs text-muted-foreground">{labelMap[key] ?? key}</dt>
              <dd className="text-sm font-medium">{formatValue(key, value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
