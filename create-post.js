import { headerController } from './header/headerController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { messageController } from './message/messageController.js';
import { createPostController } from './create-post/createPostController.js';
import { hasToken } from './lib/user.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const buttonContainer = document.querySelector('.button__container');
  const spinnerContainer = document.querySelector('.spinner__container');
  const messageContainer = document.querySelector('.message__container');

  // verificamos si el usuario tiene un token.
  const userIsAuthenticated = hasToken();

  // iniciamos el controlador del header.
  const { handleHeaderButton } = headerController(buttonContainer);

  // iniciamos el controlador del spinner.
  const { handleSpinner } = spinnerController(spinnerContainer);

  // iniciamos el controlador de mensajes.
  const { showNotification } = messageController(messageContainer);

  const { handleFormSubmit } = createPostController(form);

  handleSpinner();
  handleHeaderButton(userIsAuthenticated);
  handleFormSubmit(userIsAuthenticated);
});
