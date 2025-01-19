import { createButton } from '../lib/createButton.js';

export const newPostController = (newPostContainer) => {
  const handleNewPostButton = () => {
    const newPostButton = {
      content: 'New Post',
      style: 'btn-outline-secondary',
      href: 'create-post.html',
    };
    const buttons = createButton(newPostButton);
    buttons.forEach((button) => newPostContainer.appendChild(button));
  };
  return { handleNewPostButton };
};
