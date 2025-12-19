/**
 * API Endpoints
 */

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },

  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    REVIEWS: (id: string) => `/products/${id}/reviews`,
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: string) => `/categories/${id}`,
  },

  // Cart
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    UPDATE: (itemId: string) => `/cart/items/${itemId}`,
    REMOVE: (itemId: string) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear',
  },

  // Orders
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    TRACKING: (id: string) => `/orders/${id}/tracking`,
  },

  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    ADD_ADDRESS: '/user/addresses',
    UPDATE_ADDRESS: (id: string) => `/user/addresses/${id}`,
    DELETE_ADDRESS: (id: string) => `/user/addresses/${id}`,
    WISHLIST: '/user/wishlist',
    TOGGLE_WISHLIST: (productId: string) => `/user/wishlist/${productId}`,
    CHANGE_PASSWORD: '/user/password',
  },
} as const;
