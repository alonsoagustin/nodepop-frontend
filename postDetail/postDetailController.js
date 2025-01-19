import { createButton } from '../lib/createButton.js';
import { fireNotification } from '../lib/customEvent.js';
import { getUserId } from '../lib/user.js';
import { deletePost, getPosts, updatePost } from '../posts/postsModel.js';
import { buildPostDetail } from './postDetailView.js';

export const postDetailController = (mainSection) => {
  const handlePostDetail = () => {
    try {
      // obtenemos los anuncios desde el localStorage.
      const posts = JSON.parse(localStorage.getItem('posts'));

      // obtenemos el id del anuncio seleccionado también desde localStorage.
      const postId = +localStorage.getItem('postSelected');

      // lanzamos un error si no obtenemos el id del anuncio o si no existen anuncios en el localStorage.
      if (!postId || !posts) {
        throw new Error('Seleccione un anuncio');
      }

      // obtenemos el objeto del anuncio seleccionado.
      const [currentPost] = posts.filter((post) => post.id === postId);

      // agregamos a mainSection el contenido HTML generado con buildPostDetail.
      mainSection.appendChild(buildPostDetail(currentPost));

      // lanzamos un evento del tipo appNotification.
      fireNotification('success', mainSection, 'Anuncio cargado con éxito.');
    } catch (error) {
      fireNotification('select', mainSection, 'Seleccione un anuncio');
    }
  };

  return { handlePostDetail };
};
