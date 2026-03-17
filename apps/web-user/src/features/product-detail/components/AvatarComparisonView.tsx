"use client";

import type { Avatar } from "@lumifit/shared-types";
import { User } from "lucide-react";

type AvatarComparisonViewProps = {
  avatars: Avatar[];
  productName: string;
};

export function AvatarComparisonView({ avatars, productName }: AvatarComparisonViewProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">
        <span className="text-primary">{productName}</span> 착장 비교
      </p>
      <div className="grid grid-cols-3 gap-3">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="flex flex-col items-center gap-2 rounded-lg border p-3">
            <div className="flex h-24 w-16 items-center justify-center rounded bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-xs font-medium text-center">{avatar.label}</p>
            <p className="text-[10px] text-muted-foreground">
              {avatar.bodyShape.heightCm}cm
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
