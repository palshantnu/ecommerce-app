export const BASE_URL = 'http://localhost:5000/api';

export const ENDPOINTS = {
  auth: {
    login: '/users/login',
    register: '/users',
  },
  products: {
    list: '/products',
    details: (id: number) => `/products/${id}`,
  },
  cart: {
    get: (userId: number) => `/cart/${userId}`,
    add: '/cart/add',
  },
  orders: {
    place: '/orders',
    list: '/orders',
  },
  user: {
    profile: (userId: number) => `/users/${userId}`,
    update: (userId: number) => `/users/${userId}`,
  },
};
