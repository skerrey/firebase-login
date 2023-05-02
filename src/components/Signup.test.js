// Description: Tests for Signup component

import Signup from './Signup';
import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockSignup = jest.fn();
const mockLoading = jest.fn()
const mockNavigate = jest.fn();
const mockUpdateInfo = jest.fn();

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      signup: mockSignup,
      updateInfo: mockUpdateInfo,
      loading: mockLoading
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <Signup />
  </BrowserRouter>
)

describe('Signup', () => {
  test('renders the Signup form', () => {
    render(mockRouter);
    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByTestId('first-name-label')).toBeInTheDocument();
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-label')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-label')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-label')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-confirm-label')).toBeInTheDocument();
    expect(screen.getByTestId('password-confirm-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  test('signup button', async () => {
    render(mockRouter);
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });
    await user.click(signupButton);
    await mockUpdateInfo.mockImplementationOnce(() => 'John Doe');
    expect(mockSignup).toHaveBeenCalled();
  });

  test('capitalize name function', async () => {
    const capitalize = (name) => {
      return name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    expect(capitalize('john doe')).toBe('John Doe');
  });

  test('sign up new user', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'test@example.com';
    const password = 'password';
    const confirmPassword = 'password';

    render(mockRouter);

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('password-confirm-input');
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(firstNameInput, { target: { value: firstName } });
    fireEvent.change(lastNameInput, { target: { value: lastName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });

    expect(mockLoading).toBeTruthy();
    await user.click(signupButton);
    await mockUpdateInfo.mockImplementationOnce(() => 'John Doe');
    expect(mockSignup).toHaveBeenCalledWith(email, password);
    expect(mockUpdateInfo).toHaveBeenCalledWith('John Doe');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('passwords do not match', async () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'test@example.com';
    const password = 'password';
    const confirmPassword = 'password1';

    render(mockRouter);

    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('password-confirm-input');
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });

    fireEvent.change(firstNameInput, { target: { value: firstName } });
    fireEvent.change(lastNameInput, { target: { value: lastName } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: confirmPassword } });

    await user.click(signupButton);
    expect(mockSignup).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('renders error message when signup fails', async () => {
    mockSignup.mockImplementation(() => {
      throw new Error();
    });
    render(mockRouter);
    const signupButton = screen.getByRole('button', { name: 'Sign Up' });
    await user.click(signupButton);
    expect(screen.getByText('Failed to create an account')).toBeInTheDocument();
  });

  test('signup button, redirects to signup page', async () => {
    render(mockRouter);
    const signupButton = screen.getByRole('button', { name: 'Sign Up'})
    await user.click(signupButton);
    expect(window.location.pathname).toBe('/');
  });
});
