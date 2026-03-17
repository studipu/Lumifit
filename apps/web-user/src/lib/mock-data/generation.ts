import type { GenerationJob, GenerationState } from "@lumifit/shared-types";

// Simulates state transitions: queued -> processing -> completed
const jobTimers = new Map<string, { createdAt: number }>();

function getSimulatedState(jobId: string): GenerationState {
  let entry = jobTimers.get(jobId);
  if (!entry) {
    entry = { createdAt: Date.now() };
    jobTimers.set(jobId, entry);
  }
  const elapsed = Date.now() - entry.createdAt;
  if (elapsed < 2000) return "queued";
  if (elapsed < 5000) return "processing";
  return "completed";
}

export function getMockGenerationJob(jobId: string): Promise<GenerationJob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const state = getSimulatedState(jobId);
      resolve({
        id: jobId,
        productId: jobId.split("-")[1] ?? "prod-1",
        avatarId: jobId.split("-")[2] ?? "avatar-1",
        state,
        resultUrl: state === "completed" ? "/models/demo.glb" : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 300);
  });
}

export function createMockGenerationJob(productId: string, avatarId: string): Promise<GenerationJob> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobId = `job-${productId}-${avatarId}`;
      jobTimers.set(jobId, { createdAt: Date.now() });
      resolve({
        id: jobId,
        productId,
        avatarId,
        state: "queued",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }, 200);
  });
}
