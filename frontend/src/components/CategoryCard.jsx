import { Link } from 'react-router-dom';

const CategoryCard = ({ category, to }) => {
    return (
        <Link to={to}>
            <div className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-primary/50 cursor-pointer">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                    </div>

                    {/* Category Name */}
                    <h3 className="text-2xl font-bold font-serif text-foreground mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm">
                        {category.description}
                    </p>
                </div>

                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-300"></div>
            </div>
        </Link>
    );
};

export default CategoryCard;
