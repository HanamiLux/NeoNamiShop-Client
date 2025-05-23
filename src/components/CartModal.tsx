import React from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from "./CartProvider";
import "../styles/modal.css";

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { items, updateQuantity, removeFromCart, clearCart } = useCart();

    if (!isOpen) return null;

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const handleOrderSubmit = async () => {
        if (items.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        const orderData = {
            address: "Ваш адрес доставки", // Здесь вы можете запросить адрес у пользователя
            total: calculateTotal(),
            products: items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/orders?userId=${localStorage.getItem("userId")}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Не удалось оформить заказ");
            }

            alert("Заказ успешно оформлен!");
            clearCart(); // Очищаем корзину после успешного оформления
            onClose();
        } catch (error) {
            console.error("Ошибка оформления заказа:", error);
            alert("Не удалось оформить заказ. Попробуйте снова.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="flex items-center gap-2">
                        <ShoppingCart size={24} />
                        Корзина
                    </h2>
                    <button onClick={onClose} className="close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    {items.length === 0 ? (
                        <p className="text-center py-4">Корзина пуста</p>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.productId} className="flex items-center gap-4 p-2 border rounded">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.productName}</h3>
                                        <p className="text-sm">{item.price.toLocaleString()}₽</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            disabled={item.quantity >= item.maxQuantity}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="btn-link text-red-500"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="modal-footer">
                        <div className="font-bold">
                            Итого: {calculateTotal().toLocaleString()}₽
                        </div>
                        <button className="btn-important" onClick={handleOrderSubmit}>
                            Оформить заказ
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
