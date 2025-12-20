/**
 * App Configuration
 */

// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api' // Development Mock API
  : 'https://api.shoppingmall.com'; // Production API

export const API_TIMEOUT = 15000; // 15 seconds

// Pagination
export const ITEMS_PER_PAGE = 20;
export const PRODUCTS_PER_PAGE = 12;

// Image Configuration
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Cache Configuration
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Search Configuration
export const MIN_SEARCH_LENGTH = 2;
export const SEARCH_DEBOUNCE_MS = 500;

// Cart Configuration
export const MAX_CART_ITEMS = 50;
export const MIN_ORDER_AMOUNT = 10000; // ₩10,000

// Shipping Configuration
export const FREE_SHIPPING_THRESHOLD = 50000; // ₩50,000
export const DEFAULT_SHIPPING_FEE = 3000; // ₩3,000

// App Information
export const APP_NAME = 'ShoppingMall';
export const APP_VERSION = '1.0.0';
export const SUPPORT_EMAIL = 'support@shoppingmall.com';
export const PRIVACY_POLICY_URL = 'https://shoppingmall.com/privacy';
export const TERMS_OF_SERVICE_URL = 'https://shoppingmall.com/terms';

// Development
// When true, services return mock data instead of calling backend APIs.
export const USE_MOCK_API = true;
