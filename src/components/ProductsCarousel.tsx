import React, { useRef, useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import '../styles/carousel.css';

interface ProductsCarouselProps {
    products: Array<{ title: string; rating: number; image: string }>;
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ products }) => {
    const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoScrollRef = useRef<NodeJS.Timeout>();
    const isMouseOver = useRef(false);

    const updateVisibleProducts = useCallback((centerIndex: number) => {
        const indices = [];
        for (let i = -2; i <= 2; i++) {
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
        const position = index - 2;
        const classes = ['carousel-item'];

        if (isTransitioning) classes.push('transitioning');
        if (position === 0) classes.push('active');
        if (position === -2) classes.push('far-left');
        if (position === -1) classes.push('left');
        if (position === 1) classes.push('right');
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
                            key={`${productIndex}-${products[productIndex].title}`}
                            className={getItemClass(index)}
                        >
                            <ProductCard
                                title={products[productIndex].title}
                                rating={products[productIndex].rating}
                                image={products[productIndex].image}
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