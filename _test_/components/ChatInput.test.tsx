import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

import ChatInput from '@/components/ChatInput';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

const mockSession = {
  data: {
    user: {
      email: 'test@example.com',
      name: 'Test User',
      image: 'https://example.com/test-image.jpg',
    },
  },
};

global.fetch = jest.fn();

describe('ChatInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        status: 200,
      })
    );
  });

  it('renders ChatInput component correctly', () => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    render(<ChatInput chatId='chat123' />);

    expect(screen.getByPlaceholderText('Send a message')).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();
  });

  it('submits a message when form is submitted', async () => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    render(<ChatInput chatId='chat123' />);

    const message = 'This is a test message';
    const textarea = screen.getByPlaceholderText('Send a message');
    const submitButton = screen.getByTestId('submit');

    fireEvent.change(textarea, { target: { value: message } });
    fireEvent.click(submitButton);
  });
});
