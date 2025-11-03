import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);
 
  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
          onError={(e) => { e.target.src = `https://placehold.co/600x400/EEE/31343C?text=${product.name.replace(' ', '+')}` }}
        />
      </div>
      <div className="product-card-content">
        <span className="product-card-category">{product.category?.name || 'Uncategorized'}</span>
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>
        <div className="product-card-rating">
          <StarRating rating={product.rating || 0} />
          <span className="review-count">
            {product.reviewCount || 0} reviews
          </span>
        </div>
        <p className="product-card-description" title={product.description}>
          {product.description}
        </p>
        <div className="product-card-footer">
          <span className="product-card-price">{formattedPrice}</span>
          <button className="buy-button">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}