import type { Product } from "@lumifit/shared-types";

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    tenantId: "tenant-1",
    name: "오버핏 울 코트",
    description: "부드러운 울 소재의 오버핏 코트입니다. 어깨 라인이 자연스럽게 떨어지며, 다양한 체형에 잘 어울립니다.",
    price: 189000,
    currency: "KRW",
    category: "jackets",
    imageUrls: ["/products/coat-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    fitComparisonEnabled: true,
    createdAt: "2026-01-15T09:00:00Z",
  },
  {
    id: "prod-2",
    tenantId: "tenant-1",
    name: "크롭 트위드 자켓",
    description: "클래식한 트위드 소재의 크롭 자켓. 허리 라인을 살려주는 핏이 특징입니다.",
    price: 159000,
    currency: "KRW",
    category: "jackets",
    imageUrls: ["/products/jacket-1.jpg"],
    sizes: ["XS", "S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-01-20T09:00:00Z",
  },
  {
    id: "prod-3",
    tenantId: "tenant-1",
    name: "슬림핏 니트 탑",
    description: "몸에 부드럽게 밀착되는 슬림핏 니트. 체형에 따라 실루엣이 달라집니다.",
    price: 59000,
    currency: "KRW",
    category: "tops",
    imageUrls: ["/products/knit-1.jpg"],
    sizes: ["S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-02-01T09:00:00Z",
  },
  {
    id: "prod-4",
    tenantId: "tenant-1",
    name: "오버사이즈 맨투맨",
    description: "여유로운 핏의 맨투맨 스웨트셔츠. 편안한 데일리 룩에 적합합니다.",
    price: 49000,
    currency: "KRW",
    category: "tops",
    imageUrls: ["/products/sweatshirt-1.jpg"],
    sizes: ["M", "L", "XL"],
    fitComparisonEnabled: true,
    createdAt: "2026-02-05T09:00:00Z",
  },
  {
    id: "prod-5",
    tenantId: "tenant-1",
    name: "하이웨이스트 와이드 팬츠",
    description: "하이웨이스트 디자인의 와이드 팬츠. 다리 길이와 골반 너비에 따라 핏이 달라집니다.",
    price: 79000,
    currency: "KRW",
    category: "bottoms",
    imageUrls: ["/products/wide-pants-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    fitComparisonEnabled: true,
    createdAt: "2026-02-10T09:00:00Z",
  },
  {
    id: "prod-6",
    tenantId: "tenant-1",
    name: "스트레이트 데님 진",
    description: "클래식 스트레이트 핏 데님. 허리와 골반 사이즈에 따른 핏 차이가 큽니다.",
    price: 89000,
    currency: "KRW",
    category: "bottoms",
    imageUrls: ["/products/denim-1.jpg"],
    sizes: ["25", "26", "27", "28", "29", "30"],
    fitComparisonEnabled: true,
    createdAt: "2026-02-15T09:00:00Z",
  },
  {
    id: "prod-7",
    tenantId: "tenant-1",
    name: "플리츠 미디 스커트",
    description: "우아한 플리츠 디테일의 미디 스커트. 골반과 허리 비율에 따라 실루엣이 달라집니다.",
    price: 69000,
    currency: "KRW",
    category: "bottoms",
    imageUrls: ["/products/skirt-1.jpg"],
    sizes: ["S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-02-20T09:00:00Z",
  },
  {
    id: "prod-8",
    tenantId: "tenant-1",
    name: "A라인 미니 원피스",
    description: "허리에서 자연스럽게 퍼지는 A라인 원피스. 상체와 하체 비율에 따라 느낌이 달라집니다.",
    price: 99000,
    currency: "KRW",
    category: "dresses",
    imageUrls: ["/products/dress-1.jpg"],
    sizes: ["XS", "S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-03-01T09:00:00Z",
  },
  {
    id: "prod-9",
    tenantId: "tenant-1",
    name: "랩 원피스",
    description: "허리를 감싸는 랩 디자인 원피스. 체형에 따른 드레이프가 달라집니다.",
    price: 119000,
    currency: "KRW",
    category: "dresses",
    imageUrls: ["/products/dress-2.jpg"],
    sizes: ["S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-03-05T09:00:00Z",
  },
  {
    id: "prod-10",
    tenantId: "tenant-1",
    name: "퍼프 슬리브 블라우스",
    description: "볼륨감 있는 퍼프 슬리브 블라우스. 어깨 너비에 따라 느낌이 달라집니다.",
    price: 65000,
    currency: "KRW",
    category: "tops",
    imageUrls: ["/products/blouse-1.jpg"],
    sizes: ["S", "M", "L"],
    fitComparisonEnabled: true,
    createdAt: "2026-03-10T09:00:00Z",
  },
];

export function getMockProducts(category?: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = !category || category === "all"
        ? mockProducts
        : mockProducts.filter((p) => p.category === category);
      resolve(filtered);
    }, 300);
  });
}

export function getMockProduct(id: string): Promise<Product | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find((p) => p.id === id) ?? null);
    }, 200);
  });
}
