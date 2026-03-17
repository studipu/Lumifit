"use client";

import Link from "next/link";
import type { Product } from "@lumifit/shared-types";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

const categoryLabels: Record<string, string> = {
  jackets: "자켓/코트",
  tops: "상의",
  bottoms: "하의",
  dresses: "원피스",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
    >
      <div className="flex aspect-[3/4] items-center justify-center bg-muted">
        <ImageIcon className="h-12 w-12 text-muted-foreground/40" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">
            {categoryLabels[product.category] ?? product.category}
          </Badge>
          {product.fitComparisonEnabled && (
            <Badge variant="outline" className="text-[10px]">
              핏 비교
            </Badge>
          )}
        </div>
        <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </p>
        <p className="mt-auto text-sm font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
