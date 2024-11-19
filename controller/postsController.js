// importamos las funciones necesarios de los módulos correspondientes
import { getData } from './../model/model.js';
import { renderErrorAlert, buildPost } from './../view/view.js';

// seleccionamos los elementos del DOM que seran utilizados
const postsSection = document.querySelector('.posts');
const showPostsBtn = document.querySelector('.show__posts');
const spinner = document.querySelector('.spinner');
const postsContainer = document.querySelector('.posts__container');

const showPosts = async () => {
  const URL = 'http://127.0.0.1:8000/api/posts';
  let posts;
  try {
    // mostramos el spinner mientras realizamos la solicitud a la api
    spinner.classList.toggle('visually-hidden');

    // realizamos la solicitud a la api
    posts = await getData(URL);

    // si la api devuelve un array vacio mostramos un alert al usuario
    if (posts.length === 0) throw new Error('No hay ningún anucio publicado');

    // simulamos un retraso de 2 segundos para ocultar el spinner y mostrar los anuncios
    setTimeout(() => {
      spinner.classList.toggle('visually-hidden');
      setTimeout(() => {
        let postsToPrint = ''; // Variable para acumular el HTML de los posts
        posts.forEach((post) => {
          const newPost = buildPost(post); // Generamos el HTML para cada post
          postsToPrint += newPost; // Agregamos el HTML generado a la variable acumuladora
          postsContainer.innerHTML = postsToPrint; // Inserta el HTML en el contenedor de posts
        });
      }, 0);
    }, 2000); // Al cabo de 2 seg se renderizara la respuesta de la API
  } catch (error) {
    // Si ocurre un error, genera una alerta y la muestra en la sección de posts
    const showError = renderErrorAlert(error);
    postsSection.innerHTML = showError;
    return postsSection;
  }
};

// Agregamos un event listener al botón para ejecutar la función cuando se hace clic
showPostsBtn.addEventListener('click', showPosts);
