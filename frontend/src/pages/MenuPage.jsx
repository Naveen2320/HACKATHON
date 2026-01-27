import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'pizza', label: 'Pizzas' },
        { id: 'drinks', label: 'Drinks' },
        { id: 'sides', label: 'Sides' },
    ];

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/menu`);
            setMenuItems(response.data);
        } catch (err) {
            setError('Failed to load menu. Please try again.');
            console.error('Menu fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredItems = activeCategory === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    const getCategoryCount = (category) => {
        if (category === 'all') return menuItems.length;
        return menuItems.filter(item => item.category === category).length;
    };

    return (
        <div className="min-h-screen py-8 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1D3557] mb-4 font-['Fraunces']">
                        Our Menu
                    </h1>
                    <p className="text-[#457B9D] text-lg max-w-2xl mx-auto">
                        Fresh ingredients, authentic recipes, unforgettable taste
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${activeCategory === category.id
                                    ? 'bg-[#E63946] text-white shadow-lg transform scale-105'
                                    : 'bg-white text-[#1D3557] hover:bg-[#F1FAEE] border border-[#A8DADC]'
                                }`}
                            data-testid={`category-${category.id}`}
                        >
                            {category.label}
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeCategory === category.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-[#F1FAEE] text-[#457B9D]'
                                }`}>
                                {getCategoryCount(category.id)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <LoadingSpinner size="lg" />
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-20">
                        <p className="text-[#E63946] text-lg mb-4">{error}</p>
                        <button
                            onClick={fetchMenuItems}
                            className="px-6 py-3 bg-[#E63946] text-white rounded-full font-semibold hover:bg-[#E63946]/90"
                            data-testid="retry-button"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Menu grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                className="animate-slide-up"
                            >
                                <ProductCard product={item} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-[#457B9D] text-lg">No items found in this category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
