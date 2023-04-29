// Description: Testing for background image component

import Background from './Background';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

describe('Background', () => {
  test('renders a background overlay', () => {
    render(<Background />);
    const overlay = screen.getByTestId('background-overlay');
    expect(overlay).toHaveStyle('backgroundColor: rgba(0, 0, 0, 0.35)');
    expect(overlay).toHaveStyle('opacity: 0.4');
  });

  test('renders a background image', () => {
    render(<Background />);
    const image = screen.getByTestId('background-image');
    expect(image).toHaveStyle(`backgroundImage: url('https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`);
    expect(image).toHaveStyle('backgroundPosition: center');
    expect(image).toHaveStyle('backgroundSize: cover');
    expect(image).toHaveStyle('backgroundRepeat: repeat');
  });
});
