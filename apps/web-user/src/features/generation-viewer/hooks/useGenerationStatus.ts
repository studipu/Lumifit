"use client";

import { useQuery } from "@tanstack/react-query";
import type { GenerationJob } from "@lumifit/shared-types";
import { isMockEnabled, apiClient } from "@/lib/api-client";
import { getMockGenerationJob } from "@/lib/mock-data/generation";

export function useGenerationStatus(jobId: string) {
  return useQuery<GenerationJob>({
    queryKey: ["generation-job", jobId],
    queryFn: () =>
      isMockEnabled
        ? getMockGenerationJob(jobId)
        : apiClient.get<GenerationJob>(`/api/generation-jobs/${jobId}`),
    refetchInterval: (query) => {
      const state = query.state.data?.state;
      if (state === "completed" || state === "failed") return false;
      return 2000;
    },
  });
}
