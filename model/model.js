export const getData = async (url) => {
  /**
   * Realiza una solicitud a una API mediante el uso de fetch.
   *
   * @async
   * @function
   * @param {string} url - La URL de la API a la que se realizará la solicitud.
   * @throws {Error} Si la respuesta de la API no es exitosa.
   * @returns {Promise<Object>} La respuesta de la API en formato JSON si es exitosa.
   */
  const response = await fetch(url);
  if (!response.ok)
    throw new Error('Hubo un problema al procesar la solicitud');
  const data = await response.json();
  return data;
};
