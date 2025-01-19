export const createMessage = (content, type = null, userObject = null) => {
  const message = document.createElement('p');
  if (userObject) {
    // renderizamos mensaje de bienvenida
    message.textContent = `Welcome back ${userObject.username.split('@'[0].toLowerCase())}!`;
    message.classList.add('fs-3', 'text-center', 'fw-bold');
    return message;
  } else {
    message.classList.add('alert', `alert-${type}`, 'text-center', 'mb-2');
    message.textContent = `${content}`;
    return message;
  }
};
