import { z } from 'zod';
import { PRESETS } from './constants';

export const analyzeSchema = z.object({
  preset: z.enum(PRESETS),
  seller_reputation: z.enum(['excellent', 'good', 'new', 'suspicious']),
  payment_protection: z.enum(['full', 'partial', 'none']),
  shipping_tracking: z.enum(['insured', 'tracking_only', 'none']),
  product_evidence: z.enum(['graded_or_video', 'detailed_photos', 'basic_photos', 'none']),
  price_too_good: z.boolean(),
  seller_pushes_off_platform: z.boolean(),
  urgent_sale_pressure: z.boolean(),
  refuses_timestamp: z.boolean(),
  inconsistent_story: z.boolean(),
  asks_friends_family_payment: z.boolean(),
  unwilling_live_verification: z.boolean(),
  account_recently_created: z.boolean(),
  refuses_secure_meeting_point: z.boolean(),
  note: z.string().max(500).optional().default('')
});
