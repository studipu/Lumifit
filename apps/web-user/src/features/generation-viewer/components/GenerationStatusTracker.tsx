"use client";

import type { GenerationState } from "@lumifit/shared-types";
import { cn } from "@/lib/utils";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";

type GenerationStatusTrackerProps = {
  state: GenerationState;
};

const steps: { state: GenerationState; label: string }[] = [
  { state: "queued", label: "대기 중" },
  { state: "processing", label: "생성 중" },
  { state: "completed", label: "완료" },
];

function getStepIndex(state: GenerationState): number {
  if (state === "failed") return 1;
  return steps.findIndex((s) => s.state === state);
}

function StateIcon({ state, active }: { state: GenerationState; active: boolean }) {
  if (state === "queued") return <Clock className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />;
  if (state === "processing") return <Loader2 className={cn("h-5 w-5", active ? "animate-spin text-primary" : "text-muted-foreground")} />;
  return <CheckCircle2 className={cn("h-5 w-5", active ? "text-green-600" : "text-muted-foreground")} />;
}

export function GenerationStatusTracker({ state }: GenerationStatusTrackerProps) {
  const currentIndex = getStepIndex(state);

  if (state === "failed") {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <XCircle className="h-12 w-12 text-destructive" />
        <p className="text-sm font-medium text-destructive">생성에 실패했습니다</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      {steps.map((step, i) => {
        const isActive = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step.state} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  isCurrent ? "border-primary bg-primary/10" : isActive ? "border-green-600 bg-green-50" : "border-muted"
                )}
              >
                <StateIcon state={step.state} active={isActive} />
              </div>
              <span className={cn("text-xs font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("h-0.5 w-12 rounded-full", i < currentIndex ? "bg-green-600" : "bg-muted")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
