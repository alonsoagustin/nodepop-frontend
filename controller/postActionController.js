import { getUserId } from '../lib/authUtils.js';
import { createButton } from '../lib/createButton.js';
import { deletePost, getPosts, updatePost } from '../posts/postsModel.js';
import { fireNotification } from '../lib/customEvent.js';

export const postActionController = (container) => {
  const showActionButton = (post) => {
    // obtenemos el elemento HTML (contenedor de botones de acción).
    const actionButtonContainer = post.querySelector('.post__action-buttons');

    // Info de botones de acción.
    const likeButton = {
      content: null,
      style: 'favorite__button btn-outline-success unliked',
      href: null,
      htmlContent: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
            `,
    };
    const unlikeButton = {
      content: null,
      style: 'favorite__button btn-outline-success liked',
      href: null,
      htmlContent: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
            `,
    };
    const deleteButton = {
      content: null,
      style: 'delete__button btn btn-outline-danger',
      href: '#',
      htmlContent: `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
            `,
    };

    const { currentPost, userId } = getPostAndUserData(post);

    // verificamos si el usuario guardó como favorito el anuncio.
    const isUserFavoritePost = currentPost.favoritedBy.includes(userId);

    // verificamos si el usuario es el propietario del anuncio.
    const isUserPostOwner = currentPost.userId === userId;

    // agregamos el botón de unlike si el anuncio ya es favorito.
    if (isUserFavoritePost) {
      const buttons = createButton(unlikeButton);
      buttons.forEach((button) => {
        actionButtonContainer.appendChild(button);
      });
    }
    // agregamos el botón de like si el anuncio aún es favorito.
    else {
      const buttons = createButton(likeButton);
      buttons.forEach((button) => {
        actionButtonContainer.appendChild(button);
      });
    }

    // si el usuario es el propietario del anuncio agregamos el botón de delete.
    if (isUserPostOwner) {
      const buttons = createButton(deleteButton);
      buttons.forEach((button) => actionButtonContainer.appendChild(button));
    }
  };

  const handleFavoriteButton = (post) => {
    const favoriteButton = post.querySelector('.favorite__button');

    favoriteButton.addEventListener('click', async () => {
      const { currentPost, userId, postId } = getPostAndUserData(post);
      const { favoritedBy } = currentPost;

      // verificamos si el usuario guardó como favorito el anuncio.
      const isUserFavoritePost = favoritedBy.includes(userId);

      if (favoriteButton.classList.contains('unliked')) {
        favoriteButton.classList.toggle('unliked');
        favoriteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>`;
      } else {
        favoriteButton.classList.toggle('unliked');
        favoriteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
            `;
      }

      try {
        fireNotification('loading', container);
        if (isUserFavoritePost) {
          const updateFavoritedBy = favoritedBy.filter((id) => id !== userId);
          await updatePost(postId, updateFavoritedBy);
          fireNotification('removeFavorite', container, 'Anuncio eliminado de "Favoritos"');
        } else {
          const updateFavoritedBy = [...favoritedBy, userId];
          await updatePost(postId, updateFavoritedBy);
          fireNotification('addFavorite', container, 'Anuncio guardado en "Favoritos"');
        }

        const response = await getPosts();
        localStorage.setItem('posts', JSON.stringify(response));
      } catch (error) {
        // lanzamos un evento del tipo appNotification para iniciar el spinner.
        fireNotification('loading', container);

        // lazamos un evento del tipo appNotification para informar un  error de conexión.
        if (error.message === 'Failed to fetch') {
          fireNotification('danger', container, '¡Ups! No pudimos conectar con el servidor.');
        }
        throw error;
      }
    });
  };

  const handleDeleteButton = (post) => {
    try {
      const deleteButton = post.querySelector('.delete__button');

      if (!deleteButton) return;

      deleteButton.addEventListener('click', async () => {
        const { currentPost, userId, postId } = getPostAndUserData(post);
        const userIsOwner = currentPost.userId === userId;

        if (userIsOwner) {
          await deletePost(postId);
        } else {
          throw new Error('unauthorized');
        }
        fireNotification('loading', container);
        fireNotification('deleted', container, 'Anuncio eliminado éxito.');
      });
    } catch (error) {
      fireNotification('loading', container);
      if (error.message === 'unauthorized') {
        fireNotification('danger', container, 'No puedes eliminar este anuncio.');
      } else {
        throw error;
      }
    }
  };

  const getPostAndUserData = (post) => {
    // obtenemos el id del usuario decodificando el token guardado en el localStorage.
    const userId = getUserId();

    // obtenemos el array de anuncios desde el localStorage.
    const posts = JSON.parse(localStorage.getItem('posts'));

    // obtenemos el id del anuncio desde el atributo id o desde el localStorage.
    const postId = +post.getAttribute('id') || +localStorage.getItem('postSelected');

    // obtenemos el objeto del anuncio seleccionado iterando el array de anuncios obtenido desde el localStorage.
    const [currentPost] = posts.filter((post) => post.id === postId);

    return { currentPost, userId, postId };
  };

  const handlePostActionButtons = () => {
    // seleccionamos todos los anuncios.
    const posts = document.querySelectorAll('article');

    // en cada anuncio renderizamos los botones de acción según corresponda.
    posts.forEach((post) => {
      showActionButton(post);
      handleFavoriteButton(post);
      handleDeleteButton(post);
    });
  };

  return { handlePostActionButtons };
};
