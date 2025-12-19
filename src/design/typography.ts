/**
 * Typography System
 * Font sizes, weights, and line heights
 */

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Text styles
  heading: {
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: 16,
      fontWeight: '500' as const,
      lineHeight: 1.5,
    },
  },

  body: {
    large: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.6,
    },
    medium: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    small: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
  },

  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 1.4,
  },

  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 1.2,
  },
} as const;

export type Typography = typeof typography;
