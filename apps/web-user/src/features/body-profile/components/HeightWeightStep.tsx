"use client";

import type { Ethnicity } from "@lumifit/shared-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ethnicityOptions: { value: Ethnicity; label: string }[] = [
  { value: "korean", label: "한국" },
  { value: "japanese", label: "일본" },
  { value: "chinese", label: "중국" },
  { value: "southeast-asian", label: "동남아시아" },
  { value: "south-asian", label: "남아시아" },
  { value: "caucasian", label: "서양" },
  { value: "african", label: "아프리카" },
  { value: "hispanic", label: "히스패닉" },
];

type HeightWeightStepProps = {
  heightCm: number;
  weightKg: number;
  ethnicity: Ethnicity;
  onChange: (field: "heightCm" | "weightKg" | "ethnicity", value: number | string) => void;
};

export function HeightWeightStep({ heightCm, weightKg, ethnicity, onChange }: HeightWeightStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">기본 신체 정보</h2>
        <p className="mt-1 text-sm text-muted-foreground">키, 몸무게, 국적을 입력해주세요</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">키 (cm)</Label>
          <Input
            id="height"
            type="number"
            min={100}
            max={220}
            placeholder="168"
            value={heightCm || ""}
            onChange={(e) => onChange("heightCm", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">몸무게 (kg)</Label>
          <Input
            id="weight"
            type="number"
            min={30}
            max={200}
            placeholder="58"
            value={weightKg || ""}
            onChange={(e) => onChange("weightKg", Number(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>국적</Label>
        <div className="flex flex-wrap gap-2">
          {ethnicityOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange("ethnicity", opt.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                ethnicity === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
