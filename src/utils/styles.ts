import { StyleSheet } from 'react-native';

/**
 * Style Utilities
 * Helper functions for creating styles
 */

/**
 * Conditionally merge styles
 */
export function mergeStyles<T>(...styles: (T | false | undefined | null)[]): T[] {
  return styles.filter(Boolean) as T[];
}

/**
 * Create responsive styles based on screen width
 */
export function createResponsiveStyle<T>(
  base: T,
  tablet?: Partial<T>,
  desktop?: Partial<T>
): T {
  return StyleSheet.flatten([
    base,
    tablet && { ...tablet },
    desktop && { ...desktop },
  ]) as T;
}

/**
 * Create style with opacity
 */
export function withOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
