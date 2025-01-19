export const fireNotification = (type, element, content = '') => {
  // creamos un evento personalizado para notificar al usuario
  const event = new CustomEvent('appNotification', { detail: { content, type } });
  element.dispatchEvent(event);
};
