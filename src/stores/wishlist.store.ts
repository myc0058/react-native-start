import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '@/utils/storage';
import { Product } from '@/types/product.types';

interface WishlistState {
  items: Product[];
  isLoading: boolean;
}

interface WishlistActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setLoading: (loading: boolean) => void;
  setItems: (items: Product[]) => void;
}

type WishlistStore = WishlistState & WishlistActions;

const zustandStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,

      // Actions
      addItem: (product) =>
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) {
            return state;
          }
          return { items: [...state.items, product] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return { items: state.items.filter((item) => item.id !== product.id) };
          }
          return { items: [...state.items, product] };
        }),

      isInWishlist: (productId) => get().items.some((item) => item.id === productId),

      clearWishlist: () => set({ items: [] }),

      setLoading: (isLoading) => set({ isLoading }),

      setItems: (items) => set({ items }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
