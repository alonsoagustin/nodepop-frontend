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
};
