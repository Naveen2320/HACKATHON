import { useEffect, useState } from 'react';
import api from '../services/api';
import { Package, Calendar, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // If no user, don't fetch (or handling in UI)
                if (!user) return;

                const { data } = await api.orders.history();
                setOrders(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Failed to load your orders. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const toggleOrder = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading your orders...</div>;
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
                <p className="text-gray-500 mb-8">You need to be logged in to view your order history.</p>
                <Link to="/login" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
                    Log In
                </Link>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
                <p className="text-gray-500 mb-8">Go ahead and order some delicious pizza!</p>
                <Link to="/menu" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Package className="text-orange-600" />
                My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Order Header */}
                        <div
                            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex justify-between items-center"
                            onClick={() => toggleOrder(order._id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                <div>
                                    <span className="text-sm text-gray-500 block">Order ID</span>
                                    <span className="font-mono font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Calendar size={18} />
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-xl font-bold text-orange-600">${order.total.toFixed(2)}</span>
                                {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        {/* Order Details (Expanded) */}
                        {expandedOrder === order._id && (
                            <div className="border-t bg-gray-50 p-6">
                                <h3 className="font-semibold mb-4 text-gray-700">Order Items</h3>
                                <div className="space-y-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-sm">
                                                    {item.quantity}x
                                                </div>
                                                <span className="font-medium text-gray-800">
                                                    {/* If populated, use item.menu_item.name, otherwise fallback */}
                                                    {item.menu_item?.name || 'Pizza Item'}
                                                </span>
                                            </div>
                                            <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Delivery Address</p>
                                        <p className="font-medium">{order.delivery_address}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
