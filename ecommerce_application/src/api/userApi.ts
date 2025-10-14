import axios from './axiosInstance';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getProfile = async (userId: number): Promise<User> => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

export const updateProfile = async (userId: number, data: Partial<User>) => {
  const response = await axios.put(`/users/${userId}`, data);
  return response.data;
};
