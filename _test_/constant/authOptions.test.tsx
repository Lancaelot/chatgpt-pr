import { authOptions } from '@/constant/authOptions';

describe('Authentication Options', () => {
  test('should contain GoogleProvider with correct configuration', () => {
    const googleProvider = authOptions.providers.find(
      (provider) => provider.id === 'google'
    );

    expect(googleProvider).toBeDefined();

    expect(googleProvider?.options?.clientId).toBe(process.env.GOOGLE_ID || '');
    expect(googleProvider?.options?.clientSecret).toBe(
      process.env.GOOGLE_SECRET || ''
    );
  });
});
