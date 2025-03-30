import { describe, expect, it } from 'vitest';
import { calculateDiscount } from '../../src/utils/6.discount';

describe('calculateDiscount', () => {
  it('should return 0 when price is 0 or negative', () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-100)).toBe(0);
  });

  it('should calculate discount for VIP customers', () => {
    expect(calculateDiscount(1000000, { customerClass: 'VIP' })).toBe(100000);
  });

  it('should calculate discount for PREMIUM customers', () => {
    expect(calculateDiscount(1000000, { customerClass: 'PREMIUM' })).toBe(50000);
  });

  it('should calculate discount for NORMAL customers', () => {
    expect(calculateDiscount(1000000, { customerClass: 'NORMAL' })).toBe(0);
  });

  it('should calculate discount for no customer class', () => {
    expect(calculateDiscount(1000000, {})).toBe(0);
  });

  it('should apply WELCOME10 voucher code discount', () => {
    expect(calculateDiscount(1000000, { discountVoucherCode: 'WELCOME10' })).toBe(100000);
  });

  it('should apply BLACKFRIDAY voucher code discount', () => {
    expect(calculateDiscount(1000000, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(300000);
  });

  it('should apply 5% discount for orders over 2 million without voucher code', () => {
    expect(calculateDiscount(3000000)).toBe(150000);
  });

  it('should not apply 5% discount for orders under 2 million without voucher code', () => {
    expect(calculateDiscount(1000000)).toBe(0);
  });

  it('should combine customer class and voucher code discounts', () => {
    expect(calculateDiscount(1000000, { 
      customerClass: 'VIP', 
      discountVoucherCode: 'WELCOME10' 
    })).toBe(200000);
  });

  it('should not exceed original price when combining discounts', () => {
    expect(calculateDiscount(1000000, {
      customerClass: 'VIP',
      discountVoucherCode: 'BLACKFRIDAY'
    })).toBe(400000);
  });

  it('should not exceed original price when applying multiple discounts', () => {
    expect(calculateDiscount(1000000, {
      customerClass: 'VIP',
      discountVoucherCode: 'WELCOME10'
    })).toBe(200000);
  });
});