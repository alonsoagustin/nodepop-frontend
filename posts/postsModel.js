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
