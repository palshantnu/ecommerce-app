import axios from './axiosInstance';

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  address?: string;
}

export const placeOrder = async (data: { userId: number; totalAmount: number; address: string }) => {
  const response = await axios.post('/orders', data);
  return response.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/orders');
  return response.data;
};
