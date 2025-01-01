import { builtHeaderButton } from './headerView.js';

export const headerController = () => {
  const div = document.querySelector('header>div');
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    div.appendChild(builtHeaderButton('Log out', 'btn-light', 'login.html'));
  } else {
    div.appendChild(builtHeaderButton('Log in', 'btn-light', 'login.html'));
    div.appendChild(
      builtHeaderButton('Sign up', 'btn-outline-light', 'signup.html'),
    );
  }
};
