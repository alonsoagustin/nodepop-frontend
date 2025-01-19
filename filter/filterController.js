import { createButton } from '../lib/createButton.js';

export const filterController = (filterContainer) => {
  const handleFiltertButton = () => {
    const favoritePostsButton = {
      content: 'Favorites',
      style: 'btn-outline-secondary',
      href: '#',
    };
    const allPostsButton = {
      content: 'View All',
      style: 'btn-outline-secondary',
      href: '#',
    };
    const myPostsButton = {
      content: 'My Posts',
      style: 'btn-outline-secondary',
      href: '#',
    };
    const buttons = createButton(favoritePostsButton, allPostsButton, myPostsButton);
    buttons.forEach((button) => filterContainer.appendChild(button));
  };

  const handleFilterSelection = (filterButtons) => {
    // si el usuario hace click en un filtro, lo deshabilitamos.
    filterButtons.forEach((button) =>
      button.addEventListener('click', () => {
        button.classList.add('disabled');
        filterButtons.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove('disabled');
          }
        });
      }),
    );
  };

  return { handleFiltertButton, handleFilterSelection };
};
