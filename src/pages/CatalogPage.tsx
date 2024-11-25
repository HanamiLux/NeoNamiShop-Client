import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/catalog.css';
import ProductCard from '../components/ProductCard';
import ParallaxBackground from "../components/ParallaxBackground";
import { ProductDto } from "../models/Product";
import { CategoryDto } from "../models/Category";

const CatalogPage: React.FC = () => {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filters = {
        'Цена': ['До 1000₽', '1000₽ - 5000₽', '5000₽ - 10000₽', 'Более 10000₽'],
        'Рейтинг': ['5 звезд', '4+ звезды', '3+ звезды'],
        'Наличие': ['В наличии', 'Под заказ'],
        'Скидки': ['Со скидкой', 'Без скидки']
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    axios.get<{ items: ProductDto[], total: number }>(`${process.env.REACT_APP_API_URL}/products`),
                    axios.get<{ items: CategoryDto[], total: number }>(`${process.env.REACT_APP_API_URL}/categories`)
                ]);

                setProducts(productsResponse.data.items);
                setCategories(categoriesResponse.data.items);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'all' || product.category.categoryName === activeCategory;
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilters = Object.entries(selectedFilters).every(([filter, isSelected]) => {
            if (!isSelected) return true;
            // Implement your filter logic here
            // Example: if (filter === 'До 1000₽' && product.price <= 1000) return true;
            return true;
        });

        return matchesCategory && matchesSearch && matchesFilters;
    });

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <>
            <ParallaxBackground title="ТОВАРЫ" image="/assets/images/catalog5.png" />
            <div className="catalog-container">
                <div className="catalog-header">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск товаров..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="category-tabs">
                        <button
                            key="all"
                            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('all')}
                        >
                            Все
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.categoryId}
                                className={`category-tab ${activeCategory === category.categoryName ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.categoryName)}
                            >
                                {category.categoryName}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="catalog-content">
                    <aside className="filters-sidebar">
                        {Object.entries(filters).map(([section, options]) => (
                            <div key={section} className="filter-section">
                                <h3 className="filter-title">{section}</h3>
                                <div className="filter-list">
                                    {options.map((option) => (
                                        <label key={option} className="filter-item">
                                            <input
                                                type="checkbox"
                                                className="filter-checkbox"
                                                checked={selectedFilters[option] || false}
                                                onChange={() => {
                                                    setSelectedFilters({
                                                        ...selectedFilters,
                                                        [option]: !selectedFilters[option]
                                                    });
                                                }}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </aside>

                    <div className="products-grid">
                        {filteredProducts.map((product) => {
                            if (product.productId && product.productName && product.averageRating !== undefined && product.imagesUrl) {
                                return (
                                    <ProductCard
                                        key={product.productId}
                                        id={product.productId}
                                        title={product.productName}
                                        rating={product.averageRating}
                                        image={product.imagesUrl?.[0] || 'assets/images/no_image.webp'}
                                    />
                                );
                            } else {
                                console.warn('Product is missing required properties:', product);
                                return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CatalogPage;