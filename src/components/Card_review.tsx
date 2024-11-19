import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Review {
    id: number;
    productId: number;
    product: string;
    text: string;
    rating: number;
}

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${review.productId}`);
    };

    return (
        <li
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow mb-4 last:mb-0"
            onClick={handleClick}
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">{review.product}</h4>
                    <span className="text-lg font-medium">15000₽</span>
                </div>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={20}
                            className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                    ))}
                </div>
                <p className="text-gray-600">{review.text}</p>
            </div>
        </li>
    );
};