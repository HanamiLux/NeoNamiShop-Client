import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    maxQuantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

interface CartProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    onShowAuthModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({
                                                              children,
                                                              isAuthenticated,
                                                              onShowAuthModal
                                                          }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback(
        (newItem: CartItem) => {
            if (!isAuthenticated) {
                onShowAuthModal();
                return;
            }

            setItems((currentItems) => {
                const existingItem = currentItems.find((item) => item.productId === newItem.productId);
                if (existingItem) {
                    return currentItems.map((item) =>
                        item.productId === newItem.productId
                            ? { ...item, quantity: Math.min(item.quantity + newItem.quantity, item.maxQuantity) }
                            : item
                    );
                }
                return [...currentItems, newItem];
            });
        },
        [isAuthenticated, onShowAuthModal]
    );

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.min(Math.max(1, quantity), item.maxQuantity) }
                    : item
            )
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const value = {
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
