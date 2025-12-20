import { useState, useCallback, useEffect } from 'react';
import { ProductsService } from '@/services/products.service';
import { useProductStore } from '@/stores';
import { Product, Review } from '@/types/product.types';
import { GetProductsParams, PaginatedResponse } from '@/types/api.types';

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  fetchProducts: (params?: GetProductsParams) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useProducts(initialParams?: GetProductsParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentParams, setCurrentParams] = useState<GetProductsParams | undefined>(initialParams);

  const { filters } = useProductStore();

  const fetchProducts = useCallback(async (params?: GetProductsParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const queryParams: GetProductsParams = {
        ...filters,
        ...params,
        page: 1,
        limit: 20,
      };
      setCurrentParams(queryParams);

      const response: PaginatedResponse<Product> = await ProductsService.getProducts(queryParams);
      setProducts(response.data);
      setPage(1);
      setHasMore(response.pagination.page < response.pagination.totalPages);
    } catch (err) {
      const message = err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const response = await ProductsService.getProducts({
        ...currentParams,
        page: nextPage,
        limit: 20,
      });

      setProducts((prev) => [...prev, ...response.data]);
      setPage(nextPage);
      setHasMore(response.pagination.page < response.pagination.totalPages);
    } catch (err) {
      const message = err instanceof Error ? err.message : '상품을 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page, currentParams]);

  const refresh = useCallback(async () => {
    await fetchProducts(currentParams);
  }, [fetchProducts, currentParams]);

  return {
    products,
    isLoading,
    error,
    hasMore,
    page,
    fetchProducts,
    loadMore,
    refresh,
  };
}

interface UseProductDetailReturn {
  product: Product | null;
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  fetchProduct: (id: string) => Promise<void>;
  fetchReviews: (productId: string) => Promise<void>;
}

export function useProductDetail(): UseProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await ProductsService.getProductById(id);
      setProduct(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '상품 정보를 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchReviews = useCallback(async (productId: string) => {
    try {
      const data = await ProductsService.getProductReviews(productId);
      setReviews(data);
    } catch {
      // Silently fail for reviews
    }
  }, []);

  return {
    product,
    reviews,
    isLoading,
    error,
    fetchProduct,
    fetchReviews,
  };
}

interface UseFeaturedProductsReturn {
  featuredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  fetchFeaturedProducts: () => Promise<void>;
}

export function useFeaturedProducts(): UseFeaturedProductsReturn {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await ProductsService.getFeaturedProducts();
      setFeaturedProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '추천 상품을 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return {
    featuredProducts,
    isLoading,
    error,
    fetchFeaturedProducts,
  };
}
