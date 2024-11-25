import React, { useRef, useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import '../styles/carousel.css';
import { ProductDto } from "../models/Product";

interface ProductsCarouselProps {
    products: ProductDto[];
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ products }) => {
    const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoScrollRef = useRef<NodeJS.Timeout>();
    const isMouseOver = useRef(false);

    const updateVisibleProducts = useCallback((centerIndex: number) => {
        const indices = [];
        const totalVisible = Math.min(5, products.length); // Максимум 5 видимых товаров
        const halfVisible = Math.floor(totalVisible / 2);

        for (let i = -halfVisible; i <= halfVisible; i++) {
            const index = (centerIndex + i + products.length) % products.length;
            indices.push(index);
        }
        setVisibleProducts(indices);
    }, [products]);

    const handleScroll = useCallback((direction: 'left' | 'right') => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const newIndex = direction === 'left'
            ? (currentIndex - 1 + products.length) % products.length
            : (currentIndex + 1) % products.length;

        setCurrentIndex(newIndex);
        updateVisibleProducts(newIndex);

        // Убираем класс transitioning после завершения анимации
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    }, [currentIndex, isTransitioning, products.length, updateVisibleProducts]);

    const startAutoScroll = useCallback(() => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }

        autoScrollRef.current = setInterval(() => {
            if (!isMouseOver.current && !isTransitioning) {
                handleScroll('right');
            }
        }, 5000);
    }, [handleScroll]);

    // Инициализация карусели
    useEffect(() => {
        updateVisibleProducts(currentIndex);
        startAutoScroll();

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [currentIndex, products, updateVisibleProducts, startAutoScroll]);

    // Обработка ручной прокрутки
    const handleManualScroll = useCallback((direction: 'left' | 'right') => {
        handleScroll(direction);
        // Перезапускаем автопрокрутку после ручного переключения
        startAutoScroll();
    }, [handleScroll, startAutoScroll]);

    const handleMouseEnter = useCallback(() => {
        isMouseOver.current = true;
    }, []);

    const handleMouseLeave = useCallback(() => {
        isMouseOver.current = false;
    }, []);

    const getItemClass = (index: number) => {
        const position = index - Math.floor(visibleProducts.length / 2);
        const classes = ['carousel-item'];
        if (isTransitioning) classes.push('transitioning');
        if (position === 0) classes.push('active');
        if (position === -1) classes.push('left');
        if (position === 1) classes.push('right');
        if (position === -2) classes.push('far-left');
        if (position === 2) classes.push('far-right');

        return classes.join(' ');
    };

    return (
        <div className="products-carousel">
            <div
                className="carousel-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    className="carousel-nav left"
                    onClick={() => handleManualScroll('left')}
                >
                    &lt;
                </button>
                <div className="carousel-container content">
                    {visibleProducts.map((productIndex, index) => (
                        <div
                            key={`${products[productIndex].productId}-${index}`}
                            className={getItemClass(index)}
                        >
                            <ProductCard
                                id={products[productIndex].productId}
                                title={products[productIndex].productName}
                                rating={products[productIndex].averageRating}
                                image={products[productIndex]?.imagesUrl?.[0] || 'assets/images/no_image.webp'}
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-nav right"
                    onClick={() => handleManualScroll('right')}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ProductsCarousel;