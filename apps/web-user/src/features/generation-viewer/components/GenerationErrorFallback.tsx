"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XCircle, RotateCw, ArrowLeft } from "lucide-react";

type GenerationErrorFallbackProps = {
  onRetry: () => void;
  productId?: string;
};

export function GenerationErrorFallback({ onRetry, productId }: GenerationErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center">
      <XCircle className="h-16 w-16 text-destructive" />
      <div>
        <p className="text-lg font-semibold">3D 생성에 실패했습니다</p>
        <p className="mt-1 text-sm text-muted-foreground">
          다시 시도하거나 2D 비교 화면으로 돌아갈 수 있습니다
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onRetry} className="gap-2">
          <RotateCw className="h-4 w-4" />
          다시 시도
        </Button>
        {productId && (
          <Button asChild variant="ghost" className="gap-2">
            <Link href={`/products/${productId}`}>
              <ArrowLeft className="h-4 w-4" />
              상품으로 돌아가기
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
