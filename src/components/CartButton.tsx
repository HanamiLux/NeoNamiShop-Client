import React from 'react';
import { ShoppingCart } from 'lucide-react';
import {useCart} from "./CartProvider";

interface CartButtonProps {
    onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
    const { items } = useCart();

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            aria-label="Open shopping cart"
        >
            <div className="relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </div>
                )}
            </div>
        </button>
    );
};

export default CartButton;