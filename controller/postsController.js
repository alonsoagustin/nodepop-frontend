import { buildPost } from '../posts/postsView.js';
import { fireNotification } from '../lib/customEvent.js';
import { getUserId } from '../lib/authUtils.js';
import { getPosts } from '../posts/postsModel.js';

export const postsController = (container) => {
  const getAllPosts = async () => {
    try {
      // obtenemos todos los anuncios.
      const posts = await getPosts();

      // guardamos los anuncios en el localStorage.
      localStorage.setItem('posts', JSON.stringify(posts));

      localStorage.removeItem('postSelected'); // ????

      // llamamos a la función showPosts.
      showPosts(posts);
    } catch (error) {
      // lazamos un evento del tipo appNotification.
      if (error.message === 'Failed to fetch') {
        fireNotification('danger', container, '¡Ups! No pudimos conectar con el servidor.');
      }
      throw error;
    }
  };

  const getUserPosts = async () => {
    try {
      const userId = getUserId();

      const userPosts = await getPosts(`http://127.0.0.1:8000/api/posts?userId=${userId}`);

      if (userPosts.length === 0) {
        throw new Error('No tienes ningún anuncio.');
      }

      showPosts(userPosts);

      return userPosts;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        fireNotification('danger', container, '¡Ups! No pudimos conectar con el servidor.');
      }
      fireNotification('danger', container, error.message);
    }
  };

  const getFavoritePosts = async () => {
    try {
      // obtenemos el ID del usuario que ha iniciado sesión.
      const userId = getUserId();

      // obtenemos todos los anuncios.
      const allPosts = await getPosts();

      const favoritesPosts = [];

      // filtramos los anuncios favoritos (post.isFavorite === True)
      allPosts.forEach((post) => {
        if (post.favoritedBy.includes(userId)) {
          favoritesPosts.push(post);
        }
      });

      // lanzamos un error si no hay anuncios marcados como favoritos.
      if (favoritesPosts.length === 0) {
        throw new Error('no content');
      }

      // llamamos a la funcion showPosts.
      showPosts(favoritesPosts);

      return favoritesPosts;
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        fireNotification('danger', container, '¡Ups! No pudimos conectar con el servidor.');
      }
      if (error.message == 'no content')
        fireNotification('danger', container, 'No tienes anuncios marcados como favoritos.');
    }
  };

  const showPosts = (postsObject) => {
    try {
      // lanzamos un mensaje de error al usuario si no hay anuncios.
      if (postsObject.length === 0) {
        throw new Error('No hay anuncios que mostrar');
      }

      // reseteamos el contenido de postsContainer.
      container.innerHTML = '';

      // agregamos a postsContainer todos los anuncios que existan en el array posts.
      postsObject.forEach((post) => {
        const builtPost = buildPost(post);
        container.appendChild(builtPost);
      });

      const pictures = document.querySelectorAll('.post__picture');
      pictures.forEach((picture) =>
        picture.addEventListener('click', () => {
          const postId = picture.getAttribute('id');
          console.log(postId);
          localStorage.setItem('postSelected', postId);
          window.location.href = `post.html`;
        }),
      );

      // lanzamos un evento del tipo appNotification para informar que ya finalizo el proceso.
      fireNotification('success', container, 'Anuncios cargados con éxito.');
    } catch (error) {
      // lanzamos un evento del tipo appNotification para informar que ya finalizo el proceso.
      fireNotification('loadingComplete', container);

      // lanzamos un evento del tipo appNotification para informar el error en la carga de anuncios.
      fireNotification('danger', container, error.message);
    }
  };

  return { getAllPosts, getUserPosts, getFavoritePosts };
};
