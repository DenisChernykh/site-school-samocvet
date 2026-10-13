import type { Inquiry, InquiryField } from '@/shared/api/types';

export function isValidContact(contact: string): boolean {
  const value = contact.trim();
  if (/^\+?[\d\s().-]+$/.test(value)) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }
  if (/^@[a-z\d_.]{3,64}$/i.test(value)) return true;
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      ['vk.com', 'vk.ru', 'vk.me', 'm.vk.com', 'm.vk.ru'].includes(
        url.hostname,
      ) &&
      /^\/[a-z\d_.-]+\/?$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function validateInquiry(
  inquiry: Inquiry,
): Partial<Record<InquiryField, string>> {
  const errors: Partial<Record<InquiryField, string>> = {};
  if (inquiry.name.trim().length < 2 || inquiry.name.trim().length > 80)
    errors.name = 'Укажите имя: от 2 до 80 символов.';
  if (inquiry.contact.trim().length > 160 || !isValidContact(inquiry.contact))
    errors.contact =
      'Укажите телефон с кодом города или страны либо ссылку на профиль VK.';
  if (inquiry.message.trim().length > 2000)
    errors.message = 'Сократите вопрос до 2000 символов.';
  if (!inquiry.consent)
    errors.consent = 'Отметьте согласие, чтобы проверить форму.';
  return errors;
}
