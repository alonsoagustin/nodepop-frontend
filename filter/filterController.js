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
};
