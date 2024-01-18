export const BASE_URL = // 'http://localhost:3333';
  process.env['NODE_ENV'] === 'development' ? 'http://localhost:3333' : '';

export const PRODUCTS_URL = `/api/products`;

export const USERS_URL = `/api/users`;

export const ORDERS_URL = `/api/orders`;

export const PAYPAL_URL = `/api/config/paypal`;

export const UPLOADS_URL = `/api/upload`;
