import { MMKV } from 'react-native-mmkv';

/**
 * MMKV Storage Wrapper
 * High-performance local storage for React Native
 */

export const storage = new MMKV();

export const storageKeys = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_DATA: 'cart_data',
  RECENT_SEARCHES: 'recent_searches',
  WISHLIST: 'wishlist',
} as const;

// Type-safe storage interface
export const Storage = {
  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  setString: (key: string, value: string): void => {
    storage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  setNumber: (key: string, value: number): void => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  setBoolean: (key: string, value: boolean): void => {
    storage.set(key, value);
  },

  getObject: <T>(key: string): T | undefined => {
    const value = storage.getString(key);
    if (!value) return undefined;
    try {
      return JSON.parse(value) as T;
    } catch {
      return undefined;
    }
  },

  setObject: <T>(key: string, value: T): void => {
    storage.set(key, JSON.stringify(value));
  },

  delete: (key: string): void => {
    storage.delete(key);
  },

  clear: (): void => {
    storage.clearAll();
  },

  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
