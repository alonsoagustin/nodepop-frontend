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
    await authenticateUser(userObject);
    window.location.href = 'http://127.0.0.1:8080/index.html';
  } catch (error) {
    const form = document.querySelector('form');
    fireEvent(error.message, 'danger', form);
  }
};
