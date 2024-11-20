import { renderMessage } from '../message/messageView.js';

export const messageController = (messageContainer) => {
  /**
   *
   * @param {HTMLElement} messageContainer - El contenedor donde se mostrará el mensaje de error.
   * @returns {Function} Una funcion "showMessage" que muestra el mensaje (recibido como parametro) en el contenedor especificado.
   */
  const showMessage = (message, type = 'success') => {
    messageContainer.classList.toggle('visually-hidden');
    messageContainer.innerHTML = renderMessage(message, type);
  };
  return showMessage;
};
