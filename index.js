import { postsController } from './posts/postsController.js';
import { messageController } from './message/messageController.js';

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Inicializa los controladores de posts y mensajes al cargar la página.
   *
   * Este código se ejecuta cuando el DOM ha sido completamente cargado. Realiza las siguientes tareas:
   * 1. Muestra un spinner de carga durante un breve intervalo.
   * 2. Obtiene los elementos del contenedor de posts y el contenedor de mensajes.
   * 3. Inicializa el controlador de posts, que se encarga de obtener y mostrar los anuncios.
   * 4. Inicializa el controlador de mensajes, que se utiliza para mostrar errores.
   * 5. Configura un listener para mostrar mensajes de error si ocurre un fallo al cargar los posts.
   *
   */
  setTimeout(() => {
    const postsContainer = document.querySelector('.posts__container');
    const messageContainer = document.querySelector('.message__container');
    const spinnerContainer = document.querySelector('.spinner__container');

    // mostramos el spinner
    spinnerContainer.classList.toggle('visually-hidden');
    setTimeout(() => {
      // iniciamos el controlador de anuncios
      postsController(postsContainer);

      // iniciamos el controlador de mensajes
      const showMessage = messageController(messageContainer);

      // configuramos un listener para mostrar mensajes si hay un error al cargar los anuncios.
      postsContainer.addEventListener('loadingPostsError', (event) => {
        showMessage(event.detail);
      });
    }, 0);
  }, 2000);
});
