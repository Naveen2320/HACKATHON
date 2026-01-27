import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { menuService } from '../services/menuService';
import { CATEGORIES } from '../config/constants';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('category');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            let data;
            if (selectedCategory === 'all') {
                data = await menuService.getAllItems();
            } else {
                data = await menuService.getItemsByCategory(selectedCategory);
            }

            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Please try again later.');
            // Use mock data for development
            setProducts(getMockProducts(selectedCategory));
        } finally {
            setLoading(false);
        }
    };

    const getMockProducts = (categoryId) => {
        const allProducts = [
            { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizzas', description: 'Classic tomato and mozzarella' },
            { id: 2, name: 'Pepperoni Pizza', price: 14.99, category: 'Pizzas', description: 'Loaded with pepperoni' },
            { id: 3, name: 'Veggie Supreme', price: 13.99, category: 'Pizzas', description: 'Fresh vegetables galore' },
            { id: 4, name: 'Cola', price: 2.99, category: 'Drinks', description: 'Refreshing cola' },
            { id: 5, name: 'Lemonade', price: 3.49, category: 'Drinks', description: 'Fresh squeezed lemonade' },
            { id: 6, name: 'Iced Tea', price: 2.99, category: 'Drinks', description: 'Cool iced tea' },
            { id: 7, name: 'Chocolate Cake', price: 5.99, category: 'Desserts', description: 'Rich chocolate cake' },
            { id: 8, name: 'Tiramisu', price: 6.99, category: 'Desserts', description: 'Classic Italian dessert' },
            { id: 9, name: 'Ice Cream', price: 4.99, category: 'Desserts', description: 'Vanilla ice cream' },
        ];

        if (categoryId === 'all') return allProducts;

        const category = CATEGORIES.find(cat => cat.id === parseInt(categoryId));
        return allProducts.filter(p => p.category === category?.name);
    };

    const currentCategory = CATEGORIES.find(cat => cat.id === parseInt(selectedCategory));

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
                        {currentCategory ? currentCategory.name : 'All Products'}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        {currentCategory ? currentCategory.description : 'Browse our complete menu'}
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === 'all'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'bg-card text-foreground border border-border hover:border-primary'
                            }`}
                    >
                        All
                    </button>
                    {CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id.toString())}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category.id.toString()
                                    ? 'bg-primary text-primary-foreground shadow-lg'
                                    : 'bg-card text-foreground border border-border hover:border-primary'
                                }`}
                        >
                            {category.icon} {category.name}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-destructive text-lg mb-4">{error}</p>
                        <button
                            onClick={fetchProducts}
                            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
