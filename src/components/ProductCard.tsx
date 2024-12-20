import React from 'react';
import '../styles/product-card.css';
import { Link } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';

interface ProductCardProps {
    id: number;
    title: string;
    rating: number;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, rating, image }) => {
    return (
        <Link to={`/product/${id}`} key={id}>
            <div className="product-card">
                <div className="product-image-container">
                    <img src={image} alt={title} className="product-image" />
                    <div className="product-image-overlay"></div>
                </div>
                <h3 className="product-title">{title}</h3>
                <div className="product-info">
                    <div className="product-rating">
                        <Rating
                            initialValue={rating}
                            readonly
                            size={20}
                            fillColor="#8b0000"
                            emptyColor="#C0C0C0"
                            allowFraction
                        />
                        <span className="ml-2">{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;