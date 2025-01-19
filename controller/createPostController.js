import { fireNotification } from '../lib/customEvent.js';
import { createPost } from '../model/postsModel.js';

export const createPostController = (form) => {
  const handleFormSubmit = (isAuthenticated) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = form.querySelector('#title').value;
      const shortDescription = form.querySelector('#short-description').value;
      const longDescription = form.querySelector('#long-description').value;
      const URLImage = form.querySelector('#url-image').value;
      const price = form.querySelector('#price').value;
      const favoritedBy = [];

      const postObject = { favoritedBy, title, shortDescription, longDescription, URLImage, price };

      handleCreatePost(postObject, isAuthenticated);
    });
  };

  const handleCreatePost = async (postObject, isAuthenticated) => {
    try {
      if (!isAuthenticated) {
        throw new Error('login');
      }

      await createPost(postObject);

      fireNotification('loading', form);
      fireNotification('created', form, 'Anuncio creado con éxito.');
    } catch (error) {
      fireNotification('loading', form);
      if (error.message === 'login') {
        fireNotification('login', form, 'Antes de crear un anuncio debes iniciar sesión.');
      } else {
        fireNotification('danger', form, error.message);
      }
    }
  };

  return { handleFormSubmit };
};
