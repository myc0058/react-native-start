import { Category } from '@/types/product.types';

/**
 * Product Categories
 */

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    icon: 'laptop-outline',
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    icon: 'shirt-outline',
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    icon: 'home-outline',
  },
  {
    id: '4',
    name: 'Beauty',
    slug: 'beauty',
    icon: 'sparkles-outline',
  },
  {
    id: '5',
    name: 'Sports',
    slug: 'sports',
    icon: 'basketball-outline',
  },
  {
    id: '6',
    name: 'Books',
    slug: 'books',
    icon: 'book-outline',
  },
  {
    id: '7',
    name: 'Toys',
    slug: 'toys',
    icon: 'game-controller-outline',
  },
  {
    id: '8',
    name: 'Food',
    slug: 'food',
    icon: 'fast-food-outline',
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return CATEGORIES.find((cat) => cat.slug === slug);
};
