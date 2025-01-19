import { createUser } from './signupModel.js';
import { fireNotification } from '../lib/customEvent.js';
import { validateEmailFormat } from '../lib/validateEmail.js';
import { authenticateUser } from '../login/loginModel.js';

export const signupController = (form) => {
  const getFormData = () => {
    let userEmail, userPassword, userPasswordConfirm;

    // obtenemos los datos ingresados por el usuario.
    userEmail = form.querySelector('#email').value;
    userPassword = form.querySelector('#password').value;
    userPasswordConfirm = form.querySelector('#passwordConfirm').value;

    return { userEmail, userPassword, userPasswordConfirm };
  };

  const handleValidateData = (userEmail, userPassword, userPasswordConfirm) => {
    const errors = [];

    // validamos el formato del correo.
    if (!validateEmailFormat(userEmail)) {
      errors.push('email');
    }

    // validamos la contraseña.
    if (userPassword !== userPasswordConfirm) {
      // si no pasa el test agregamos un string al ARRAY ERRORS.
      errors.push('password');
    }
    return errors;
  };

  const handlerCreateUser = async (userObject) => {
    try {
      await createUser(userObject);

      // lanzamos un evento del tipo 'appNotification' confirmando el inicio de sesión.
      fireNotification('loading', form);

      // lanzamos un evento del tipo appNotification.
      fireNotification('created', form, 'Usuario creado con éxito.');

      const token = await authenticateUser(userObject);

      localStorage.setItem('jwt', token);

      // lanzamos un evento del tipo appNotification.
      fireNotification('success', form, 'Sesión iniciada con éxito.');
    } catch (error) {
      // lanzamos un evento del tipo 'appNotification' confirmando el inicio de sesión.
      fireNotification('loading', form);
      if (error.message === 'Failed to fetch') {
        fireNotification('danger', form, '¡Ups! No pudimos conectar con el servidor.');
      } else {
        fireNotification('danger', form, error.message);
      }
    }
  };

  const handleSignup = () => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const { userEmail, userPassword, userPasswordConfirm } = getFormData();
      const errors = handleValidateData(userEmail, userPassword, userPasswordConfirm);

      if (errors.length > 0) {
        // lanzamos un evento del tipo appNotification con cada error.
        errors.forEach((error) => {
          fireNotification('loading', form);
          if (error === 'email') fireNotification('danger', form, 'Formato de correo inválido.');
          if (error === 'password')
            fireNotification('danger', form, 'Las contraseñas no coinciden.');
        });
      } else {
        const userObject = {
          username: userEmail,
          password: userPassword,
        };
        handlerCreateUser(userObject);
      }
    });
  };

  return { handleSignup };
};
