import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '../input';

describe('Input Component', () => {
  it('renders correctly with default props', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders with a label when provided', () => {
    render(<Input label="Email" id="email" />);
    const label = screen.getByText('Email');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
  });

  it('displays an error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} />);
    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
  });

  it('applies the correct class when there is an error', () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('renders with an icon when provided', () => {
    const iconTestId = 'test-icon';
    render(<Input icon={<div data-testid={iconTestId} />} />);
    const icon = screen.getByTestId(iconTestId);
    expect(icon).toBeInTheDocument();
  });
}); 