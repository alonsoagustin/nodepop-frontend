import { config } from '../config.js';
import { getToken } from '../lib/authUtils.js';

export const getPosts = async (URL = `${config.HOST}${config.POSTS}?_page=1&_limit=10`) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    if (!response.ok)
      throw new Error(
        `Error ${response.status} (${response.statusText}): Hubo un problema al procesar la solicitud`,
      );

    return data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (postObject) => {
  try {
    const jwt = getToken();

    const URL = `${config.HOST}${config.POSTS}`;

    // con la extension live-server he tenido ciertos problemas luego de hacer la request
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(postObject),
      headers: { 'Content-Type': 'application/json', Authorization: `Baerer ${jwt}` },
    });

    if (!response.ok) {
      console.error('error al crear el anuncio');
      throw new Error(response.statusText || 'Error en la solicitud');
    }
  } catch (error) {
    throw error;
  }
};
