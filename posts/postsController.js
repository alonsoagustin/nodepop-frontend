// importamos las funciones necesarios de los módulos correspondientes
import { getData } from '../posts/postsModel.js';
import { buildPost } from '../posts/postsView.js';

export const fireEvent = (message, type, element) => {
  // creamos un evento personalizado cuando ocurre un error al cargar los anuncios
  const customEvent = new CustomEvent('userMessage', {
    detail: {
      message,
      type,
    },
  });
  element.dispatchEvent(customEvent);
};

export const postsController = async (postsContainer) => {
  /**
   *
   *  Gestiona la obtención y renderizado de los anuncios en el DOM.
   *
   * @async
   * @function
   * @param {HTMLElement} postsContainer - El contenedor HTML donde se mostrarán los anuncios.
   * @throws {Error} Lanza un error si no hay anuncios disponibles o si ocurre un problema en la request.
   * @fires CustomEvent#LoadingPostsError - Emite un evento personalizado en caso de error con los detalles del mismo.
   */
  const URL = 'http://127.0.0.1:8000/api/posts';
  try {
    // realizamos una solicitud a la API para obtener los anuncios
    const posts = await getData(URL);
    if (posts.length === 0) {
      // lanzamos un mensaje de error al usuario si no hay anuncios
      throw new Error('No hay anuncios que mostrar');
    }

    // si hay anuncios, hacemos visible para el usuario el contenedor de anuncios
    postsContainer.classList.toggle('visually-hidden');

    // acumulador de HTML para los posts
    let showPosts = '';

    // recorremos el array de posts
    posts.forEach((post) => {
      // creamos el html para un post
      const newPost = buildPost(post);

      //agregamos el html de un post al acumulador
      showPosts += newPost;
    });

    //agregamos al DOM el html de todos los posts
    postsContainer.innerHTML = showPosts;

    fireEvent(' Anuncios cargados con éxito.', 'success', postsContainer);
  } catch (error) {
    // creamos un evento personalizado cuando ocurre un error al cargar los anuncios
    fireEvent(error.message, 'danger', postsContainer);
  }
};
