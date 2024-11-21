import { messageController } from './message/messageController.js';
import { signupController } from './signup/signupController.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const messageContainer = document.querySelector('.message__container');

  // iniciamos messageController
  const showMessage = messageController(messageContainer);

  // iniciar signupController
  signupController(form);

  form.addEventListener('userMessage', (event) => {
    showMessage(event.detail.message, event.detail.type);
  });
});
