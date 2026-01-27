import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { orderService } from '../services/orderService';
import { ROUTES } from '../config/constants';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, loading, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderError, setOrderError] = useState(null);

    const handlePlaceOrder = async () => {
        if (!isAuthenticated) {
            navigate(ROUTES.LOGIN);
            return;
        }

        try {
            setPlacingOrder(true);
            setOrderError(null);

            const orderData = {
                items: cart.items.map(item => ({
                    menu_item_id: item.menu_item_id,
                    quantity: item.quantity,
                })),
            };

            const order = await orderService.createOrder(orderData);

            // Clear cart after successful order
            await clearCart();

            // Navigate to confirmation page
            navigate(ROUTES.ORDER_CONFIRMATION, { state: { order } });
        } catch (error) {
            console.error('Error placing order:', error);
            setOrderError('Failed to place order. Please try again.');
        } finally {
            setPlacingOrder(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-background py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h1 className="text-4xl font-bold font-serif mb-4">Your Cart is Empty</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Add some delicious items to your cart to get started!
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate(ROUTES.PRODUCTS)}
                    >
                        Browse Menu
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Your Cart</h1>
                    <p className="text-lg text-muted-foreground">
                        {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <CartItem key={item.menu_item_id} item={item} />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border sticky top-24">
                            <h2 className="text-2xl font-bold font-serif mb-6">Order Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>${cart.total?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Tax (10%)</span>
                                    <span>${((cart.total || 0) * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Delivery Fee</span>
                                    <span>$3.99</span>
                                </div>
                                <div className="border-t border-border pt-3 mt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            ${((cart.total || 0) * 1.1 + 3.99).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {orderError && (
                                <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-destructive text-sm">
                                    {orderError}
                                </div>
                            )}

                            <Button
                                variant="primary"
                                size="lg"
                                className="w-full mb-3"
                                onClick={handlePlaceOrder}
                                disabled={placingOrder || loading}
                            >
                                {placingOrder ? 'Placing Order...' : 'Place Order'}
                            </Button>

                            <Button
                                variant="outline"
                                size="md"
                                className="w-full"
                                onClick={() => navigate(ROUTES.PRODUCTS)}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
