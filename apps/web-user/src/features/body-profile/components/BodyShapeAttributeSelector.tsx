"use client";

import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type BodyShapeAttributeSelectorProps = {
  label: string;
  description: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export function BodyShapeAttributeSelector({
  label,
  description,
  options,
  value,
  onChange,
}: BodyShapeAttributeSelectorProps) {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              value === opt.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
