// Application constants and configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    API_KEY: import.meta.env.VITE_API_KEY || 'pizza-api-key-2024',
};

export const ROUTES = {
    HOME: '/',
    MENU: '/menu',
    PRODUCTS: '/products',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDER_CONFIRMATION: '/order-confirmation',
    ORDERS: '/orders',
    AUTH: '/auth',
    LOGIN: '/login',
    REGISTER: '/register',
};

export const CATEGORIES = [
    { id: 1, name: 'Pizzas', icon: '🍕', description: 'Delicious handcrafted pizzas' },
    { id: 2, name: 'Drinks', icon: '🥤', description: 'Refreshing beverages' },
    { id: 3, name: 'Desserts', icon: '🍰', description: 'Sweet treats' },
];
