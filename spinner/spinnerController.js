import { buildSpinner } from './spinnerView.js';

export const spinnerController = (spinnerContainer) => {
  spinnerContainer.innerHTML = buildSpinner();
  setTimeout(() => {
    spinnerContainer.classList.toggle('visually-hidden');
  }, 3000);
};
