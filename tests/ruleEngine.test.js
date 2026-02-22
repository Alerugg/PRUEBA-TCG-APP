import { describe, expect, test } from 'vitest';
import { analyzeRisk } from '../lib/ruleEngine';

const safePayload = {
  preset: 'cardmarket',
  seller_reputation: 'excellent',
  payment_protection: 'full',
  shipping_tracking: 'insured',
  product_evidence: 'graded_or_video',
  price_too_good: false,
  seller_pushes_off_platform: false,
  urgent_sale_pressure: false,
  refuses_timestamp: false,
  inconsistent_story: false,
  asks_friends_family_payment: false,
  unwilling_live_verification: false,
  account_recently_created: false,
  refuses_secure_meeting_point: false,
  note: ''
};

describe('rule engine', () => {
  test('returns low band for safe scenario', async () => {
    const result = await analyzeRisk(safePayload);
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.band).toBe('low');
    expect(result.messages).toHaveLength(3);
  });

  test('returns high band for risky scenario', async () => {
    const result = await analyzeRisk({
      ...safePayload,
      preset: 'in_person',
      seller_reputation: 'suspicious',
      payment_protection: 'none',
      shipping_tracking: 'none',
      product_evidence: 'none',
      price_too_good: true,
      seller_pushes_off_platform: true,
      urgent_sale_pressure: true,
      refuses_timestamp: true,
      inconsistent_story: true,
      asks_friends_family_payment: true,
      unwilling_live_verification: true,
      account_recently_created: true,
      refuses_secure_meeting_point: true
    });

    expect(result.score).toBeGreaterThan(66);
    expect(result.band).toBe('high');
    expect(result.top_reasons.length).toBeLessThanOrEqual(5);
    expect(result.action_plan).toHaveLength(3);
  });
});
