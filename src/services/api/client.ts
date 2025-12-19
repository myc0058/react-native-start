import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@/constants/config';
import { setupInterceptors } from './interceptors';

/**
 * Axios API Client
 */

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Setup request/response interceptors
setupInterceptors(apiClient);

export default apiClient;
