import { useCallback } from 'react';
import { useWishlistStore } from '@/stores';
import { Product } from '@/types/product.types';
import * as Haptics from 'expo-haptics';

interface UseWishlistReturn {
  items: Product[];
  itemCount: number;
  isLoading: boolean;
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

export function useWishlist(): UseWishlistReturn {
  const store = useWishlistStore();

  const addToWishlist = useCallback((product: Product) => {
    store.addItem(product);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [store]);

  const removeFromWishlist = useCallback((productId: string) => {
    store.removeItem(productId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [store]);

  const toggleWishlist = useCallback((product: Product) => {
    const isInList = store.isInWishlist(product.id);
    store.toggleItem(product);

    if (isInList) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [store]);

  const clearWishlist = useCallback(() => {
    store.clearWishlist();
  }, [store]);

  return {
    items: store.items,
    itemCount: store.items.length,
    isLoading: store.isLoading,
    isInWishlist: store.isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
