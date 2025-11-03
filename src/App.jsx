import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
 
const API_BASE_URL = 'http://localhost:5299';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('light');
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    rating: 0,
    sortBy: 'featured',
    inStock: false
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
 
      const url = new URL(`${API_BASE_URL}/api/products`);
      if (searchTerm) {
        url.searchParams.append('search', searchTerm);
      }
      if (selectedCategory) {
        url.searchParams.append('categoryId', selectedCategory);
      }
 
      try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        let errorMessage = e.message;
        if (e instanceof TypeError) {
          errorMessage = "Failed to connect to the API. Is your backend server running?";
        }
        setError(errorMessage);
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    }
 
    async function fetchCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      }
    }
 
    fetchData(); 
    if (categories.length === 0) {
      fetchCategories(); 
    }
  }, [searchTerm, selectedCategory]); 

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setFilters({
      priceRange: { min: 0, max: 10000 },
      rating: 0,
      sortBy: 'featured',
      inStock: false
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = !searchTerm || 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
        
        const matchesPrice = (!filters.priceRange.min || product.price >= filters.priceRange.min) &&
          (!filters.priceRange.max || product.price <= filters.priceRange.max);
        
        const matchesRating = !filters.rating || (product.rating >= filters.rating);
        
        const matchesStock = !filters.inStock || product.inStock;

        return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesStock;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'priceLow':
            return a.price - b.price;
          case 'priceHigh':
            return b.price - a.price;
          case 'nameAsc':
            return a.name.localeCompare(b.name);
          case 'nameDesc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [products, searchTerm, selectedCategory, filters]);
 
  return (
    <div className="app-container">
      <Header
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
 
      <div className="main-layout">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onClearFilters={handleClearFilters}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
 
        <main className="main-content">
          <div className="content-header">
            <p className="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
}


function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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

function ProductSkeleton() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-short"></div>
        <div className="skeleton-line skeleton-line-medium"></div>
        <div className="skeleton-line skeleton-line-long"></div>
        <div className="skeleton-line skeleton-line-long" style={{ width: '80%' }}></div>
        <div className="skeleton-footer">
          <div className="skeleton-line skeleton-price"></div>
          <div className="skeleton-line skeleton-button"></div>
        </div>
      </div>
    </div>
  );
}