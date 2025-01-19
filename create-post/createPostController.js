import { fireNotification } from '../lib/customEvent.js';
import { createPost } from '../posts/postsModel.js';

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
};
