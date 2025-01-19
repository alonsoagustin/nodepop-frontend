export const buildPostDetail = (postObject) => {
  const postsContainer = document.createElement('article');

  // postsContainer.style.cssText = `
  //     display: grid;
  //     grid-template-columns: 1fr 2fr ;
  //     justify-items: center;
  //     align-items: center;
  //     gap: 5rem;
  //     `;

  postsContainer.classList.add('post__container');

  postsContainer.innerHTML = `
        <div class="image__container" style=" padding: 0.5rem;filter: brightness(0.8);box-shadow : 0 1.5rem 4rem rgba(0,0,0,0.1);
        ">
          <img src="${postObject.URLImage}" alt="" style="object-fit: contain;height: 100%; width: 100%;">
        </div>
        <div class="detail__container">
          <h2 class='mb-0' style="font-size: 1.5rem; text-transform: uppercase; font-weight: bold;">${postObject.title}</h2>
          <p class="mb-0 mt-3" style="font-size: 1rem">${postObject.longDescription}</p>
          <div class="mb-0 mt-3 post__action-buttons d-flex gap-3">
          </div>
        </div>  
    `;
  return postsContainer;
};
