"use client";

import { useQuery } from "@tanstack/react-query";
import type { Avatar, ShopperProfile } from "@lumifit/shared-types";
import { isMockEnabled, apiClient } from "@/lib/api-client";
import { getMockAvatars } from "@/lib/mock-data/avatars";

export function useAvatarRecommendation(profile: ShopperProfile | null) {
  return useQuery<Avatar[]>({
    queryKey: ["avatars", "recommend", profile],
    queryFn: () =>
      isMockEnabled
        ? getMockAvatars(profile)
        : apiClient.post<Avatar[]>("/api/avatars/recommend", { profile }),
    enabled: !!profile,
  });
}
