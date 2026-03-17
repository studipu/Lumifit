"use client";

import { cn } from "@/lib/utils";
import { productCategories, type ProductCategory } from "@/types/product";

const categoryLabels: Record<ProductCategory, string> = {
  all: "전체",
  jackets: "자켓/코트",
  tops: "상의",
  bottoms: "하의",
  dresses: "원피스",
};

type ProductFiltersProps = {
  selected: ProductCategory;
  onSelect: (category: ProductCategory) => void;
};

export function ProductFilters({ selected, onSelect }: ProductFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {productCategories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            selected === cat
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
