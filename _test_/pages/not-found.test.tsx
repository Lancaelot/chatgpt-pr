import { render } from '@testing-library/react';

import NotFound from '@/app/not-found';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    asPath: '/non-existent-route',
  })),
}));

describe('ErrorPage', () => {
  test('renders correctly NotFound page', () => {
    const { getByText } = render(<NotFound />);

    const notFoundText = getByText('Page Not Found');
    expect(notFoundText).toBeInTheDocument();
  });
});
