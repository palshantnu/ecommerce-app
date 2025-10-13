import axios from './axiosInstance';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get('/products');
  return response.data;
};

export const getProductDetails = async (id: number): Promise<Product> => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
};
