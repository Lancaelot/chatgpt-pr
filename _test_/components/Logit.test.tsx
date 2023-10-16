import { fireEvent, render } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import React from 'react';

import Login from '@/components/Login';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Login', () => {
  test('should render the Login component', () => {
    const { getByAltText, getByText } = render(<Login />);

    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText('Sign in with google')).toBeInTheDocument();
  });

  test('should call signIn when button is clicked', () => {
    const { getByText } = render(<Login />);
    const signInButton = getByText('Sign in with google');

    fireEvent.click(signInButton);

    expect(signIn).toHaveBeenCalledWith('google');
  });
});
