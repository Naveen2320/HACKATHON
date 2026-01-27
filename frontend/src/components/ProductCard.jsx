import { useState } from 'react';
import Button from './Button';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, loading } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        try {
            setIsAdding(true);
            await addToCart(product.id, quantity);
            setQuantity(1); // Reset quantity after adding
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="product-card bg-card rounded-2xl overflow-hidden shadow-lg border border-border">
            {/* Product Image */}
            <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        {product.category === 'Pizzas' ? '🍕' : product.category === 'Drinks' ? '🥤' : '🍰'}
                    </div>
                )}

                {/* Price Badge */}
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold shadow-lg">
                    ${product.price.toFixed(2)}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h3 className="text-xl font-bold font-serif text-foreground mb-2">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                            disabled={quantity <= 1}
                        >
                            <span className="text-lg font-bold">−</span>
                        </button>
                        <span className="w-8 text-center font-bold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
                        >
                            <span className="text-lg font-bold">+</span>
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={isAdding || loading}
                >
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
