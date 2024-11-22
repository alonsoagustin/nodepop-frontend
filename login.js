import { loginController } from './login/loginController.js';
import { messageController } from './message/messageController.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const messageContainer = document.querySelector('.message__container');

  loginController(form);

  const showMessage = messageController(messageContainer);

  form.addEventListener('userMessage', (event) => {
    showMessage(event.detail.message, event.detail.type);
  });
});
