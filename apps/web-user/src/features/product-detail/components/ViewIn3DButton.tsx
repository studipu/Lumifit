"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";

type ViewIn3DButtonProps = {
  productId: string;
  avatarId: string;
};

export function ViewIn3DButton({ productId, avatarId }: ViewIn3DButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    // In production: POST to create generation job, get jobId, then navigate
    // For now: navigate with mock jobId
    const mockJobId = `job-${productId}-${avatarId}`;
    router.push(`/generation/${mockJobId}`);
  }

  return (
    <Button className="w-full gap-2" size="lg" onClick={handleClick} disabled={loading}>
      <Box className="h-4 w-4" />
      {loading ? "요청 중..." : "3D로 보기"}
    </Button>
  );
}
