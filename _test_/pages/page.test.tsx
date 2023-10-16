import { fireEvent, render } from '@testing-library/react';

import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        email: 'test@example.com',
      },
    },
  })),
}));

describe('HomePage', () => {
  test('renders correctly', () => {
    const { getByText, getByRole } = render(<HomePage />);
    const headingElement = getByRole('heading');
    expect(headingElement).toHaveTextContent('ChatGPT');

    const prompt1 = getByText('Come up with concepts');
    expect(prompt1).toBeInTheDocument();
  });

  test('handles sending test prompt', async () => {
    const { getByText } = render(<HomePage />);
    const infoTipButton = getByText('Come up with concepts');

    fireEvent.click(infoTipButton);
  });
});
