import { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, fetchCart } = useCart(); // fetchCart needed to refresh cart after clearing
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        delivery_address: '',
        phone: '',
        card_number: '',
        expiry: '',
        cvv: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate Payment Processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 1. Call API to Create Order in MongoDB
            const { data } = await api.orders.create({
                delivery_address: formData.delivery_address,
                phone: formData.phone
            });

            // 2. Refresh cart context (it should now be empty)
            await fetchCart();

            // 3. Redirect to Success Page
            navigate(`/order-success/${data.id}`);
        } catch (error) {
            alert("Order failed: " + (error.response?.data?.detail || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Delivery Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                            <textarea
                                required
                                name="delivery_address"
                                rows="3"
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="123 Pizza Street, Apt 4B"
                                value={formData.delivery_address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                required
                                type="tel"
                                name="phone"
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                placeholder="(555) 123-4567"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Fake Payment Section (MVP) */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Payment</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input required type="text" placeholder="0000 0000 0000 0000" className="w-full border rounded-lg p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                            <input required type="text" placeholder="MM/YY" className="w-full border rounded-lg p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input required type="text" placeholder="123" className="w-full border rounded-lg p-2" />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : `Pay $${(cart.total + 5).toFixed(2)} & Place Order`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;
