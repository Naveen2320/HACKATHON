import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, LogOut, User, Pizza } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();

    // Calculate total items in cart
    const cartItemCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-orange-600 font-bold text-xl">
                        <Pizza />
                        <span>Crust & Craft</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-6">
                        <Link to="/menu" className="font-medium hover:text-orange-600">Menu</Link>

                        {user ? (
                            <>
                                <Link to="/orders" className="font-medium hover:text-orange-600">My Orders</Link>

                                {/* Cart Icon with Badge */}
                                <Link to="/cart" className="relative p-2 hover:bg-orange-50 rounded-full">
                                    <ShoppingCart size={24} />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                            {cartItemCount}
                                        </span>
                                    )}
                                </Link>

                                <div className="flex items-center gap-2 ml-4">
                                    <span className="text-sm font-semibold">{user.name}</span>
                                    <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600">
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-orange-600 font-medium">Login</Link>
                                <Link to="/register" className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
