import { config } from '../config.js';
export const createUser = async (userObject) => {
  try {
    // hacemos un fetch a la API
    const response = await fetch(`${config.HOST}${config.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject),
    });

    // si la API no responde un status code OK (code status entre 200-299)...
    if (!response.ok) {
      console.error('error al crear la cuenta');
      throw new Error(response.statusText || 'Error en la solicitud');
    }
  } catch (error) {
    // el error será caputrado en otro sitio de la aplicación.
    throw error;
  }
};
