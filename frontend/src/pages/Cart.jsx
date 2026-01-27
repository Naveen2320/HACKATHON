import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    if (cart.items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any pizzas yet.</p>
                <Link to="/menu" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="md:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.menu_item_id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                            <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />

                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromCart(item.menu_item_id)}
                                className="text-red-500 hover:text-red-700 p-2"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary Box */}
                <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                    <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-bold">${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="font-bold">$5.00</span>
                    </div>
                    <div className="border-t pt-4 mb-6 flex justify-between">
                        <span className="text-xl font-bold">Total</span>
                        <span className="text-xl font-bold text-orange-600">${(cart.total + 5).toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 flex items-center justify-center gap-2"
                    >
                        Proceed to Checkout
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
