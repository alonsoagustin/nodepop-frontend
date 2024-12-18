import { fireEvent } from '../posts/postsController.js';
import { authenticateUser } from './loginModel.js';

export const loginController = (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const userObject = { username, password };

    handlerAuthenticateUser(userObject);
  });
};

const handlerAuthenticateUser = async (userObject) => {
  try {
    const token = await authenticateUser(userObject);
    localStorage.setItem('jwt', token);
    window.location.href = 'index.html';
  } catch (error) {
    const form = document.querySelector('form');
    fireEvent(error.message, 'danger', form);
  }
};
