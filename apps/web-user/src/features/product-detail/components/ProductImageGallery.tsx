"use client";

import { ImageIcon } from "lucide-react";

type ProductImageGalleryProps = {
  imageUrls: string[];
  productName: string;
};

export function ProductImageGallery({ productName }: ProductImageGalleryProps) {
  return (
    <div className="flex aspect-square items-center justify-center rounded-xl bg-muted">
      <div className="text-center">
        <ImageIcon className="mx-auto h-20 w-20 text-muted-foreground/30" />
        <p className="mt-2 text-sm text-muted-foreground">{productName}</p>
      </div>
    </div>
  );
}
