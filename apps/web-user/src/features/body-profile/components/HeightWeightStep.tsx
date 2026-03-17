"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type HeightWeightStepProps = {
  heightCm: number;
  weightKg: number;
  onChange: (field: "heightCm" | "weightKg", value: number) => void;
};

export function HeightWeightStep({ heightCm, weightKg, onChange }: HeightWeightStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">기본 신체 정보</h2>
        <p className="mt-1 text-sm text-muted-foreground">키와 몸무게를 입력해주세요</p>
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
    </div>
  );
}
