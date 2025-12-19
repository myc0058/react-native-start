/**
 * API Types
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  statusCode?: number;
}

export interface FetchParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface GetProductsParams extends FetchParams {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  rating?: number;
  inStock?: boolean;
  search?: string;
}

export interface SearchParams {
  query: string;
  limit?: number;
  page?: number;
}
