import { render } from '@testing-library/react';
import React from 'react';

import NextAuthSessionProvider from '@/providers/nextAuthSessionProvider';

jest.mock('next-auth/react', () => ({
  SessionProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe('NextAuthSessionProvider', () => {
  test('should render session provide', () => {
    const { getByTestId } = render(
      <NextAuthSessionProvider>
        <div data-testid='child-component'>test</div>
      </NextAuthSessionProvider>
    );
    expect(getByTestId('child-component')).toBeInTheDocument();
  });
});
