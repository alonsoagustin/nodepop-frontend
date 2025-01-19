import { headerController } from '../controller/headerController.js';
import { spinnerController } from '../controller/spinnerController.js';
import { messageController } from '../controller/messageController.js';
import { signupController } from '../controller/signupController.js';
import { hasToken } from '../lib/authUtils.js';

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

  // iniciamos el controlador de signup.
  const { handleSignup } = signupController(form);

  handleSpinner();
  handleHeaderButton(userIsAuthenticated);
  handleSignup();

  // escuchamos eventos del tipo userMessage (CustomEVent) en el formulario.
  form.addEventListener('appNotification', (event) => {
    const { content, type } = event.detail;
    if (type === 'loading') {
      handleSpinner();
    }
    if (type === 'created') {
      setTimeout(() => {
        handleSpinner();
        showNotification(content, 'success');
      }, 600);
    }

    if (type === 'success') {
      setTimeout(() => {
        location.href = 'index.html';
      }, 2000);
    }
    if (type === 'danger') {
      setTimeout(() => {
        handleSpinner();
        showNotification(content, type);
      }, 600);
    }
  });
});
