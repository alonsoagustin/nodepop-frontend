import { headerController } from './header/headerController.js';
import { spinnerController } from './spinner/spinnerController.js';
import { messageController } from './message/messageController.js';
import { postsController } from './posts/postsController.js';
import { newPostController } from './newPost/newPostController.js';
import { filterController } from './filter/filterController.js';
import { postActionController } from './postAction/postActionController.js';
import { hasToken } from './lib/authUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  // seleccionamos los elementos necesarios del DOM
  const buttonContainer = document.querySelector('.button__container');
  const spinnerContainer = document.querySelector('.spinner__container');
  const messageContainer = document.querySelector('.message__container');
  const filterContainer = document.querySelector('.filter__container');
  const newPostContainer = document.querySelector('.new-post__container');
  const postsContainer = document.querySelector('.posts__container');
  const filterAndNewPostContainer = document.querySelector('.filter-and-new-post__container');

  // verificamos si el usuario tiene un token.
  const userIsAuthenticated = hasToken();

  // iniciamos el controlador del header.
  const { handleHeaderButton } = headerController(buttonContainer);

  // iniciamos el controlador del spinner.
  const { handleSpinner } = spinnerController(spinnerContainer);

  // iniciamos el controlador de mensajes.
  const { showNotification } = messageController(messageContainer);

  // iniciamos el controlador de botones de filtro.
  const { handleFiltertButton, handleFilterSelection } = filterController(filterContainer);

  // iniciamos el controlador de botón de new post.
  const { handleNewPostButton } = newPostController(newPostContainer);

  // iniciamos el controlador de anuncios.
  const { getAllPosts, getUserPosts, getFavoritePosts } = postsController(postsContainer);

  // iniciamos el controlador de los botones de acción.
  const { handlePostActionButtons } = postActionController(postsContainer);

  // renderizamos botones de signup, login o logout segun corresponda.
  handleHeaderButton(userIsAuthenticated);

  setTimeout(async () => {
    try {
      await getAllPosts();
    } catch (error) {
      // lanzamos el error intencional para detener la ejecución.
      throw error;
    }

    if (userIsAuthenticated) {
      handleNewPostButton();
      handleFiltertButton();
      handlePostActionButtons();

      filterAndNewPostContainer.classList.toggle('visually-hidden');

      const filterButtons = filterContainer.querySelectorAll('.btn');

      handleFilterSelection(filterButtons);

      // escuchamos en todos los filtros un evento del tipo appNotification.
      filterButtons.forEach((filter) =>
        filter.addEventListener('appNotification', (event) => {
          const { type } = event.detail;

          if (type === 'loading') {
            handleSpinner();
          }

          if (type === 'userPosts') {
            setTimeout(async () => {
              const response = await getUserPosts();
              if (response) {
                handlePostActionButtons();
              }
            }, 600);
          }

          if (type === 'allPosts') {
            setTimeout(async () => {
              await getAllPosts();
              handlePostActionButtons();
            }, 600);
          }

          if (type === 'favoritePosts') {
            setTimeout(async () => {
              const response = await getFavoritePosts();
              if (response) {
                handlePostActionButtons();
              }
            }, 600);
          }
        }),
      );
    }
  }, 600);

  // escuchamos en postsContainer un evento del tipo appNotification.
  postsContainer.addEventListener('appNotification', (event) => {
    const { content, type } = event.detail;

    if (type === 'loading') {
      handleSpinner();
    }

    if (type === 'success') {
      handleSpinner();
      showNotification(content, type);
    }

    if (type === 'danger') {
      handleSpinner();
      showNotification(content, type);
    }

    if (type === 'addFavorite') {
      handleSpinner();
      showNotification(content, 'success');
    }

    if (type === 'removeFavorite') {
      handleSpinner();
      showNotification(content, 'success');
    }

    if (type === 'deleted') {
      handleSpinner();
      showNotification(content, 'success');
      setTimeout(() => {
        location.href = 'index.html';
      }, 800);
    }
  });
});
