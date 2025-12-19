import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { Product, Review } from '@/types/product.types';
import { ApiResponse, PaginatedResponse, GetProductsParams } from '@/types/api.types';

/**
 * Products Service
 */

export class ProductsService {
  static async getProducts(
    params?: GetProductsParams
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      API_ENDPOINTS.PRODUCTS.LIST,
      { params }
    );
    return response.data.data;
  }

  static async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.DETAIL(id)
    );
    return response.data.data;
  }

  static async searchProducts(query: string, limit?: number): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.SEARCH,
      {
        params: { q: query, limit },
      }
    );
    return response.data.data;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.FEATURED
    );
    return response.data.data;
  }

  static async getProductReviews(productId: string): Promise<Review[]> {
    const response = await apiClient.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.PRODUCTS.REVIEWS(productId)
    );
    return response.data.data;
  }
}
