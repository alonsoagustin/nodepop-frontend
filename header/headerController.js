import { createButton } from '../lib/createButton.js';

export const headerController = (buttonContainer) => {
  const handleHeaderButton = (isAuthenticated) => {
    if (isAuthenticated) {
      const logoutButton = { content: 'Log out', style: 'btn-light', href: 'login.html' };
      const buttons = createButton(logoutButton);
      buttons.forEach((button) => buttonContainer.appendChild(button));
    } else {
      const loginButton = {
        content: 'Log in',
        style: 'btn-light',
        href: 'login.html',
        htmlContent: null,
      };
      const signupButton = {
        content: 'Sign up',
        style: 'btn-outline-light',
        href: 'signup.html',
        htmlContent: null,
      };
      const buttons = createButton(loginButton, signupButton);
      buttons.forEach((button) => buttonContainer.appendChild(button));
    }
  };
  return { handleHeaderButton };
};
