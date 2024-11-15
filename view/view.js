export const renderErrorAlert = (error) => {
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

export const buildPost = (post) => {
  /**
   * Genera el maquetado HTML para mostrar un anuncio de un producto.
   *
   * @function
   * @param {Object} post - El objeto que contiene la información del anuncio.
   * @param {string} post.name - El título o nombre del producto.
   * @param {string} post.description - La descripción del producto.
   * @param {number} post.price - El precio del producto en euros.
   * @param {string} post.type - El tipo del producto.
   * @returns {string} Una cadena con el código HTML que representa el anuncio del producto.
   *
   */
  return `
<!-- POST -->
      <div class="d-flex flex-column justify-content-between" style="width:85%; height:100%; overflow: hidden; border-radius: 0.5rem; box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1); background-color: #fff; min-width:75%">
        <div class="product__picture" style=" height: 15rem; position: relative; filter: brightness(0.8);">
          <img src="./assets/img.jpeg" alt="..." class="product__picture-img" style="object-fit: cover;height: 100%; width: 100%;">
        </div>
        <div class="p-2 d-flex flex-column justify-content-between">
          <div class="product__header" style="padding: 0 1rem;">
            <h5 class="product__title mt-2" style="text-align: center;font-size: 1.5; text-transform: uppercase; font-weight: bold;">${post.name}</h5>
          </div>
          <div class="product__detail" style="padding: 0 1rem;">
            <p class="product__description mt-3" style="font-size: 1.2rem; font-style: italic;">${post.description}</p>
          </div>
          <div class="product__footer d-flex justify-content-between align-item-center gap-3" style="padding: 0 1rem;">
            <p class="product__price mb-0" style="font-size: 1.2rem; font-weight: bold;">&#8364 ${post.price}</p>
            <a href="#" class="btn btn-success">${post.type}</a>
          </div>
        </div>
      </div>
  `;
};
