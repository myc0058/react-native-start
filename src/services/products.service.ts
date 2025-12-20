import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { Product, Review } from '@/types/product.types';
import { ApiResponse, PaginatedResponse, GetProductsParams } from '@/types/api.types';
import { USE_MOCK_API, ITEMS_PER_PAGE } from '@/constants/config';
import { mockProducts, mockReviews } from '@/mocks/mockData';

/**
 * Products Service
 */

export class ProductsService {
  static async getProducts(
    params?: GetProductsParams
  ): Promise<PaginatedResponse<Product>> {
    if (USE_MOCK_API) {
      const page = params?.page ?? 1;
      const limit = params?.limit ?? ITEMS_PER_PAGE;
      const filtered = mockProducts.filter((p) =>
        params?.categoryId ? p.category.id === params.categoryId : true
      );
      const data = filtered.slice((page - 1) * limit, page * limit);
      return {
        data,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
          hasMore: page * limit < filtered.length,
        },
      };
    }

    const response = await apiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      API_ENDPOINTS.PRODUCTS.LIST,
      { params }
    );
    return response.data.data;
  }

  static async getProductById(id: string): Promise<Product> {
    if (USE_MOCK_API) {
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }

    const response = await apiClient.get<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.DETAIL(id)
    );
    return response.data.data;
  }

  static async searchProducts(query: string, limit?: number): Promise<Product[]> {
    if (USE_MOCK_API) {
      const normalized = query.toLowerCase();
      const results = mockProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.brand.toLowerCase().includes(normalized) ||
          p.description.toLowerCase().includes(normalized)
      );
      return results.slice(0, limit ?? results.length);
    }

    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.SEARCH,
      {
        params: { q: query, limit },
      }
    );
    return response.data.data;
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    if (USE_MOCK_API) {
      return mockProducts.filter((p) => p.isFeatured);
    }

    const response = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.FEATURED
    );
    return response.data.data;
  }

  static async getProductReviews(productId: string): Promise<Review[]> {
    if (USE_MOCK_API) {
      return mockReviews[productId] ?? [];
    }

    const response = await apiClient.get<ApiResponse<Review[]>>(
      API_ENDPOINTS.PRODUCTS.REVIEWS(productId)
    );
    return response.data.data;
  }
}
