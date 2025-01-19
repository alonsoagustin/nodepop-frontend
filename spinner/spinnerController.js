export const spinnerController = (spinnerContainer) => {
  const handleSpinner = () => {
    spinnerContainer.classList.toggle('visually-hidden');
  };
  return { handleSpinner };
};
