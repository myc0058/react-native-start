import { useCallback, useState } from 'react';
import { useAuthStore } from '@/stores';
import { AuthService } from '@/services/auth.service';
import { LoginData, RegisterData, User } from '@/types/user.types';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.login);
  const clearAuth = useAuthStore((state) => state.logout);
  const setUser = useAuthStore((state) => state.setUser);
  const setStoreLoading = useAuthStore((state) => state.setLoading);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(data);
      setAuth(response.user, response.tokens);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
      setStoreLoading(false);
    }
  }, [setAuth, setStoreLoading]);

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setStoreLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(data);
      setAuth(response.user, response.tokens);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
      setStoreLoading(false);
    }
  }, [setAuth, setStoreLoading]);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await AuthService.logout();
    } catch {
      // Ignore logout errors
    } finally {
      clearAuth();
      setIsLoading(false);
    }
  }, [clearAuth]);

  const refreshUser = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) return;

    try {
      const userData = await AuthService.getMe();
      setUser(userData);
    } catch {
      // Token might be expired
      clearAuth();
    }
  }, [isAuthenticated, setUser, clearAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshUser,
  };
}
