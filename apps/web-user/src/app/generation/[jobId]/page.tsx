"use client";

import { use } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { useGenerationStatus } from "@/features/generation-viewer/hooks/useGenerationStatus";
import { GenerationStatusTracker } from "@/features/generation-viewer/components/GenerationStatusTracker";
import { ThreeDViewer } from "@/features/generation-viewer/components/ThreeDViewer";
import { GenerationErrorFallback } from "@/features/generation-viewer/components/GenerationErrorFallback";
import { Skeleton } from "@/components/ui/skeleton";

type Params = Promise<{ jobId: string }>;

export default function GenerationPage({ params }: { params: Params }) {
  const { jobId } = use(params);
  const { data: job, isLoading, refetch } = useGenerationStatus(jobId);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-lg space-y-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="aspect-square w-full rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  if (!job) {
    return (
      <PageContainer>
        <div className="py-20 text-center text-muted-foreground">
          생성 작업을 찾을 수 없습니다
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-xl font-bold">3D 모델 생성</h1>
        </div>

        <GenerationStatusTracker state={job.state} />

        {job.state === "completed" && job.resultUrl && (
          <ThreeDViewer resultUrl={job.resultUrl} />
        )}

        {job.state === "failed" && (
          <GenerationErrorFallback
            onRetry={() => refetch()}
            productId={job.productId}
          />
        )}

        {(job.state === "queued" || job.state === "processing") && (
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {job.state === "queued" ? "생성 대기 중입니다..." : "3D 모델을 생성하고 있습니다..."}
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
