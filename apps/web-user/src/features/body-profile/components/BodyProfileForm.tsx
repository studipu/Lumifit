"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopperProfile, BodyShapeScale, LengthScale } from "@lumifit/shared-types";
import { Button } from "@/components/ui/button";
import { bodyProfileSchema } from "../lib/body-profile-schema";
import { useBodyProfile } from "../hooks/useBodyProfile";
import { HeightWeightStep } from "./HeightWeightStep";
import { BodyShapeStep } from "./BodyShapeStep";
import { ProfileSummary } from "./ProfileSummary";

const defaultValues: ShopperProfile = {
  heightCm: 0,
  weightKg: 0,
  ethnicity: "korean",
  shoulderWidth: "average",
  torsoLength: "average",
  hipSize: "average",
  bustSize: "average",
  waistToHipRatio: "average",
  legLength: "average",
};

export function BodyProfileForm() {
  const router = useRouter();
  const { profile: existing, save } = useBodyProfile();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ShopperProfile>(existing ?? defaultValues);
  const [error, setError] = useState<string | null>(null);

  // Sync when existing profile loads from localStorage
  const [initialized, setInitialized] = useState(false);
  if (existing && !initialized) {
    setForm(existing);
    setInitialized(true);
  }

  const totalSteps = 3;

  function updateField(field: keyof ShopperProfile, value: number | string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }

  function handleNext() {
    if (step === 1) {
      if (!form.heightCm || !form.weightKg) {
        setError("키와 몸무게를 입력해주세요");
        return;
      }
      if (form.heightCm < 100 || form.heightCm > 220) {
        setError("키는 100~220cm 범위로 입력해주세요");
        return;
      }
      if (form.weightKg < 30 || form.weightKg > 200) {
        setError("몸무게는 30~200kg 범위로 입력해주세요");
        return;
      }
    }
    setError(null);
    setStep((s) => Math.min(s + 1, totalSteps));
  }

  function handleBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
  }

  function handleSubmit() {
    const result = bodyProfileSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "입력값을 확인해주세요");
      return;
    }
    save(result.data as ShopperProfile);
    router.push("/avatar-selection");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i + 1 <= step ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Steps */}
      {step === 1 && (
        <HeightWeightStep
          heightCm={form.heightCm}
          weightKg={form.weightKg}
          ethnicity={form.ethnicity}
          onChange={updateField}
        />
      )}
      {step === 2 && (
        <BodyShapeStep
          values={{
            shoulderWidth: form.shoulderWidth,
            torsoLength: form.torsoLength,
            hipSize: form.hipSize,
            bustSize: form.bustSize,
            waistToHipRatio: form.waistToHipRatio,
            legLength: form.legLength,
          }}
          onChange={updateField as (field: string, value: string) => void}
        />
      )}
      {step === 3 && <ProfileSummary profile={form} />}

      {/* Error */}
      {error && (
        <p className="text-center text-sm text-destructive">{error}</p>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 1 && (
          <Button variant="outline" className="flex-1" onClick={handleBack}>
            이전
          </Button>
        )}
        {step < totalSteps ? (
          <Button className="flex-1" onClick={handleNext}>
            다음
          </Button>
        ) : (
          <Button className="flex-1" onClick={handleSubmit}>
            완료
          </Button>
        )}
      </div>
    </div>
  );
}
