"use client";

import { Box } from "lucide-react";

type ThreeDViewerProps = {
  resultUrl: string;
};

export function ThreeDViewer({ resultUrl }: ThreeDViewerProps) {
  // In production, use @google/model-viewer or Three.js
  // For now, show a placeholder indicating the 3D model is ready
  return (
    <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5">
      <Box className="h-20 w-20 text-primary" />
      <p className="mt-4 text-lg font-semibold text-primary">3D 모델 뷰어</p>
      <p className="mt-1 text-sm text-muted-foreground">모델 URL: {resultUrl}</p>
      <p className="mt-3 text-xs text-muted-foreground">
        실제 구현 시 @google/model-viewer로 GLB/GLTF 모델을 렌더링합니다
      </p>
    </div>
  );
}
