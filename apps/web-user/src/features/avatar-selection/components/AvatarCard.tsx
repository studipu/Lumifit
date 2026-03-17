"use client";

import type { Avatar } from "@lumifit/shared-types";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

type AvatarCardProps = {
  avatar: Avatar;
  selected: boolean;
  onSelect: () => void;
};

export function AvatarCard({ avatar, selected, onSelect }: AvatarCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all hover:shadow-md",
        selected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-input bg-card hover:border-primary/40"
      )}
    >
      <div className="flex h-32 w-24 items-center justify-center rounded-lg bg-muted">
        <User className="h-16 w-16 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">{avatar.label}</p>
        <p className="text-xs text-muted-foreground">
          {avatar.bodyShape.heightCm}cm · {avatar.bodyShape.weightKg}kg
        </p>
      </div>
      {selected && (
        <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
          선택됨
        </span>
      )}
    </button>
  );
}
