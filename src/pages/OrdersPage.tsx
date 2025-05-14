import React, { useEffect, useState } from "react";
import ParallaxBackground from "../components/ParallaxBackground";
import { Order } from "../models/Order";
import "../styles/user-profile.css";
import "../styles/order.css";
import axios from "axios";
import { UserDto } from "../types/user";
import { UserService } from "../services/userService";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<UserDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState<string>('/assets/images/no_image.webp');
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

    const handleImageError = (productId: number) => {
        setImageErrors(prev => ({...prev, [productId]: true}));
    };

    // Параметры пагинации
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("Пользователь не найден.");
                    return;
                }

                const userResponse = await UserService.getUser(userId);
                setUser(userResponse);

                const ordersResponse = await axios.get<{ items: Order[]; total: number }>(
                    `${process.env.REACT_APP_API_URL}/orders/user/${userId}`,
                    {
                        params: {
                            take: itemsPerPage,
                            page: currentPage,
                        },
                    }
                );

                setOrders(ordersResponse.data.items || []);
                setTotalPages(Math.ceil(ordersResponse.data.total / itemsPerPage));
            } catch (err) {
                setError("Не удалось загрузить данные.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    // Цвета для статусов
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case "completed":
                return "#4CAF50";
            case "pending":
                return "#FFC107";
            case "cancelled":
                return "#8b0000";
            case "shipped":
                return "#006b8b";
            case "processing":
                return "#b700ff";
            default:
                return "white";
        }
    };

    const getStatus = (status: string): string => {
        switch (status.toLowerCase()) {
            case "completed":
                return "Завершен";
            case "pending":
                return "В ожидании";
            case "cancelled":
                return "Отменен";
            case "shipped":
                return "В пути";
            case "processing":
                return "В обработке";
            default:
                return "";
        }
    };

    // Проверка на загрузку данных или ошибку
    if (isLoading) {
        return <div className="loading-spinner">Загрузка...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <>
            <ParallaxBackground title="ЗАКАЗЫ" image="/assets/images/orders-bg.jpg" />
            <div className="catalog-container content">
                {/* Профиль пользователя */}
                {user && (
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src={"/assets/images/footer-bg.jpg"} alt="Аватар пользователя" />
                        </div>
                        <h2 className="user-name">{user.login}</h2>
                        <p className="user-email">{user.email}</p>
                        <div className="user-stats">
                            <div className="user-stat">
                                <h3 className="user-stat-value">{orders.length}</h3>
                                <p className="user-stat-label">Всего заказов</p>
                            </div>
                            <div className="user-stat">
                                <h3 className="user-stat-value">
                                    {orders.reduce((total, order) => total + order.total, 0).toLocaleString()}₽
                                </h3>
                                <p className="user-stat-label">Общая сумма</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Список заказов */}
                <div className="orders-container">
                    {orders.length === 0 ? (
                        <div className="no-orders">У вас пока нет заказов.</div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.orderId} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3 className="order-number">Заказ #{order.orderId}</h3>
                                        <span className="order-date">
                                            {new Date(order.date).toLocaleDateString("ru-RU")}
                                        </span>
                                    </div>
                                    <div
                                        className="order-status"
                                        style={{
                                            backgroundColor: `${getStatusColor(order.status)}20`,
                                            color: getStatusColor(order.status),
                                            border: `1px solid ${getStatusColor(order.status)}`,
                                        }}
                                    >
                                        {getStatus(order.status)}
                                    </div>
                                </div>

                                <div className="order-address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {order.address}
                                </div>

                                <div className="order-items">
                                    {order.products?.map((item) => (
                                        <div key={item.orderedProductId} className="order-item">
                                            <div className="item-image">
                                                <img
                                                    src={imageErrors[item.orderedProductId]
                                                        ? '/assets/images/no_image.webp'
                                                        : item.imagesUrlAtOrder[0]}
                                                    alt={item.productName}
                                                    onError={() => handleImageError(item.orderedProductId)}
                                                />
                                            </div>
                                            <div className="item-details">
                                                <h4>{item.productName}</h4>
                                                <div className="item-meta">
                                                <span>Количество: {item.quantity}</span>
                                                    <span className="item-price">{item.priceAtOrder}₽</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-actions">
                                        <button className="action-button track">Отследить</button>
                                        <button className="action-button details">Подробнее</button>
                                    </div>
                                    <div className="order-total">
                                        Итого: <span>{order.total}₽</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Пагинация */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    >
                        Назад
                    </button>
                    <span>
                        Страница {currentPage} из {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    >
                        Вперёд
                    </button>
                </div>
            </div>
        </>
    );
};

export default OrdersPage;
