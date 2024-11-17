import React, { useState } from 'react';
import '../styles/catalog.css';
import ProductCard from '../components/ProductCard';
import Footer from "../components/Footer";
import ParallaxBackground from "../components/ParallaxBackground";

interface Product {
    id: number;
    title: string;
    rating: number;
    image: string;
    category: string;
    price: number;
}

const CatalogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});

    const categories = [
        'Все товары',
        'Книги',
        'Еда',
        'Электроника',
        'Одежда',
        'Аксессуары',
        'Манга',
        'Фигурки'
    ];

    const filters = {
        'Цена': ['До 1000₽', '1000₽ - 5000₽', '5000₽ - 10000₽', 'Более 10000₽'],
        'Рейтинг': ['5 звезд', '4+ звезды', '3+ звезды'],
        'Наличие': ['В наличии', 'Под заказ'],
        'Скидки': ['Со скидкой', 'Без скидки']
    };

    // Моковые данные для примера
    const products: Product[] = [
        {
            id: 1,
            title: 'Учебник みんなの日本語',
            rating: 4.5,
            image: 'assets/images/books.jpg',
            category: 'Книги',
            price: 2500
        },
        {
            id: 2,
            title: 'Хелперы по дому',
            rating: 4.8,
            image: 'assets/images/cleanings.jpg',
            category: 'Уборка',
            price: 1500
        },
        {
            id: 3,
            title: 'Шар в рот',
            rating: 3.7,
            image: 'assets/images/dango.jpg',
            category: 'Еда',
            price: 500
        },
        {
            id: 4,
            title: 'Подарок подруге',
            rating: 5.0,
            image: 'assets/images/dakimakura.jpg',
            category: 'Подарки',
            price: 3000
        },
        {
            id: 5,
            title: 'Моти',
            rating: 5.0,
            image: 'assets/images/mochi.jpg',
            category: 'Еда',
            price: 800
        },
        {
            id: 6,
            title: 'Робот-медведь',
            rating: 5.0,
            image: 'assets/images/robear.jfif',
            category: 'Техника',
            price: 10000
        },
        {
            id: 7,
            title: 'Учебник みんなの日本語',
            rating: 4.5,
            image: 'assets/images/books.jpg',
            category: 'Книги',
            price: 2500
        },
        {
            id: 8,
            title: 'Хелперы по дому',
            rating: 4.8,
            image: 'assets/images/cleanings.jpg',
            category: 'Уборка',
            price: 1500
        },
        {
            id: 9,
            title: 'Шар в рот',
            rating: 3.7,
            image: 'assets/images/dango.jpg',
            category: 'Еда',
            price: 500
        },
        {
            id: 10,
            title: 'Подарок подруге',
            rating: 5.0,
            image: 'assets/images/dakimakura.jpg',
            category: 'Подарки',
            price: 3000
        },
        {
            id: 11,
            title: 'Моти',
            rating: 5.0,
            image: 'assets/images/mochi.jpg',
            category: 'Еда',
            price: 800
        },
        {
            id: 12,
            title: 'Робот-медведь',
            rating: 5.0,
            image: 'assets/images/robear.jfif',
            category: 'Техника',
            price: 10000
        }
    ];

    return (
        <>
            <ParallaxBackground title="ТОВАРЫ" image="/assets/images/catalog-bg.jpg" />
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
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
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
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            rating={product.rating}
                            image={product.image}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default CatalogPage;