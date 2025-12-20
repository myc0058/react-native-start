import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '@/utils/storage';
import { CartItem, Coupon } from '@/types/cart.types';
import { Product } from '@/types/product.types';

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  isLoading: boolean;
}

interface CartActions {
  addItem: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  setLoading: (loading: boolean) => void;
}

interface CartComputed {
  itemCount: () => number;
  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  tax: () => number;
  total: () => number;
}

type CartStore = CartState & CartActions & CartComputed;

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

const SHIPPING_THRESHOLD = 50000; // 무료배송 기준
const SHIPPING_COST = 3000; // 배송비
const TAX_RATE = 0.1; // 세율 10%

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      coupon: null,
      isLoading: false,

      // Actions
      addItem: (product, quantity = 1, options = {}) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === options.color &&
              item.selectedSize === options.size
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            id: `${product.id}-${options.color || ''}-${options.size || ''}-${Date.now()}`,
            product,
            quantity,
            selectedColor: options.color,
            selectedSize: options.size,
            addedAt: new Date().toISOString(),
          };

          return { items: [...state.items, newItem] };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== itemId) };
          }
          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      setLoading: (isLoading) => set({ isLoading }),

      // Computed
      itemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        ),

      discount: () => {
        const { coupon } = get();
        const subtotal = get().subtotal();

        if (!coupon) return 0;

        if (coupon.minPurchase && subtotal < coupon.minPurchase) return 0;

        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
          discountAmount = subtotal * (coupon.discountValue / 100);
        } else {
          discountAmount = coupon.discountValue;
        }

        if (coupon.maxDiscount) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscount);
        }

        return discountAmount;
      },

      shipping: () => {
        const subtotal = get().subtotal();
        const discount = get().discount();
        const netAmount = subtotal - discount;

        if (get().items.length === 0) return 0;
        return netAmount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      tax: () => {
        const subtotal = get().subtotal();
        const discount = get().discount();
        return (subtotal - discount) * TAX_RATE;
      },

      total: () => {
        const subtotal = get().subtotal();
        const discount = get().discount();
        const shipping = get().shipping();
        const tax = get().tax();
        return subtotal - discount + shipping + tax;
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
      }),
    }
  )
);
