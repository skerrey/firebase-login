// Description: Tests for Dashboard component

import Dashboard from './Dashboard';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockLogout = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      currentUser: {
        displayName: 'John Doe',
        email: 'test@example.com'
      },
      logout: mockLogout
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>
)

describe('Dashboard', () => {
  test('renders user information', () => {
    render(mockRouter);
    expect(screen.getByTestId('displayName')).toHaveTextContent('Name: John Doe');
    expect(screen.getByTestId('email')).toHaveTextContent('Email: test@example.com');
  });

  test('logout button, logging out user', async () => {
    render(mockRouter);
    const logoutButton = screen.getByRole('button', { name: 'Log Out' });
    await user.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  test('logging out user and redirect to login page', async () => {
    render(mockRouter);
    const logoutButton = screen.getByRole('button', { name: 'Log Out' });
    await user.click(logoutButton); 
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('update profile button, navigate to settings page', async () => {
    render(mockRouter);
    const updateProfileButton = screen.getByTestId('update-profile-link');
    await user.click(updateProfileButton);
    expect(window.location.pathname).toBe('/settings');
  });

  test('renders error message when logout fails', async () => {
    mockLogout.mockImplementation(() => {
      throw new Error();
    });
    render(mockRouter);
    const logoutButton = screen.getByRole('button', { name: 'Log Out' });
    await user.click(logoutButton);
    expect(screen.getByText('Failed to log out')).toBeInTheDocument();
  });
});
