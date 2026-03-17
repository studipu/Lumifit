"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useBodyProfile } from "@/features/body-profile/hooks/useBodyProfile";
import { getSelectedAvatarId } from "@/features/body-profile/lib/body-profile-storage";
import { useAvatarRecommendation } from "@/features/avatar-selection/hooks/useAvatarRecommendation";
import { AvatarComparisonView } from "./AvatarComparisonView";
import { ViewIn3DButton } from "./ViewIn3DButton";
import { Users } from "lucide-react";

type FitComparisonWidgetProps = {
  productId: string;
  productName: string;
};

export function FitComparisonWidget({ productId, productName }: FitComparisonWidgetProps) {
  const { profile, isLoaded } = useBodyProfile();
  const avatarId = typeof window !== "undefined" ? getSelectedAvatarId() : null;
  const { data: avatars } = useAvatarRecommendation(profile);
  const [expanded, setExpanded] = useState(false);

  if (!isLoaded) return null;

  // No profile yet
  if (!profile) {
    return (
      <div className="rounded-xl border border-dashed p-5 text-center">
        <Users className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">비슷한 체형 착장 비교</p>
        <p className="mt-1 text-xs text-muted-foreground">
          체형 프로필을 설정하면 비슷한 체형의 아바타로 착장을 비교할 수 있어요
        </p>
        <Button asChild size="sm" className="mt-3">
          <Link href="/body-profile">프로필 설정하기</Link>
        </Button>
      </div>
    );
  }

  // Profile exists but no avatar selected
  if (!avatarId) {
    return (
      <div className="rounded-xl border border-dashed p-5 text-center">
        <Users className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">아바타를 선택해주세요</p>
        <p className="mt-1 text-xs text-muted-foreground">
          나와 비슷한 체형의 아바타를 선택하면 착장 비교를 할 수 있어요
        </p>
        <Button asChild size="sm" className="mt-3">
          <Link href="/avatar-selection">아바타 선택하기</Link>
        </Button>
      </div>
    );
  }

  // CTA collapsed state
  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="w-full rounded-xl border bg-primary/5 p-5 text-center transition-colors hover:bg-primary/10"
      >
        <Users className="mx-auto h-8 w-8 text-primary" />
        <p className="mt-2 text-sm font-semibold text-primary">비슷한 체형 착장 비교하기</p>
        <p className="mt-1 text-xs text-muted-foreground">
          3가지 체형의 아바타로 착장을 비교해 보세요
        </p>
      </button>
    );
  }

  // Expanded comparison view
  return (
    <div className="space-y-4 rounded-xl border p-5">
      {avatars && <AvatarComparisonView avatars={avatars} productName={productName} />}
      <ViewIn3DButton productId={productId} avatarId={avatarId} />
    </div>
  );
}
