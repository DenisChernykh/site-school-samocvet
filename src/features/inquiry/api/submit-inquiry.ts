import type { Inquiry } from '@/shared/api/types';
import { validateInquiry } from '../model/validation';

export async function submitInquiry(inquiry: Inquiry) {
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length) return { status: 'invalid' as const, errors };
  // The demo only exercises local form states. It never persists or sends data.
  await new Promise((resolve) => setTimeout(resolve, 250));
  return { status: 'preview' as const };
}
