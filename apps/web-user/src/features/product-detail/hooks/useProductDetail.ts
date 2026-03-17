"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@lumifit/shared-types";
import { isMockEnabled, apiClient } from "@/lib/api-client";
import { getMockProduct } from "@/lib/mock-data/products";

export function useProductDetail(productId: string) {
  return useQuery<Product | null>({
    queryKey: ["product", productId],
    queryFn: () =>
      isMockEnabled
        ? getMockProduct(productId)
        : apiClient.get<Product>(`/api/products/${productId}`),
  });
}
