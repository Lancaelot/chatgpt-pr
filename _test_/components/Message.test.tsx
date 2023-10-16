import { render } from '@testing-library/react';
import React from 'react';

import Message from '@/components/Message';

const mockMessage = {
  text: 'This is a test message.',
  user: {
    name: 'ChatGPT',
    avatar: 'path/to/avatar.png',
  },
};

const mockRegularMessage = {
  text: 'This is a regular message.',
  user: {
    name: 'John Doe',
    avatar: 'path/to/avatar.png',
  },
};

describe('Message', () => {
  test('should render a message from ChatGPT with correct styling', () => {
    const { getByTestId } = render(<Message message={mockMessage} />);

    const MessageContainer = getByTestId('message');

    expect(MessageContainer).toBeInTheDocument();

    expect(MessageContainer).toHaveClass('bg-gray-light');
  });

  test('should render a regular message with correct styling', () => {
    const { getByTestId } = render(<Message message={mockRegularMessage} />);

    const MessageContainer = getByTestId('message');

    expect(MessageContainer).toBeInTheDocument();

    expect(MessageContainer).not.toHaveClass('bg-gray-light');
  });

  test('should render a message with avatar', () => {
    const { getByTestId } = render(<Message message={mockMessage} />);

    const imgElement = getByTestId('message-userAvatar');

    expect(imgElement).toBeInTheDocument();
  });
});
