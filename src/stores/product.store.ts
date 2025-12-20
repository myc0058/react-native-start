import { create } from 'zustand';
import { ProductFilters, ProductSortOption, Category } from '@/types/product.types';

interface ProductState {
  filters: ProductFilters;
  searchQuery: string;
  categories: Category[];
  recentSearches: string[];
  isFiltersVisible: boolean;
}

interface ProductActions {
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: ProductSortOption) => void;
  setCategories: (categories: Category[]) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  toggleFiltersVisible: () => void;
  setFiltersVisible: (visible: boolean) => void;
}

type ProductStore = ProductState & ProductActions;

const initialFilters: ProductFilters = {
  categoryId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  brands: undefined,
  colors: undefined,
  sizes: undefined,
  rating: undefined,
  sortBy: 'popular',
  inStock: true,
};

const MAX_RECENT_SEARCHES = 10;

export const useProductStore = create<ProductStore>((set) => ({
  // State
  filters: initialFilters,
  searchQuery: '',
  categories: [],
  recentSearches: [],
  isFiltersVisible: false,

  // Actions
  setFilters: (filters) => set({ filters }),

  updateFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  setSortBy: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy },
    })),

  setCategories: (categories) => set({ categories }),

  addRecentSearch: (query) =>
    set((state) => {
      const filtered = state.recentSearches.filter((q) => q !== query);
      const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      return { recentSearches: updated };
    }),

  clearRecentSearches: () => set({ recentSearches: [] }),

  toggleFiltersVisible: () =>
    set((state) => ({ isFiltersVisible: !state.isFiltersVisible })),

  setFiltersVisible: (isFiltersVisible) => set({ isFiltersVisible }),
}));
