import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
      </div>
    );
  }
 
  if (error) {
    return <div className="error-message">
      <strong>Error:</strong> {error}
    </div>;
  }
 
  if (products.length === 0) {
    return <div className="text-center text-gray-500 py-10">
      <h3 className="text-xl font-semibold">No products found.</h3>
    </div>;
  }
 
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
}