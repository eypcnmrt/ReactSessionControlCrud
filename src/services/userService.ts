import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/auth';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await api.post(
    '/login',
    JSON.stringify({
      username: username,
      password: password,
    }),
  );
  return response.data;
};

export const getUserProfile = async (accessToken: string) => {
  const response = await api.get('/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await api.post('/refresh', { refreshToken: token });
  return response.data;
};
