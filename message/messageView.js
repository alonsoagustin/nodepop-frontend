export const renderMessage = (message, type) => {
  /**
   * Genera un bloque de HTML para mostrar un mensaje de error al usuario.
   *
   * @function
   * @param {string} error - El mensaje de error que se mostrará dentro del bloque HTML.
   * @returns {string} Una cadena de texto con el maquetado HTML del mensaje de error.
   */
  const div = document.createElement('div');
  div.classList.add('alert', `alert-${type}`, 'text-center', 'mb-2');
  div.textContent = `${message}`;
  return div;
  /*
  return `
    <div class="alert alert-${type} text-center mb-0" role="alert">
      ${message}
    </div>
    `;
    */
};
