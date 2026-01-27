import { useEffect, useState } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { Pizza, Coffee, Salad } from 'lucide-react'; // Icons

const Menu = () => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState('pizza'); // Default category
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        loadMenu(category);
    }, [category]);

    const loadMenu = async (cat) => {
        setLoading(true);
        try {
            // Calls GET /api/menu/category/{cat}
            const { data } = await api.menu.getByCategory(cat);
            setItems(data);
        } catch (error) {
            console.error("Failed to load menu", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { id: 'pizza', label: 'Pizzas', icon: Pizza },
        { id: 'drinks', label: 'Drinks', icon: Coffee },
        { id: 'sides', label: 'Sides', icon: Salad },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Category Tabs */}
            <div className="flex gap-4 justify-center mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${category === cat.id
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-orange-50'
                            }`}
                    >
                        <cat.icon size={20} />
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="text-center py-20">Loading menu...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold">
                                        ${item.price}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 min-h-[40px]">{item.description}</p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${item.inventory > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {item.inventory > 0 ? `${item.inventory} in stock` : 'Out of Stock'}
                                    </span>

                                    <button
                                        onClick={() => addToCart(item._id)}
                                        disabled={item.inventory === 0}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;
