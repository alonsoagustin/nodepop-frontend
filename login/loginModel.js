export const authenticateUser = async (userObject) => {
  const URL = 'http://127.0.0.1:8000/auth/login';

  const response = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify(userObject),
    headers: { 'Content-Type': 'application/json' },
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.message);
  }

  return res;
};
