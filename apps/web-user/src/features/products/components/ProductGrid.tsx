"use client";

import { useState } from "react";
import type { ProductCategory } from "@/types/product";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { ProductListSkeleton } from "./ProductListSkeleton";

export function ProductGrid() {
  const [category, setCategory] = useState<ProductCategory>("all");
  const { data: products, isLoading } = useProducts(
    category === "all" ? undefined : category
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">상품 목록</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          핏 비교가 가능한 상품을 둘러보세요
        </p>
      </div>
      <ProductFilters selected={category} onSelect={setCategory} />
      {isLoading ? (
        <ProductListSkeleton />
      ) : !products?.length ? (
        <div className="py-20 text-center text-muted-foreground">
          해당 카테고리에 상품이 없습니다
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
