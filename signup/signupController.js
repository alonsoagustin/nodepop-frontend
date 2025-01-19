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
};
