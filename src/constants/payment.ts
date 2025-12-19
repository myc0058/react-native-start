import { PaymentType } from '@/types/order.types';

/**
 * Payment Constants
 */

export const PAYMENT_METHODS: Array<{
  type: PaymentType;
  name: string;
  icon: string;
}> = [
  {
    type: 'card',
    name: 'Credit/Debit Card',
    icon: 'card-outline',
  },
  {
    type: 'bank',
    name: 'Bank Transfer',
    icon: 'business-outline',
  },
  {
    type: 'mobile',
    name: 'Mobile Payment',
    icon: 'phone-portrait-outline',
  },
  {
    type: 'cash',
    name: 'Cash on Delivery',
    icon: 'cash-outline',
  },
];

export const CARD_BRANDS = [
  { name: 'Visa', pattern: /^4/ },
  { name: 'Mastercard', pattern: /^5[1-5]/ },
  { name: 'American Express', pattern: /^3[47]/ },
  { name: 'Discover', pattern: /^6(?:011|5)/ },
];

export function detectCardBrand(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, '');
  const brand = CARD_BRANDS.find((b) => b.pattern.test(cleaned));
  return brand?.name || 'Unknown';
}
