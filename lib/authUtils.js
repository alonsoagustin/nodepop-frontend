// obtenemos el id del usuario decodificando el token.
export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;
  return userId;
};

// obtenemos el token desde localStorage.
export const getToken = () => localStorage.getItem('jwt') || null;

// verificamos si el token exste.
export const hasToken = () => getToken() !== null;
