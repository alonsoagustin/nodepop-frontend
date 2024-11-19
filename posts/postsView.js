export const buildPost = (post) => {
  /**
   * Genera el maquetado HTML para mostrar un anuncio.
   *
   * @function
   * @param {Object} post - El objeto que contiene la información del anuncio.
   * @param {string} post.name - El título o nombre del anuncio.
   * @param {string} post.description - La descripción del anuncio.
   * @param {number} post.price - El precio del anuncio en euros.
   * @param {string} post.type - El tipo del anuncio.
   * @returns {string} Una cadena con el código HTML que representa el anuncio.
   *
   */
  return `
<!-- POST -->
      <div data-id="${post.id}" class="post d-flex flex-column justify-content-between" style="width:85%; height:100%; overflow: hidden; border-radius: 0.5rem; box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1); background-color: #fff; min-width:75%">
        <div class="post__picture" style=" height: 15rem; position: relative; filter: brightness(0.8);">
          <img src="./assets/img.jpeg" alt="..." class="post__picture-img" style="object-fit: cover;height: 100%; width: 100%;">
        </div>
        <div class="p-2 d-flex flex-column justify-content-between">
          <div class="post__header" style="padding: 0 1rem;">
            <h5 class="post__title mt-2" style="text-align: center;font-size: 1.5; text-transform: uppercase; font-weight: bold;">${post.name}</h5>
          </div>
          <div class="post__detail" style="padding: 0 1rem;">
            <p class="post__description mt-3" style="font-size: 1.2rem; font-style: italic;">${post.description}</p>
          </div>
          <div class="post__footer d-flex justify-content-between align-item-center gap-3" style="padding: 0 1rem;">
            <p class="post__price mb-0" style="font-size: 1.2rem; font-weight: bold;">&#8364 ${post.price}</p>
            <a href="#" class="btn btn-success">${post.type}</a>
          </div>
        </div>
      </div>
  `;
};
