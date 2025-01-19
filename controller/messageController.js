import { createMessage } from '../view/messageView.js';

export const messageController = (messageContainer) => {
  const showNotification = (content, type) => {
    messageContainer.appendChild(createMessage(content, type));
    setTimeout(() => {
      const alerts = document.querySelectorAll('.alert');
      alerts.forEach((alert) => {
        alert.classList.add('visually-hidden');
      });
    }, 2000);
  };
  return { showNotification };
};
