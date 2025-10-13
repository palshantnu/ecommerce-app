import axios from './axiosInstance';

interface AuthData {
  email: string;
  password: string;
  name?: string;
}

export const login = async (data: AuthData) => {
  const response = await axios.post('/users/login', data);
  return response.data;
};

export const register = async (data: AuthData) => {
  const response = await axios.post('/users', data);
  return response.data;
};

export const logout = async () => {
  return true;
};
