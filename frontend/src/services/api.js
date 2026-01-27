import axios from 'axios';

// 1. Create the Axios Instance
const apiClient = axios.create({
  baseURL: '/api', // Vite proxy will forward this to http://localhost:8000/api
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'pizza-api-key-2024', // Must match the key in your backend .env
  },
});

// 2. Add Interceptor to attach JWT Token to protected requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Define API Calls matching your Backend Routes
export const api = {
  // Auth Routes
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    register: (userData) => apiClient.post('/auth/register', userData),
    getMe: () => apiClient.get('/auth/me'),
  },

  // Menu Routes
  menu: {
    getAll: () => apiClient.get('/menu'),
    getByCategory: (category) => apiClient.get(`/menu/category/${category}`),
    getById: (id) => apiClient.get(`/menu/${id}`),
  },

  // Cart Routes
  cart: {
    get: () => apiClient.get('/cart'),
    add: (menuItemId, quantity = 1) => 
      apiClient.post('/cart/add', { menu_item_id: menuItemId, quantity }),
    update: (menuItemId, quantity) => 
      apiClient.put('/cart/update', { menu_item_id: menuItemId, quantity }),
    remove: (menuItemId) => apiClient.delete(`/cart/item/${menuItemId}`),
    clear: () => apiClient.delete('/cart/clear'),
  },

  // Order Routes
  orders: {
    create: (orderData) => apiClient.post('/orders', orderData),
    history: () => apiClient.get('/orders'),
    getById: (id) => apiClient.get(`/orders/${id}`),
  },
};

export default api;
