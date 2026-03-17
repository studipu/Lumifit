export const productCategories = ["all", "jackets", "tops", "bottoms", "dresses"] as const;
export type ProductCategory = (typeof productCategories)[number];
