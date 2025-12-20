import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '@/utils/storage';
import { User, AuthTokens } from '@/types/user.types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  login: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setTokens: (tokens) => set({ tokens }),

      login: (user, tokens) =>
        set({
          user,
          tokens,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setLoading: (isLoading) => set({ isLoading }),

      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
