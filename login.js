import { headerController } from './header/headerController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { messageController } from './message/messageController.js';
import { loginController } from './login/loginController.js';
import { hasToken } from './lib/authUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  // seleccionamos los elementos necesarios del DOM
  const buttonContainer = document.querySelector('.button__container');
  const spinnerContainer = document.querySelector('.spinner__container');
  const messageContainer = document.querySelector('.message__container');
  const form = document.querySelector('form');

  // verificamos si el usuario tiene un token.
  const userIsAuthenticated = hasToken();

  // iniciamos el controlador del header.
  const { handleHeaderButton } = headerController(buttonContainer);

  // iniciamos el controlador del spinner.
  const { handleSpinner } = spinnerController(spinnerContainer);

  // iniciamos el controlador de mensajes.
  const { showNotification } = messageController(messageContainer);

  // iniciamos el controlador de login.
  const { handleAuthUser } = loginController(form);

  handleSpinner();
  handleHeaderButton(userIsAuthenticated);
  handleAuthUser();
});
