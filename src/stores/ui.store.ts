import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface Modal {
  id: string;
  component: string;
  props?: Record<string, unknown>;
}

interface UIState {
  isGlobalLoading: boolean;
  loadingMessage: string | null;
  toasts: Toast[];
  activeModal: Modal | null;
  bottomSheetVisible: boolean;
  bottomSheetContent: string | null;
  networkConnected: boolean;
}

interface UIActions {
  setGlobalLoading: (loading: boolean, message?: string | null) => void;
  showToast: (type: ToastType, message: string, duration?: number) => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
  openModal: (component: string, props?: Record<string, unknown>) => void;
  closeModal: () => void;
  openBottomSheet: (content: string) => void;
  closeBottomSheet: () => void;
  setNetworkConnected: (connected: boolean) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>((set) => ({
  // State
  isGlobalLoading: false,
  loadingMessage: null,
  toasts: [],
  activeModal: null,
  bottomSheetVisible: false,
  bottomSheetContent: null,
  networkConnected: true,

  // Actions
  setGlobalLoading: (isGlobalLoading, loadingMessage = null) =>
    set({ isGlobalLoading, loadingMessage }),

  showToast: (type, message, duration = 3000) =>
    set((state) => {
      const id = `toast-${Date.now()}`;
      const newToast: Toast = { id, type, message, duration };
      return { toasts: [...state.toasts, newToast] };
    }),

  hideToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),

  openModal: (component, props) =>
    set({
      activeModal: {
        id: `modal-${Date.now()}`,
        component,
        props,
      },
    }),

  closeModal: () => set({ activeModal: null }),

  openBottomSheet: (content) =>
    set({ bottomSheetVisible: true, bottomSheetContent: content }),

  closeBottomSheet: () =>
    set({ bottomSheetVisible: false, bottomSheetContent: null }),

  setNetworkConnected: (networkConnected) => set({ networkConnected }),
}));
