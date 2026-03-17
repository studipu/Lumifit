"use client";

import type { BodyShapeScale, LengthScale } from "@lumifit/shared-types";
import { BodyShapeAttributeSelector } from "./BodyShapeAttributeSelector";

type BodyShapeValues = {
  shoulderWidth: BodyShapeScale;
  torsoLength: LengthScale;
  hipSize: BodyShapeScale;
  bustSize: BodyShapeScale;
  waistToHipRatio: BodyShapeScale;
  legLength: LengthScale;
};

type BodyShapeStepProps = {
  values: BodyShapeValues;
  onChange: (field: keyof BodyShapeValues, value: string) => void;
};

const shapeOptions = [
  { value: "narrow", label: "좁은" },
  { value: "average", label: "보통" },
  { value: "broad", label: "넓은" },
];

const lengthOptions = [
  { value: "short", label: "짧은" },
  { value: "average", label: "보통" },
  { value: "long", label: "긴" },
];

const attributes = [
  { key: "shoulderWidth" as const, label: "어깨 너비", description: "어깨의 상대적인 너비", options: shapeOptions },
  { key: "torsoLength" as const, label: "상체 길이", description: "상체의 상대적인 길이", options: lengthOptions },
  { key: "hipSize" as const, label: "골반 너비", description: "골반의 상대적인 너비", options: shapeOptions },
  { key: "bustSize" as const, label: "가슴 볼륨", description: "가슴의 상대적인 볼륨", options: shapeOptions },
  { key: "waistToHipRatio" as const, label: "허리-골반 비율", description: "허리 대비 골반의 비율", options: shapeOptions },
  { key: "legLength" as const, label: "다리 길이", description: "다리의 상대적인 길이", options: lengthOptions },
] as const;

export function BodyShapeStep({ values, onChange }: BodyShapeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">체형 특성 선택</h2>
        <p className="mt-1 text-sm text-muted-foreground">각 항목에서 가장 가까운 옵션을 선택해주세요</p>
      </div>
      <div className="grid gap-5">
        {attributes.map((attr) => (
          <BodyShapeAttributeSelector
            key={attr.key}
            label={attr.label}
            description={attr.description}
            options={attr.options}
            value={values[attr.key]}
            onChange={(v) => onChange(attr.key, v)}
          />
        ))}
      </div>
    </div>
  );
}
