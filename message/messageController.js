import { renderMessage, renderWelcomeMessage } from '../message/messageView.js';

export const messageController = (messageContainer) => {
  /**
   *
   * @param {HTMLElement} messageContainer - El contenedor donde se mostrará el mensaje de error.
   * @returns {Function} Una funcion "showMessage" que muestra el mensaje (recibido como parametro) en el contenedor especificado.
   */

  const showWelcomeMessage = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      messageContainer.appendChild(renderWelcomeMessage(payload));
    }
  };

  const showMessage = (message, type = 'success') => {
    messageContainer.appendChild(renderMessage(message, type));
    setTimeout(() => {
      const alerts = document.querySelectorAll('.alert');
      alerts.forEach((alert) => {
        alert.classList.add('visually-hidden');
      });
    }, 5000);
  };
  return { showMessage, showWelcomeMessage };
};
