export const newError = (error) => {
  /**
   * Genera un bloque de HTML para mostrar un mensaje de error junto con un botón para ver anuncios.
   *
   * @function
   * @param {string} error - El mensaje de error que se mostrará dentro del bloque HTML.
   * @returns {string} Una cadena de texto con el maquetado HTML del encabezado y el mensaje de error.
   */
  return `<header class="d-flex justify-content-end">
    <button class="show__posts btn btn-outline-secondary">ver anuncios</button>
  </header>
  <div class="alert alert-danger text-center mb-0" role="alert">
    ${error}
  </div>
  `;
};
