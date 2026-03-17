"use client";

import { useMutation } from "@tanstack/react-query";
import type { GenerationJob } from "@lumifit/shared-types";
import { isMockEnabled, apiClient } from "@/lib/api-client";
import { createMockGenerationJob } from "@/lib/mock-data/generation";

type GenerationRequestInput = {
  productId: string;
  avatarId: string;
};

export function useGenerationRequest() {
  return useMutation<GenerationJob, Error, GenerationRequestInput>({
    mutationFn: ({ productId, avatarId }) =>
      isMockEnabled
        ? createMockGenerationJob(productId, avatarId)
        : apiClient.post<GenerationJob>("/api/generation-jobs", { productId, avatarId }),
  });
}
