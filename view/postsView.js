export const buildPost = (postObject) => {
  const post = document.createElement('article');

  post.setAttribute('id', `${postObject.id}`);

  post.classList.add('post', 'd-flex', 'flex-column', 'justify-content-between');

  post.style.cssText = `
    padding: 1rem;
    border-radius : 0.5rem;
    box-shadow : 0 1.5rem 4rem rgba(0,0,0,0.1);
    background-color : #fff;
    min-width: 180px;
    max-width: 300px;
    display: flex;
    align-item: center;
    justify-content: center;
    `;

  post.innerHTML = `
    <div class="post__picture" id="${postObject.id}" style="height: 15rem; filter: brightness(0.8); cursor: pointer">
      <img src="${postObject.URLImage}" alt="post-image" class="post__picture-img mb-2" style="object-fit: contain; width: 100%; height: 100%">
    </div>
    <div class="d-flex flex-column p-3">
      <div class="post__header p-1">
        <h5 class="post__title mb-2" style="overflow-wrap: break-word;font-size: 1.3rem; text-transform: uppercase; font-weight: bold;">${postObject.title}</h5>
      </div>
      <div class="post__detail p-1">
        <p class="post__description mb-2" style="font-size: 1rem; font-style: italic;">${postObject.shortDescription}</p>
      </div>
      <div class="post__footer d-flex justify-content-between align-item-center gap-3 p-1">
        <div class="post__price__container">
          <p class="post__price mb-0" style="font-size: 1.75rem; font-weight: bold;">&#8364 ${postObject.price ?? '0.00'}</p>
        </div>
        <div class="post__action-buttons d-flex align-item-center gap-2">

        </div>
      </div>
    </div>`;

  post.addEventListener('click', async () => {
    localStorage.setItem('postSelected', postObject.id);
  });

  return post;
};
