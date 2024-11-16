import React from 'react';

interface ProductCardProps {
    title: string;
    rating: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, rating, image }) => {
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {'★'.repeat(fullStars)}
                {hasHalfStar ? '\u2BE8' : ''}
                {'☆'.repeat(emptyStars)}
                <span className="ml-2">{rating.toFixed(1)}</span>
            </>
        );
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={image} alt={title} className="product-image" />
                <div className="product-image-overlay"></div>
            </div>
            <h3 className="product-title">{title}</h3>
            <div className="product-info">
                <div className="product-rating">
                    {renderStars(rating)}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;