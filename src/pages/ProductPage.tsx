import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import "../styles/product-page.css";

const ProductPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([
        { id: 1, author: 'Пользователь 1', rating: 5, text: 'Отличный товар!', date: '2024-03-15' },
        { id: 2, author: 'Пользователь 2', rating: 4, text: 'Хороший товар, но есть небольшие недочеты', date: '2024-03-14' }
    ]);

    const product = {
        name: "Название товара",
        images: [
            "/assets/images/books.jpg",
            "/assets/images/mochi.jpg",
            "/assets/images/dango.jpg"
        ],
        rating: 4.5,
        totalReviews: 128,
        description: "Подробное описание товара...",
        inStock: 5,
        price: "14999₽",
    };

    const recommendations = [
        { id: 1, name: "Рекомендуемый товар 1", image: "/assets/images/mochi.jpg", price: "999₽" },
        { id: 2, name: "Рекомендуемый товар 2", image: "/assets/images/dango.jpg", price: "1499₽" },
        { id: 3, name: "Рекомендуемый товар 3", image: "/assets/images/books.jpg", price: "1299₽" },
    ];

    const nextSlide = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    const prevSlide = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

    const handleReviewSubmit = () => {
        if (reviewText.trim()) {
            setReviews([...reviews, { id: reviews.length + 1, author: 'Вы', rating: 5, text: reviewText, date: new Date().toISOString().split('T')[0] }]);
            setReviewText('');
        }
    };

    return (
        <div className="product-page">
            <div className="product-left">
                {/* Галерея */}
                <div className="product-gallery">
                    <button className="gallery-nav left" onClick={prevSlide}>
                        <ChevronLeft className="icon" />
                    </button>
                    <div className="gallery-image">
                        <img src={product.images[currentImageIndex]} alt={`Товар ${currentImageIndex + 1}`} />
                    </div>
                    <button className="gallery-nav right" onClick={nextSlide}>
                        <ChevronRight className="icon" />
                    </button>
                    <div className="gallery-indicators">
                        {product.images.map((_, index) => (
                            <div
                                key={index}
                                className={`indicator ${currentImageIndex === index ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Информация о товаре */}
                <div className="product-details">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-price">{product.price}</div>
                    <div className="product-reviews-summary">
                        <Star className="icon filled" />
                        <span>{product.rating} ({product.totalReviews} отзывов)</span>
                    </div>
                    <div className="quantity-control">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => Math.min(product.inStock, q + 1))}>+</button>
                    </div>
                    <div className="product-actions">
                        <button className="btn-important">
                            <ShoppingCart className="icon" /> Купить
                        </button>
                        <button className="btn-important">
                            <Heart className="icon" /> В избранное
                        </button>
                    </div>
                </div>

                {/* Секция отзывов */}
                <div className="product-reviews">
                    <h2 className="reviews-title">Отзывы</h2>
                    <div className="review-input-container">
                        <textarea
                            className="review-input"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Оставьте отзыв..."
                        />
                        <button className="btn-important" onClick={handleReviewSubmit}>Отправить</button>
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

            {/* Рекомендуемые товары */}
            <div className="product-right">
                <h2 className="recommendations-title">Рекомендуем</h2>
                <div className="recommendation-list">
                    {recommendations.map((item) => (
                        <div key={item.id} className="recommendation-item">
                            <img src={item.image} alt={item.name} />
                            <div className="recommendation-info">
                                <p>{item.name}</p>
                                <span>{item.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
