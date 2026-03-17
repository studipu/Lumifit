"use client";

import { useQuery } from "@tanstack/react-query";
import type { Product } from "@lumifit/shared-types";
import { isMockEnabled, apiClient } from "@/lib/api-client";
import { getMockProducts } from "@/lib/mock-data/products";

export function useProducts(category?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () =>
      isMockEnabled
        ? getMockProducts(category)
        : apiClient.get<Product[]>("/api/products", category ? { category } : undefined),
  });
}
