"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBodyProfile } from "@/features/body-profile/hooks/useBodyProfile";
import { saveSelectedAvatarId } from "@/features/body-profile/lib/body-profile-storage";
import { useAvatarRecommendation } from "../hooks/useAvatarRecommendation";
import { AvatarCard } from "./AvatarCard";

export function AvatarGrid() {
  const router = useRouter();
  const { profile, isLoaded } = useBodyProfile();
  const { data: avatars, isLoading } = useAvatarRecommendation(profile);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !profile) {
      router.replace("/body-profile");
    }
  }, [isLoaded, profile, router]);

  if (!isLoaded || isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">아바타 추천 중...</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!avatars?.length) return null;

  function handleConfirm() {
    if (!selectedId) return;
    saveSelectedAvatarId(selectedId);
    router.push("/products");
  }

  const valueLabel: Record<string, string> = {
    narrow: "좁은", average: "보통", broad: "넓은",
    short: "짧은", long: "긴",
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">나와 비슷한 체형 선택</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          가장 비슷한 체형의 아바타를 선택해주세요
        </p>
      </div>
      {profile && (
        <div className="rounded-lg border bg-muted/50 p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">내 프로필</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-background px-2.5 py-1 border">{profile.heightCm}cm</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">{profile.weightKg}kg</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">어깨 {valueLabel[profile.shoulderWidth]}</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">상체 {valueLabel[profile.torsoLength]}</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">골반 {valueLabel[profile.hipSize]}</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">가슴 {valueLabel[profile.bustSize]}</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">허리-골반 {valueLabel[profile.waistToHipRatio]}</span>
            <span className="rounded-full bg-background px-2.5 py-1 border">다리 {valueLabel[profile.legLength]}</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {avatars.map((avatar) => (
          <AvatarCard
            key={avatar.id}
            avatar={avatar}
            selected={selectedId === avatar.id}
            onSelect={() => setSelectedId(avatar.id)}
          />
        ))}
      </div>
      <Button
        className="w-full"
        disabled={!selectedId}
        onClick={handleConfirm}
      >
        선택 완료
      </Button>
    </div>
  );
}
