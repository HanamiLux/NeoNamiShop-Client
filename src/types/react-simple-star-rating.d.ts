declare module 'react-simple-star-rating' {
    import React from 'react';

    interface RatingProps {
        initialValue?: number;
        readonly?: boolean;
        size?: number;
        fillColor?: string;
        emptyColor?: string;
        allowFraction?: boolean;
        onClick?: (value: number) => void;
    }

    export const Rating: React.FC<RatingProps>;
}