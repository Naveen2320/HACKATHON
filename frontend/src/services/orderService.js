import apiClient from './api';

export const orderService = {
    // Create a new order
    createOrder: async (orderData) => {
        try {
            const response = await apiClient.post('/orders', orderData);
            return response.data;
        } catch (error) {
            console.error('Failed to create order:', error);
            throw error;
        }
    },

    // Get order by ID
    getOrderById: async (orderId) => {
        try {
            const response = await apiClient.get(`/orders/${orderId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch order ${orderId}:`, error);
            throw error;
        }
    },

    // Get all orders for current user
    getUserOrders: async () => {
        try {
            const response = await apiClient.get('/orders/user');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch user orders:', error);
            throw error;
        }
    },

    // Update order status
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await apiClient.patch(`/orders/${orderId}/status`, { status });
            return response.data;
        } catch (error) {
            console.error(`Failed to update order ${orderId} status:`, error);
            throw error;
        }
    },
};
