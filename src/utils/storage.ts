/**
 * Storage Wrapper
 * 1) MMKV (when native module available)
 * 2) AsyncStorage (when MMKV 없음, but AsyncStorage is installed)
 * 3) In-memory fallback (Expo Go + AsyncStorage 미설치)
 */

type SyncStorageLike = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string | number | boolean) => void;
  getNumber: (key: string) => number | undefined;
  getBoolean: (key: string) => boolean | undefined;
  remove: (key: string) => void;
  clearAll: () => void;
  contains: (key: string) => boolean;
};

type PersistStorageLike = {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
};

// Attempt MMKV
let mmkvInstance: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createMMKV } = require('react-native-mmkv');
  mmkvInstance = createMMKV({ id: 'app-storage' });
} catch {
  mmkvInstance = null;
}

// Attempt AsyncStorage (optional dependency)
let asyncStorage: any;
if (!mmkvInstance) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    asyncStorage = require('@react-native-async-storage/async-storage').default;
  } catch {
    asyncStorage = null;
  }
}

// In-memory fallback (sync)
const memory = new Map<string, string>();
const memorySync: SyncStorageLike = {
  getString: (key) => memory.get(key),
  set: (key, value) => memory.set(key, String(value)),
  getNumber: (key) => {
    const v = memory.get(key);
    return v !== undefined ? Number(v) : undefined;
  },
  getBoolean: (key) => {
    const v = memory.get(key);
    return v !== undefined ? v === 'true' : undefined;
  },
  remove: (key) => memory.delete(key),
  clearAll: () => memory.clear(),
  contains: (key) => memory.has(key),
};

// Sync storage for general use (falls back to memory to avoid async in sync call sites)
const syncStorage: SyncStorageLike = mmkvInstance
  ? {
      getString: (key) => mmkvInstance.getString(key),
      set: (key, value) => mmkvInstance.set(key, value),
      getNumber: (key) => mmkvInstance.getNumber(key),
      getBoolean: (key) => mmkvInstance.getBoolean(key),
      remove: (key) => mmkvInstance.remove(key),
      clearAll: () => mmkvInstance.clearAll(),
      contains: (key) => mmkvInstance.contains(key),
    }
  : memorySync;

export const storage = syncStorage;

// Persist storage for zustand (supports async storages)
export const persistStorage: PersistStorageLike = mmkvInstance
  ? {
      getItem: (name) => mmkvInstance.getString(name) ?? null,
      setItem: (name, value) => mmkvInstance.set(name, value),
      removeItem: (name) => mmkvInstance.remove(name),
    }
  : asyncStorage
  ? {
      getItem: async (name) => (await asyncStorage.getItem(name)) ?? null,
      setItem: (name, value) => asyncStorage.setItem(name, value),
      removeItem: (name) => asyncStorage.removeItem(name),
    }
  : {
      getItem: (name) => memory.get(name) ?? null,
      setItem: (name, value) => memory.set(name, value),
      removeItem: (name) => memory.delete(name),
    };

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
    storage.remove(key);
  },

  clear: (): void => {
    storage.clearAll();
  },

  contains: (key: string): boolean => {
    return storage.contains(key);
  },
};
