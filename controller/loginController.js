import { authenticateUser } from './loginModel.js';
import { fireNotification } from '../lib/customEvent.js';

export const loginController = (form) => {
  const handleAuthUser = () => {
    form.addEventListener('submit', async (event) => {
      try {
        event.preventDefault();

        // lanzamos un evento del tipo 'appNotification' confirmando el inicio de sesión.
        fireNotification('loading', form);

        // obtenemos los datos ingresados por el usuario al hacer submit.
        const username = form.querySelector('#username').value;
        const password = form.querySelector('#password').value;

        // creamos un objeto con el usuario y contraseña.
        const userObject = { username, password };

        // esperamos la respuesta de la API con el accessToken.
        const token = await authenticateUser(userObject);

        // lanzamos un evento del tipo 'appNotification' confirmando el inicio de sesión.
        fireNotification('success', form, 'Sesión iniciada con éxito.');

        // guardamos el token en el localStorage.
        localStorage.setItem('jwt', token);
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          fireNotification('danger', form, '¡Ups! No pudimos conectar con el servidor.');
        } else {
          fireNotification('danger', form, error.message);
        }
      }
    });
  };
  return { handleAuthUser };
};
