import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';

const BestSellers = () => {
  const { data: products = [] } = useProducts();
  const bestSellers = products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.8).slice(0, 4);

  return (
    <section className="luxury-section bg-background">
      <div className="luxury-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="luxury-subheading mb-4">Most Loved</p>
            <h2 className="luxury-heading">Best Sellers</h2>
          </div>
          <a href="/shop" className="luxury-underline font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mt-4 md:mt-0 pb-0.5">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
