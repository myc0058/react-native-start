import { format, formatDistanceToNow } from 'date-fns';

/**
 * Formatting Utilities
 * Price, date, and number formatters
 */

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = '₩'): string {
  return `${currency}${price.toLocaleString()}`;
}

/**
 * Format discount percentage
 */
export function formatDiscount(originalPrice: number, discountedPrice: number): string {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  return `${discount}%`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date, formatString: string = 'MMM d, yyyy'): string {
  return format(new Date(date), formatString);
}

/**
 * Format date to relative time
 */
export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/**
 * Format phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}

/**
 * Format card number with masking
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  const masked = cleaned.slice(0, -4).replace(/./g, '*');
  const last4 = cleaned.slice(-4);
  return `${masked}${last4}`.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Format rating (1 decimal place)
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/**
 * Format large numbers (1K, 1M, etc.)
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Format order number
 */
export function formatOrderNumber(orderNumber: string): string {
  return `#${orderNumber}`;
}
