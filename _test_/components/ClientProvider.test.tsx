import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import ClientProvider from '@/components/ClientProvider';
jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(),
  toast: {
    success: jest.fn(),
  },
}));
describe('ClientProvider', () => {
  beforeEach(() => {
    (ToastContainer as any).mockImplementation(() => (
      <>
        <div data-testid='toast-container' />{' '}
        <button
          data-testid='toast-button'
          onClick={() => toast.success('This is a toast message!')}
        />
      </>
    ));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the ClientProvider component', () => {
    const { getByTestId } = render(<ClientProvider />);

    expect(getByTestId('toast-container')).toBeInTheDocument();
  });

  test('should trigger toast when button is clicked', () => {
    const { getByTestId } = render(<ClientProvider />);
    const toastButton = getByTestId('toast-button');

    act(() => {
      fireEvent.click(toastButton);
    });

    expect(toast.success).toBeCalledWith('This is a toast message!');
  });
});
