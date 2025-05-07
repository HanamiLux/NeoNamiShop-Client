import React, {useState} from 'react';
import '../styles/product-card.css';
import { Link } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';

interface ProductCardProps {
    id: number;
    title: string;
    rating: number | null | string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, rating, image }) => {
    const [imgSrc, setImgSrc] = useState<string>(image);
    const [imageError, setImageError] = useState<boolean>(false);

    const handleImageError = () => {
        setImageError(true);
        setImgSrc('/assets/images/no_image.webp');
    };

    const numericRating = typeof rating === 'string'
        ? parseFloat(rating)
        : Number(rating) || 0;
    const ratingText = numericRating > 0
        ? numericRating.toFixed(1)
        : '0.0';

    return (
        <Link to={`/product/${id}`} key={id}>
            <div className="product-card">
                <div className="product-image-container">
                    <img src={imageError ? '/assets/images/no_image.webp' : imgSrc} alt={title} onError={handleImageError} className="product-image" />
                    <div className="product-image-overlay"></div>
                </div>
                <h3 className="product-title">{title}</h3>
                <div className="product-info">
                    <div className="product-rating">
                        <Rating
                            initialValue={numericRating}
                            readonly
                            size={20}
                            fillColor="#8b0000"
                            emptyColor="#C0C0C0"
                            allowFraction
                        />
                        <span className="ml-2">{ratingText}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;