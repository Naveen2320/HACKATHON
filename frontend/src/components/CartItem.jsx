import Button from './Button';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart, loading } = useCart();

    const handleUpdateQuantity = async (newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItem(item.menu_item_id, newQuantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemove = async () => {
        try {
            await removeFromCart(item.menu_item_id);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const itemTotal = item.price * item.quantity;

    return (
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            {/* Product Image/Icon */}
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center text-3xl">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    '🍕'
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1">
                <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleUpdateQuantity(item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                    disabled={loading || item.quantity <= 1}
                >
                    <span className="text-lg font-bold">−</span>
                </button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <button
                    onClick={() => handleUpdateQuantity(item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                    disabled={loading}
                >
                    <span className="text-lg font-bold">+</span>
                </button>
            </div>

            {/* Item Total */}
            <div className="text-right">
                <p className="font-bold text-lg text-foreground">${itemTotal.toFixed(2)}</p>
            </div>

            {/* Remove Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={loading}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </Button>
        </div>
    );
};

export default CartItem;
