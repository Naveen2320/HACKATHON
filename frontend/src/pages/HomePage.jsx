import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES, ROUTES } from '../config/constants';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 animate-fade-in">
                        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            Welcome to FoodHub
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
                        Discover delicious meals, handcrafted with love. Order now and enjoy!
                    </p>

                    {/* Decorative accent text */}
                    <div className="font-accent text-4xl md:text-5xl text-secondary mb-12 animate-fade-in">
                        Fresh • Delicious • Fast
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold font-serif text-center mb-4">
                        Browse Our Menu
                    </h2>
                    <p className="text-center text-muted-foreground mb-12 text-lg">
                        Choose from our delicious categories
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                        {CATEGORIES.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                to={`${ROUTES.MENU}?category=${category.id}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
                        Ready to Order?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Browse our full menu and get your favorite meals delivered to your door
                    </p>
                    <Link
                        to={ROUTES.MENU}
                        className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        View All Products
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
