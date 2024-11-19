export const renderMessage = (message) => {
  /**
   * Genera un bloque de HTML para mostrar un mensaje de error al usuario.
   *
   * @function
   * @param {string} error - El mensaje de error que se mostrará dentro del bloque HTML.
   * @returns {string} Una cadena de texto con el maquetado HTML del mensaje de error.
   */
  return `
    <div class="alert alert-danger text-center mb-0" role="alert">
      ${message}
    </div>
    `;
};
