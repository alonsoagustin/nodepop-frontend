import { config } from '../config.js';

export const authenticateUser = async (userObject) => {
  try {
    const response = await fetch(`${config.HOST}${config.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userObject),
    });

    // si la API no responde un status code OK (code status entre 200-299)...
    if (!response.ok) {
      throw new Error(`Error: usuario y/o contraseña incorrectos.`);
    }

    // si la API responde un status code OK
    // transformamos la respuesta en JSON y hacemos destructuring
    const { accessToken } = await response.json();

    //devolvemos el token
    return accessToken;
  } catch (error) {
    // el error será capturado por el handlerAuthenticateUser
    throw error;
  }
};
