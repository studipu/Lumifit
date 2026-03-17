"use client";

import { use } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductDetail } from "@/features/product-detail/hooks/useProductDetail";
import { ProductImageGallery } from "@/features/product-detail/components/ProductImageGallery";
import { ProductInfo } from "@/features/product-detail/components/ProductInfo";
import { FitComparisonWidget } from "@/features/product-detail/components/FitComparisonWidget";

type Params = Promise<{ productId: string }>;

export default function ProductDetailPage({ params }: { params: Params }) {
  const { productId } = use(params);
  const { data: product, isLoading } = useProductDetail(productId);

  if (isLoading) {
    return (
      <PageContainer>
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <div className="py-20 text-center text-muted-foreground">
          상품을 찾을 수 없습니다
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid gap-8 md:grid-cols-2">
        <ProductImageGallery imageUrls={product.imageUrls} productName={product.name} />
        <div className="space-y-6">
          <ProductInfo product={product} />
          {product.fitComparisonEnabled && (
            <FitComparisonWidget productId={product.id} productName={product.name} />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
