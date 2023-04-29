// Description: Tests for Home component
import Home from './Home';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

describe('Home', () => {
  test('render welcome message to authenticated user', () => {
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'testName'
      },
      loading: false
    }));
    render(<Home />);
    const welcome = screen.getByTestId('welcome-user');
    expect(welcome).toHaveTextContent('Welcome testName');
  });

  test('render welcome message to unauthenticated user', () => {
    useAuth.mockReturnValue(() => ({
      currentUser: null,
      loading: false
    }));
    render(<Home />);
    const welcome = screen.getByTestId('welcome');
    expect(welcome).toHaveTextContent('Welcome to Firebase Login App');
  });
});