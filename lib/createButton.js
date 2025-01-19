import { fireNotification } from './customEvent.js';
import { getUserId } from './authUtils.js';

export const createButton = (...buttonsData) => {
  // Creamos un array para guardar los botones creados.
  const createdButtons = [];

  // Iteramos sobre los objetos recibidos como parámetros.
  buttonsData.forEach((buttonData) => {
    const { content, style, href, htmlContent } = buttonData;

    // Creamos el elemento botón
    const button = document.createElement('a');
    if (content) button.textContent = content;
    if (htmlContent) button.innerHTML = htmlContent;
    if (href) button.setAttribute('href', href);
    button.classList.add('btn', ...style.split(' '));

    // el botón log out podra eliminar el token del localStorage.
    if (content === 'Log out') {
      button.addEventListener('click', () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('postSelected');
        localStorage.removeItem('posts');
      });
    }

    if (content === 'My Posts') {
      button.addEventListener('click', () => {
        button.classList.toggle('disabled');
        fireNotification('loading', button);
        fireNotification('userPosts', button);
      });
    }

    if (content === 'View All') {
      button.addEventListener('click', () => {
        fireNotification('allPosts', button);
        fireNotification('loading', button);
      });
    }

    if (content === 'Favorites') {
      button.addEventListener('click', () => {
        fireNotification('loading', button);
        fireNotification('favoritePosts', button);
      });
    }

    if (style.includes('favorite__button')) {
      button.addEventListener('click', () => {
        fireNotification('favoritePost', button);
      });
    }
    // Guardamos en el array el botón creado.
    createdButtons.push(button);
  });

  // Devolvemos el array de botones creados.
  return createdButtons;
};
