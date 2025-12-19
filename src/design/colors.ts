/**
 * Color Palette for Shopping Mall App
 * Dark theme with glass morphism style
 */

export const colors = {
  // Primary colors
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#4A90E2',
    500: '#357ABD',
    600: '#1976D2',
    700: '#1565C0',
    800: '#0D47A1',
    900: '#0A3D91',
  },

  // Background colors
  background: {
    primary: '#0B1020',
    secondary: '#151B2E',
    tertiary: '#1A1F35',
    card: 'rgba(26, 31, 53, 0.7)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B4B9C8',
    tertiary: '#6B7280',
    disabled: '#4B5563',
    inverse: '#0B1020',
  },

  // Accent colors
  accent: {
    purple: '#8B5CF6',
    blue: '#3B82F6',
    pink: '#EC4899',
    teal: '#14B8A6',
  },

  // Status colors
  success: {
    light: '#86EFAC',
    main: '#22C55E',
    dark: '#16A34A',
  },

  error: {
    light: '#FCA5A5',
    main: '#EF4444',
    dark: '#DC2626',
  },

  warning: {
    light: '#FCD34D',
    main: '#F59E0B',
    dark: '#D97706',
  },

  info: {
    light: '#93C5FD',
    main: '#3B82F6',
    dark: '#2563EB',
  },

  // Neutral colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    heavy: 'rgba(255, 255, 255, 0.3)',
  },

  // Overlay colors
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
  },

  // Gradients
  gradients: {
    primary: ['#4A90E2', '#357ABD'],
    accent: ['#8B5CF6', '#EC4899'],
    dark: ['#1A1F35', '#0B1020'],
    success: ['#22C55E', '#16A34A'],
  },
} as const;

export type Colors = typeof colors;
