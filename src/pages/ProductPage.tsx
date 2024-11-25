import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductDto } from "../models/Product";
import "../styles/product-page.css";
import {useCart} from "../components/CartProvider";

interface ProductPageProps {
    product: ProductDto;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [reviews] = useState([
        { id: 1, author: 'Пользователь 1', rating: 5, text: 'Отличный товар!', date: '2024-03-15' },
        { id: 2, author: 'Пользователь 2', rating: 4, text: 'Хороший товар, но есть небольшие недочеты', date: '2024-03-14' }
    ]);


    const handleAddToCart = () => {
        addToCart({
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            quantity: quantity,
            imageUrl: product.imagesUrl?.[0] || '',
            maxQuantity: product.quantity
        });
    };

    const handleNextSlide = () => {
        if (product.imagesUrl && product.imagesUrl.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.imagesUrl!.length);
        }
    };

    const handlePrevSlide = () => {
        if (product.imagesUrl && product.imagesUrl.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.imagesUrl!.length) % product.imagesUrl!.length);
        }
    };

    const handleReviewSubmit = () => {
        // Implement review submission logic
        console.log('Submitting review:', reviewText);
    };

    return (
        <div className="product-page content">
            <div className="product-left">
                {product.imagesUrl && product.imagesUrl.length > 0 && (
                    <div className="product-gallery">
                        <button className="gallery-nav left" onClick={handlePrevSlide}>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="gallery-image">
                            <img
                                src={product.imagesUrl[currentImageIndex]}
                                alt={`${product.productName} - изображение ${currentImageIndex + 1}`}
                            />
                        </div>
                        <button className="gallery-nav right" onClick={handleNextSlide}>
                            <ChevronRight size={20} />
                        </button>
                        <div className="gallery-indicators">
                            {product.imagesUrl.map((_, index) => (
                                <div
                                    key={index}
                                    className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="product-details">
                    <h1 className="product-title">{product.productName}</h1>
                    <div className="product-price">{product.price.toLocaleString()}₽</div>
                    <div className="product-reviews-summary">
                        <Star size={20} fill="gold" stroke="gold"/>
                        <span>{product.averageRating.toFixed(1)} ({product.totalFeedbacks} отзывов)</span>
                    </div>
                    <div className="quantity-control">
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))}
                            disabled={quantity >= product.quantity}
                        >
                            +
                        </button>
                    </div>
                    <div className="product-actions">
                        <button
                            className="btn-important"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={20}/> В корзину
                        </button>
                        <button className="btn-important">
                            <Heart size={20}/> В избранное
                        </button>
                    </div>
                </div>

                <div className="product-reviews">
                    <h2 className="reviews-title">Отзывы</h2>
                    <div className="review-input-container">
                        <textarea
                            className="review-input"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Оставьте отзыв..."
                        />
                        <button
                            className="btn-important"
                            onClick={handleReviewSubmit}
                            disabled={!reviewText.trim()}
                        >
                            Отправить
                        </button>
                    </div>
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="review-author">{review.author}</span>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-right">
                <h2 className="recommendations-title">Похожие товары</h2>
                <div className="recommendation-list">
                    <div className="recommendation-item">
                        <img src={product.imagesUrl?.[0]} alt={product.productName} />
                        <div className="recommendation-info">
                            <p>{product.productName}</p>
                            <span>{product.price.toLocaleString()}₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;