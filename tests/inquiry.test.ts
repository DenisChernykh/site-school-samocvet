import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isValidContact,
  validateInquiry,
} from '../src/features/inquiry/model/validation';
import { submitInquiry } from '../src/features/inquiry/api/submit-inquiry';

test('contact accepts phone and VK, but rejects wrong domains and incomplete contacts', () => {
  for (const value of [
    '+7 (904) 988-70-39',
    '89049887039',
    'https://vk.com/family',
    'vk.ru/family',
    'https://vk.me/family',
    '@family',
  ])
    assert.equal(isValidContact(value), true, value);
  for (const value of [
    '',
    '12345',
    'family',
    'https://vk.com.evil.example/family',
    'https://evil.example/vk.com',
    'http://vk.com/family',
    'javascript:alert(1)',
    'https://vk.com/',
    'https://name:pass@vk.com/family',
  ])
    assert.equal(isValidContact(value), false, value);
});

test('validation reports every required field and bounds optional message', () => {
  assert.deepEqual(
    Object.keys(
      validateInquiry({
        name: ' ',
        contact: 'bad',
        message: 'x'.repeat(2001),
        consent: false,
        source: 'admission',
      }),
    ),
    ['name', 'contact', 'message', 'consent'],
  );
  assert.deepEqual(
    validateInquiry({
      name: ' Анна ',
      contact: '+7 904 988-70-39',
      message: '',
      consent: true,
      source: 'contacts',
    }),
    {},
  );
});

test('mock submission returns preview and never makes a network request', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error('Demo must not send data');
  };
  try {
    assert.deepEqual(
      await submitInquiry({
        name: 'Анна',
        contact: '+7 904 988-70-39',
        message: 'Экскурсия',
        consent: true,
        source: 'admission',
      }),
      { status: 'preview' },
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
