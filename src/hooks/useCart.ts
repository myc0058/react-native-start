import { useCallback } from 'react';
import { useCartStore } from '@/stores';
import { Product } from '@/types/product.types';
import { CartItem, Coupon } from '@/types/cart.types';
import { CartService } from '@/services/cart.service';
import * as Haptics from 'expo-haptics';

interface CartOptions {
  color?: string;
  size?: string;
}

interface UseCartReturn {
  items: CartItem[];
  coupon: Coupon | null;
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number, options?: CartOptions) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
}

export function useCart(): UseCartReturn {
  const items = useCartStore((state) => state.items);
  const coupon = useCartStore((state) => state.coupon);
  const isLoading = useCartStore((state) => state.isLoading);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQty = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clearCart);
  const setCoupon = useCartStore((state) => state.applyCoupon);
  const clearCoupon = useCartStore((state) => state.removeCoupon);
  const setLoading = useCartStore((state) => state.setLoading);
  const getItemCount = useCartStore((state) => state.itemCount);
  const getSubtotal = useCartStore((state) => state.subtotal);
  const getDiscount = useCartStore((state) => state.discount);
  const getShipping = useCartStore((state) => state.shipping);
  const getTax = useCartStore((state) => state.tax);
  const getTotal = useCartStore((state) => state.total);

  const addToCart = useCallback((product: Product, quantity = 1, options: CartOptions = {}) => {
    addItem(product, quantity, options);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [addItem]);

  const removeFromCart = useCallback((itemId: string) => {
    removeItem(itemId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [removeItem]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    updateQty(itemId, quantity);
  }, [updateQty]);

  const clearCart = useCallback(() => {
    clear();
  }, [clear]);

  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    setLoading(true);

    try {
      const validatedCoupon: Coupon = await CartService.validateCoupon(code);
      setCoupon(validatedCoupon);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return true;
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [setCoupon, setLoading]);

  const removeCoupon = useCallback(() => {
    clearCoupon();
  }, [clearCoupon]);

  return {
    items,
    coupon,
    itemCount: getItemCount(),
    subtotal: getSubtotal(),
    discount: getDiscount(),
    shipping: getShipping(),
    tax: getTax(),
    total: getTotal(),
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };
}
