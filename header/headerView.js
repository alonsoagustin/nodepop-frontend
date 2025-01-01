export const builtHeaderButton = (content, style, href) => {
  const button = document.createElement('a');
  button.textContent = content;
  button.classList.add('btn', style);
  button.setAttribute('href', href);
  button.setAttribute('role', 'button');
  button.addEventListener('click', () => {
    localStorage.removeItem('jwt');
  });
  return button;
};
