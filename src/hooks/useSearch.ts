import { useState, useCallback, useEffect } from 'react';
import { ProductsService } from '@/services/products.service';
import { useProductStore } from '@/stores';
import { useDebounce } from './useDebounce';
import { Product } from '@/types/product.types';

interface UseSearchReturn {
  query: string;
  results: Product[];
  isLoading: boolean;
  error: string | null;
  recentSearches: string[];
  setQuery: (query: string) => void;
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
  clearRecentSearches: () => void;
}

export function useSearch(debounceMs: number = 300): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    setSearchQuery,
  } = useProductStore();

  const debouncedQuery = useDebounce(query, debounceMs);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await ProductsService.searchProducts(searchQuery.trim(), 20);
      setResults(data);
      addRecentSearch(searchQuery.trim());
      setSearchQuery(searchQuery.trim());
    } catch (err) {
      const message = err instanceof Error ? err.message : '검색에 실패했습니다.';
      setError(message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [addRecentSearch, setSearchQuery]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearchQuery('');
  }, [setSearchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, search]);

  return {
    query,
    results,
    isLoading,
    error,
    recentSearches,
    setQuery,
    search,
    clearSearch,
    clearRecentSearches,
  };
}
