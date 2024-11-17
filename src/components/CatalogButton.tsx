import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/catalog-button.css';

interface CatalogButtonProps {
    position: 'start' | 'center' | 'end';
    text: string;
}

const CatalogButton: React.FC<CatalogButtonProps> = ({ position, text }) => {
    return (
        <div className={`catalog-button-container ${position}`}>
            <Link to="/catalog" className="catalog-button">
                {text}
            </Link>
        </div>
    );
};

export default CatalogButton;