import React, {useRef, useState, useEffect, useCallback} from 'react';
import ProductCard from './ProductCard';

interface ProductsCarouselProps {
    products: Array<{ title: string; rating: number; image: string }>;
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ products }) => {
    const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Инициализация первых пяти видимых элементов
        updateVisibleProducts(0);
        startAutoScroll();

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [products]);

    const resetAutoScroll = useCallback(() => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
        startAutoScroll();
    },[products]);

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
        resetAutoScroll();

        // Сброс флага анимации
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300); // Время должно совпадать с длительностью CSS-анимации
    }, [currentIndex, isTransitioning, products.length, resetAutoScroll, updateVisibleProducts]);

    const startAutoScroll = useCallback(() => {
        autoScrollRef.current = setInterval(() => {
            handleScroll('right');
        }, 5000);
    }, [handleScroll]);

    const getItemClass = (index: number) => {
        const position = index - 2; // -2, -1, 0, 1, 2
        const classes = ['carousel-item'];

        if (position === 0) classes.push('active');
        if (position === -2) classes.push('far-left');
        if (position === -1) classes.push('left');
        if (position === 1) classes.push('right');
        if (position === 2) classes.push('far-right');
        if (isTransitioning) classes.push('transitioning');

        return classes.join(' ');
    };

    return (
        <div className="products-carousel">
            <div className="carousel-wrapper">
                <button
                    className="carousel-nav left"
                    onClick={() => handleScroll('left')}
                >
                    &lt;
                </button>
                <div
                    className="carousel-container"
                    ref={carouselRef}
                >
                    {visibleProducts.map((productIndex, index) => (
                        <div
                            key={`${productIndex}-${index}`}
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
                    onClick={() => handleScroll('right')}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default ProductsCarousel;