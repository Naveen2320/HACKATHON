import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [], total: 0 });

    // Refresh cart whenever the user logs in
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [], total: 0 });
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const { data } = await api.cart.get();
            setCart(data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const addToCart = async (menuItemId, quantity = 1) => {
        if (!user) {
            alert("Please login to order!");
            return;
        }
        try {
            // Calls POST /api/cart/add
            const { data } = await api.cart.add(menuItemId, quantity);
            setCart(data);
        } catch (error) {
            alert(error.response?.data?.detail || "Could not add item");
        }
    };

    const updateQuantity = async (menuItemId, quantity) => {
        try {
            // Calls PUT /api/cart/update
            const { data } = await api.cart.update(menuItemId, quantity);
            setCart(data);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const removeFromCart = async (menuItemId) => {
        try {
            // Calls DELETE /api/cart/item/{id}
            const { data } = await api.cart.remove(menuItemId);
            setCart(data);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
