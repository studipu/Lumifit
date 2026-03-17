import type { Product } from "@lumifit/shared-types";
import { Badge } from "@/components/ui/badge";

const categoryLabels: Record<string, string> = {
  jackets: "자켓/코트",
  tops: "상의",
  bottoms: "하의",
  dresses: "원피스",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          {categoryLabels[product.category] ?? product.category}
        </Badge>
      </div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      <div className="space-y-2">
        <p className="text-sm font-medium">사이즈</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <span
              key={size}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm"
            >
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
