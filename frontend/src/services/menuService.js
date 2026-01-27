import apiClient from './api';

export const menuService = {
    // Get all categories
    getCategories: async () => {
        try {
            const response = await apiClient.get('/menu/categories');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },

    // Get all menu items
    getAllItems: async () => {
        try {
            const response = await apiClient.get('/menu');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch menu items:', error);
            throw error;
        }
    },

    // Get items by category
    getItemsByCategory: async (categoryId) => {
        try {
            const response = await apiClient.get(`/menu/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch items for category ${categoryId}:`, error);
            throw error;
        }
    },

    // Get single item by ID
    getItemById: async (itemId) => {
        try {
            const response = await apiClient.get(`/menu/${itemId}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch item ${itemId}:`, error);
            throw error;
        }
    },
};
