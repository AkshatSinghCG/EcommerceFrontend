export default function Sidebar({ categories, selectedCategory, onCategorySelect, onClearFilters, filters, onFilterChange }) {
  return (
    <aside className="sidebar">
      <div className="filter-section">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="sidebar-list">
          <li>
            <button
              onClick={onClearFilters}
              className={`sidebar-button ${!selectedCategory ? 'sidebar-button-active' : ''}`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.categoryId}>
              <button
                onClick={() => onCategorySelect(category.categoryId)}
                className={`sidebar-button ${selectedCategory === category.categoryId ? 'sidebar-button-active' : ''}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h2 className="sidebar-title">Sort By</h2>
        <select 
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      <div className="filter-section">
        <h2 className="sidebar-title">Price Range</h2>
        <div className="price-range">
          <input
            type="number"
            className="price-input"
            value={filters.priceRange.min}
            onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, min: Number(e.target.value) })}
            min="0"
            placeholder="Min"
          />
          <span>to</span>
          <input
            type="number"
            className="price-input"
            value={filters.priceRange.max}
            onChange={(e) => onFilterChange('priceRange', { ...filters.priceRange, max: Number(e.target.value) })}
            min="0"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="filter-section">
        <h2 className="sidebar-title">Rating</h2>
        <div className="rating-filter">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              className={`rating-button ${filters.rating === star ? 'active' : ''}`}
              onClick={() => onFilterChange('rating', filters.rating === star ? 0 : star)}
            >
              {star}+ ★
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="stock-filter">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange('inStock', e.target.checked)}
          />
          In Stock Only
        </label>
      </div>
    </aside>
  );
}