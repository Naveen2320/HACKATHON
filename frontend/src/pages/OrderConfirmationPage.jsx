import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { ROUTES } from '../config/constants';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    // If no order data, redirect to home
    if (!order) {
        setTimeout(() => navigate(ROUTES.HOME), 100);
        return null;
    }

    return (
        <div className="min-h-screen bg-background py-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Success Animation */}
                <div className="text-center mb-8 animate-scale-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-accent/20 rounded-full mb-6">
                        <svg
                            className="w-12 h-12 text-accent"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-foreground">
                        Order Confirmed!
                    </h1>
                    <p className="text-xl text-muted-foreground mb-2">
                        Thank you for your order
                    </p>
                    <p className="text-lg text-muted-foreground">
                        Order ID: <span className="font-mono font-bold text-foreground">#{order.id || '12345'}</span>
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8 animate-slide-up">
                    <h2 className="text-2xl font-bold font-serif mb-6">Order Details</h2>

                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                        <div className="space-y-4 mb-6">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                                    <div>
                                        <p className="font-medium text-foreground">{item.name || `Item ${index + 1}`}</p>
                                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-foreground">
                                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Order Total */}
                    <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total</span>
                            <span className="text-primary">${order.total?.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 mb-8 animate-slide-up">
                    <h3 className="text-xl font-bold font-serif mb-4">What's Next?</h3>
                    <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">📧</span>
                            <p>You'll receive a confirmation email shortly</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">👨‍🍳</span>
                            <p>Our kitchen is preparing your order</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🚚</span>
                            <p>Your order will be delivered in 30-45 minutes</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate(ROUTES.HOME)}
                    >
                        Back to Home
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate(ROUTES.MENU)}
                    >
                        Order Again
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
