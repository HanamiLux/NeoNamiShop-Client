import React, {useEffect, useState} from 'react';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductDto } from "../models/Product";
import "../styles/product-page.css";
import {useCart} from "../components/CartProvider";
import {FeedbackDto} from "../models/Feedback";
import axios from "axios";
import {UserUtils} from "../utils/UserUtils";
import {Rating} from "react-simple-star-rating";
import {Order} from "../models/Order";

interface ProductPageProps {
    product: ProductDto;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
    const [quantity, setQuantity] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [reviews, setReviews] = useState<FeedbackDto[]>([]);
    const [loading, setLoading] = useState(false);
    const userId = UserUtils.getUserId();
    const [canReview, setCanReview] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    const handleImagesError = (index: number) => {
        setImageErrors(prev => ({ ...prev, [index]: true }));
    };

    const [imgSrc, setImgSrc] = useState<string>('/assets/images/no_image.webp');
    const [imageError, setImageError] = useState<boolean>(false);

    const handleImageError = () => {
        setImageError(true);
        setImgSrc('/assets/images/no_image.webp');
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get<{ items: FeedbackDto[] }>(
                    `${process.env.REACT_APP_API_URL}/feedbacks/product/${product.productId}`
                );

                const reviewsWithLogins = await Promise.all(
                    response.data.items.map(async review => {
                        const userResponse = await axios.get(
                            `${process.env.REACT_APP_API_URL}/users/${review.userId}`
                        );
                        return {
                            ...review,
                            userLogin: userResponse.data.login
                        };
                    })
                );

                setReviews(reviewsWithLogins);
            } catch (error) {
                console.error('Ошибка при загрузке отзывов:', error);
            }
        };
        fetchReviews();
    }, [product.productId]);

    useEffect(() => {
        const checkReviewConditions = async () => {
            if (!userId) {
                setCanReview(false);
                return;
            }

            try {
                const ordersResponse = await axios.get<{ items: Order[]; total: number }>(
                    `${process.env.REACT_APP_API_URL}/orders/user/${userId}`
                );

                const hasAccess = ordersResponse.data.items.some(
                    order => order.products?.some(
                        item => item.productId === product.productId
                    ) && order.status === 'completed'
                );

                const userReview = reviews.find(review => review.userId === userId);
                setCanReview(hasAccess);
                setHasReviewed(!!userReview);
            } catch (error) {
                console.error('Ошибка проверки доступа:', error);
                setCanReview(false);
            }
        };

        checkReviewConditions();
    }, [userId, product.productId, reviews]);


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

    const handleReviewSubmit = async () => {
        if (!reviewText.trim() || reviewRating === 0) return;

        try {
            setLoading(true);
            const newReview = {
                productId: product.productId,
                rate: reviewRating,
                content: reviewText
            };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/feedbacks`, newReview, {
                params: { userId: userId }
            });

            setReviews(prev => [response.data, ...prev]);
            setHasReviewed(true);
            setReviewText('');
            setReviewRating(0);
        } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
        } finally {
            setLoading(false);
        }
    };

    const numericRating = typeof product.averageRating === 'string'
        ? parseFloat(product.averageRating )
        : Number(product.averageRating ) || 0;
    const ratingText = numericRating > 0
        ? numericRating.toFixed(1)
        : '0.0';

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
                                src={imageErrors[currentImageIndex] ? '/assets/images/no_image.webp' : product.imagesUrl[currentImageIndex]}
                                alt={`${product.productName} - изображение ${currentImageIndex + 1}`}
                                onError={() => handleImagesError(currentImageIndex)}
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
                    <h1 className="product-price">{product.productName}</h1>
                    <div className="product-price">{product.price.toLocaleString()}₽</div>
                    <div className="product-reviews-summary">{product.description.toLocaleString()}</div>
                    <div className="product-reviews-summary">
                        <Star size={20} fill="#8b0000" stroke="#8b0000"/>
                        {ratingText}
                        ({product.totalFeedbacks} отзывов)
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
                            disabled={quantity >= product.quantity }
                        >
                            +
                        </button>
                    </div>
                    <div className="product-actions">
                        <button
                            className="btn-important"
                            onClick={handleAddToCart}
                            disabled={ product.quantity == 0 }
                        >
                            <ShoppingCart size={20}/> В корзину
                        </button>
                        {/*<button className="btn-important">*/}
                        {/*    <Heart size={20}/> В избранное*/}
                        {/*</button>*/}
                    </div>
                </div>

                <div className="product-reviews">
                    <h2 className="reviews-title">Отзывы</h2>
                    {canReview && !hasReviewed ? (
                    <div className="review-input-container">
                        <div className="rating-input">
                            <Rating
                                initialValue={reviewRating}
                                onClick={(value: number) => setReviewRating(value)}
                                size={25}
                                fillColor="#8b0000"
                                emptyColor="#C0C0C0"
                                allowFraction={false}
                            />
                            <span>{reviewRating > 0 ? `Ваша оценка: ${reviewRating}` : 'Выберите оценку'}</span>
                        </div>
                        <textarea
                            className="review-input"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Оставьте подробный отзыв о товаре..."
                            rows={4}
                            maxLength={500}
                        />
                        <button
                            className="btn-important"
                            onClick={handleReviewSubmit}
                            disabled={!reviewText.trim() || reviewRating === 0 || loading}
                        >
                            {loading ? 'Отправка...' : 'Опубликовать отзыв'}
                        </button>
                    </div>
                        ) : hasReviewed ? (
                        <p>Вы уже оставили отзыв на этот товар</p>
                    ) : (
                        <p>Отзывы могут оставлять только покупатели товара</p>
                    )}
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <div key={review.feedbackId} className="review-card">
                                <div className="review-header">
                                    <span className="review-author">{review.userLogin}</span>
                                    <div className="review-rating">
                                        <Rating
                                            initialValue={review.rate}
                                            readonly
                                            size={15}
                                            fillColor="#8b0000"
                                            emptyColor="#C0C0C0"
                                        />
                                    </div>
                                    <span className="review-date">
                                    {new Date(review.date).toLocaleDateString()}
                                </span>
                                </div>
                                <p className="review-text">{review.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-right">
                <h2 className="recommendations-title">Похожие товары</h2>
                <div className="recommendation-list">
                    <div className="recommendation-item">
                        <img src={imageError ? '/assets/images/no_image.webp' : product.imagesUrl?.[0]}
                             alt={product.productName} onError={handleImageError}/>
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