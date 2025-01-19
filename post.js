import { headerController } from './header/headerController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { messageController } from './message/messageController.js';
import { postDetailController } from './postDetail/postDetailController.js';
import { postActionController } from './postAction/postActionController.js';
import { hasToken } from './lib/user.js';

document.addEventListener('DOMContentLoaded', () => {
  // seleccionamos los elementos necesarios del DOM
  const buttonContainer = document.querySelector('.button__container');
  const spinnerContainer = document.querySelector('.spinner__container');
  const messageContainer = document.querySelector('.message__container');
  const mainSection = document.querySelector('.main__section');

  // verificamos si el usuario tiene un token.
  const userIsAuthenticated = hasToken();

  // iniciamos el controlador del header.
  const { handleHeaderButton } = headerController(buttonContainer);

  // iniciamos el controlador del spinner.
  const { handleSpinner } = spinnerController(spinnerContainer);

  // iniciamos el controlador de mensajes.
  const { showNotification } = messageController(messageContainer);

  const { handlePostDetail } = postDetailController(mainSection);

  // iniciamos el controlador de los botones de acción.
  const { handlePostActionButtons } = postActionController(mainSection);

  // renderizamos botones de signup, login o logout segun corresponda.
  handleHeaderButton(userIsAuthenticated);

  setTimeout(() => {
    handlePostDetail();

    if (userIsAuthenticated) {
      handlePostActionButtons();
    }
  }, 600);
});
