import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import InfoTipCta from '@/components/InfoTipButton';
describe('InfoTipCta', () => {
  const mockProps = {
    title: 'Title',
    text: 'Some description text.',
    onClick: jest.fn(),
  };

  test('should render InfoTipCta with correct content', () => {
    const { getByText } = render(<InfoTipCta {...mockProps} />);

    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Some description text.')).toBeInTheDocument();
  });

  test('should call onClick when button is clicked', () => {
    const { getByRole } = render(<InfoTipCta {...mockProps} />);

    fireEvent.click(getByRole('button'));

    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
