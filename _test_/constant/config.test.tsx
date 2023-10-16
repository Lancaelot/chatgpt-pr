import { siteConfig } from '@/constant/config';
describe('Site Configuration', () => {
  test('should have the correct properties', () => {
    expect(siteConfig.title).toBe('Dumber version of ChatGPT');
    expect(siteConfig.description).toBe('This is just a dumb application');
    expect(siteConfig.url).toBe('https://chatgpt-pr.vercel.app/');
  });
});
