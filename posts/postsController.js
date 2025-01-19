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
};
