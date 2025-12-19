import { Platform, Dimensions } from 'react-native';

/**
 * Platform Utilities
 * Cross-platform helpers
 */

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

/**
 * Get platform-specific value
 */
export function platformSelect<T>(options: {
  ios?: T;
  android?: T;
  default: T;
}): T {
  if (isIOS && options.ios !== undefined) {
    return options.ios;
  }
  if (isAndroid && options.android !== undefined) {
    return options.android;
  }
  return options.default;
}

/**
 * Screen dimensions
 */
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Check if device is tablet
 */
export const isTablet = SCREEN_WIDTH >= 768;

/**
 * Check if device has notch (approximation)
 */
export const hasNotch = isIOS && SCREEN_HEIGHT >= 812;
