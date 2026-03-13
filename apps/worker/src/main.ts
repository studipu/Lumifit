import { generationStates, type GenerationState } from "@lumifit/shared-types";

function simulateGenerationJob(state: GenerationState) {
  return {
    state,
    message: "Worker scaffold is ready for queue integration.",
  };
}

console.log(simulateGenerationJob(generationStates[0]));

