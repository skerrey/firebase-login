// Description: Tests for UpdateProfile component

import UpdateProfile from './UpdateProfile';
import { fireEvent, render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from 'react-router-dom';

const user = userEvent.setup();
const mockUpdateEmail = jest.fn();
const mockUpdatePassword = jest.fn();
const mockUpdateInfo = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => {
    return {  
      currentUser: {
        displayName: 'John Doe',
        email: 'test@example.com',
      },
      updateEmail: mockUpdateEmail,
      updatePassword: mockUpdatePassword,
      updateInfo: mockUpdateInfo,
    }
  }
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockRouter = (
  <BrowserRouter>
    <UpdateProfile />
  </BrowserRouter>
)

describe('UpdateProfile', () => {
  test('renders the update profile form', () => {
    render(mockRouter);
    expect(screen.getByRole('heading', { name: 'Update Profile' })).toBeInTheDocument();
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cancel'})).toBeInTheDocument();
  });

  test('renders preloaded user info in form', () => {
    render(mockRouter);
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('test@example.com');
  });

  test('calls update functions and navigates to home page on form submission', async () => {
    render(mockRouter);
    const firstNameInput = screen.getByTestId('first-name-input');
    const lastNameInput = screen.getByTestId('last-name-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const passwordConfirmInput = screen.getByTestId('password-confirm-input');
    const updateButton = screen.getByRole('button', { name: 'Update' });

    // fill out form inputs
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');
    await user.clear(lastNameInput);
    await user.type(lastNameInput, 'Doe');
    await user.clear(emailInput);
    await user.type(emailInput, 'janedoe@example.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'newpassword');
    await user.clear(passwordConfirmInput);
    await user.type(passwordConfirmInput, 'newpassword');

    // submit form
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(updateButton);
    });

    // check that update functions were called with correct values
    expect(mockUpdateInfo).toHaveBeenCalledWith('Jane Doe');
    expect(mockUpdateEmail).toHaveBeenCalledWith('janedoe@example.com');
    expect(mockUpdatePassword).toHaveBeenCalledWith('newpassword');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });


  test('cancel button, redirects to signup page', async () => {
    render(mockRouter);
    const cancelButton = screen.getByRole('link', { name: 'Cancel'})
    await user.click(cancelButton);
    expect(window.location.pathname).toBe('/');
  });
});
