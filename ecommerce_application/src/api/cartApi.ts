import axios from './axiosInstance';

export interface CartItem {
  CartItems: { quantity: number };
  id: number;
  name: string;
  price: number;
  image?: string;
}

export const getCart = async (userId: number): Promise<CartItem[]> => {
  const response = await axios.get(`/cart/${userId}`);
  return response.data.items || [];
};

export const addToCart = async (data: { userId: number; productId: number; quantity: number }) => {
  const response = await axios.post('/cart/add', data);
  return response.data;
};
