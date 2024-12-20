import { fireEvent } from '../posts/postsController.js';
import { createUser } from './signupModel.js';

export function validateEmailFormat(input) {
  let regex =
    /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
  return regex.test(input);
}

export const signupController = (form) => {
  // agregamos un listener al form para que escuche eventos del tipo submit
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // obtenemos los datos del formulario
    const userEmail = form.querySelector('#email').value;
    const userPassword = form.querySelector('#password').value;
    const userPasswordConfirm = form.querySelector('#passwordConfirm').value;

    const errors = [];

    // validamos el formato del email
    if (!validateEmailFormat(userEmail)) {
      errors.push('Formato de email invalido.');
    }
    // validamos la password
    if (userPassword !== userPasswordConfirm) {
      errors.push('Las passwords no coinciden.');
    }

    errors.forEach((error) => {
      fireEvent(error, 'danger', form);
    });

    const userObject = {
      username: userEmail,
      password: userPassword,
    };

    if (errors.length === 0) {
      // si no hay errores llamamos a la api mediante un metodo POST
      handlerCreateUser(userObject);
    }
  });
};

const handlerCreateUser = async (userObject) => {
  try {
    // hacemos un POST request a la API para crear el usuario
    await createUser(userObject);
    window.location.href = 'http://127.0.0.1:8080/index.html';
  } catch (error) {
    const form = document.querySelector('form');
    fireEvent(error.message, 'danger', form);
  }
};
