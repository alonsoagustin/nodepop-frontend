import { headerController } from './header/headerController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { messageController } from './message/messageController.js';
import { postDetailController } from './postDetail/postDetailController.js';
import { postActionController } from './postAction/postActionController.js';
import { hasToken } from './lib/authUtils.js';

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

  // escuchamos en mainSection un evento del tipo appNotification.
  mainSection.addEventListener('appNotification', (event) => {
    const { content, type } = event.detail;
    if (type === 'loading') {
      handleSpinner();
    }

    // cuando el anuncio es agregado a favoritos.
    if (type === 'addFavorite') {
      handleSpinner();
      showNotification(content, 'success');
    }

    // cuando el anuncio es eliminado de favoritos.
    if (type === 'removeFavorite') {
      handleSpinner();
      showNotification(content, 'success');
    }

    // cuando el anuncio es eliminado completamente.
    if (type === 'deleted') {
      handleSpinner();
      showNotification(content, 'success');
      setTimeout(() => {
        location.href = 'index.html';
      }, 800);
    }

    // cuando el anuncio se renderiza correctamente.
    if (type === 'success') {
      handleSpinner();
      showNotification(content, type);
    }

    if (type === 'danger') {
      handleSpinner();
      showNotification(content, type);
    }

    // cuando el usuario no ha seleccionado ninún anuncio.
    if (type === 'select') {
      handleSpinner();
      showNotification(content, 'danger');
      setTimeout(() => {
        location.href = 'index.html';
      }, 800);
    }
  });
});
