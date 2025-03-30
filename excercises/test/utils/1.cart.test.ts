import { describe, it, expect } from 'vitest';
import { calculateTotalPrice, Product } from '../../src/utils/1.cart';

describe('calculateTotalPrice', () => {
  it('should return 0 for empty cart', () => {
    const products: Product[] = [];
    const total = calculateTotalPrice(products);
    expect(total).toBe(0);
  });

  it('should return the price of a single product', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 1 },
    ];
    const total = calculateTotalPrice(products);
    expect(total).toBe(100);
  });

  it('should return the total price for multiple products', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 2 },
      { product_id: 2, price: 50, quantity: 3 },
    ];
    const total = calculateTotalPrice(products);
    expect(total).toBe(350);
  });

  it('should handle large quantities', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 1000 },
    ];
    const total = calculateTotalPrice(products);
    expect(total).toBe(100000);
  });
}
);    