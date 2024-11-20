import { buildSpinner } from './spinnerView.js';

export const spinnerController = (spinnerContainer) => {
  //   spinnerContainer.classList.toggle('visually-hidden');
  spinnerContainer.innerHTML = buildSpinner();
};
