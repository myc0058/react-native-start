/**
 * Product Types
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  category: Category;
  brand: string;
  stock: number;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, string>;
  colors?: ProductColor[];
  sizes?: ProductSize[];
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  parentId?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  name: string;
  value: string;
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  rating?: number;
  sortBy?: ProductSortOption;
  inStock?: boolean;
}

export type ProductSortOption =
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'latest'
  | 'popular';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: string;
}
