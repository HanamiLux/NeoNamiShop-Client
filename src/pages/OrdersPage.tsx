import React, { useEffect, useState } from "react";
import ParallaxBackground from "../components/ParallaxBackground";
import { Order } from "../models/Order";
import "../styles/user-profile.css";
import "../styles/order.css";
import axios from "axios";

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<{ name: string; email: string; avatar: string }>({
        name: "",
        email: "",
        avatar: ""
    });

    useEffect(() => {
        // Замените URL на ваш реальный API URL
        const apiUrl = `${process.env.REACT_APP_API_URL}/orders`;

        axios.get(apiUrl).then((response) => {
            setOrders(response.data.items);
        }).catch((error) => {
            console.error("Error fetching orders:", error);
        });

        // Пример данных пользователя
        setUser({
            name: "Иван Иванов",
            email: "ivan.ivanov@example.com",
            avatar: "/assets/images/dakimakura.jpg"
        });
    }, []);

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'completed':
                return '#4CAF50';
            case 'processing':
                return '#FFC107';
            case 'cancelled':
                return '#8b0000';
            default:
                return 'white';
        }
    };

    return (
        <>
            <ParallaxBackground
                title="ЗАКАЗЫ"
                image="/assets/images/orders-bg.jpg"
            />
            <div className="catalog-container content">
                <div className="user-profile">
                    <div className="user-avatar">
                        <img
                            src={user.avatar}
                            alt="Аватар пользователя"
                        />
                    </div>
                    <h2 className="user-name">{user.name}</h2>
                    <p className="user-email">{user.email}</p>
                    <div className="user-stats">
                        <div className="user-stat">
                            <h3 className="user-stat-value">{orders.length}</h3>
                            <p className="user-stat-label">Всего заказов</p>
                        </div>
                        <div className="user-stat">
                            <h3 className="user-stat-value">
                                {orders.reduce((total, order) => total + order.total, 0)}₽
                            </h3>
                            <p className="user-stat-label">Общая сумма</p>
                        </div>
                    </div>
                </div>

                <div className="orders-container">
                    {orders.map((order) => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3 className="order-number">Заказ #{order.orderId}</h3>
                                    <span className="order-date">
                                        {order.date.toLocaleDateString('ru-RU')}
                                    </span>
                                </div>
                                <div className="order-status" style={{
                                    backgroundColor: `${getStatusColor(order.status)}20`,
                                    color: getStatusColor(order.status),
                                    border: `1px solid ${getStatusColor(order.status)}`
                                }}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="order-address">
                                <i className="fas fa-map-marker-alt"></i>
                                {order.address}
                            </div>

                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div key={item.productId} className="order-item">
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <div className="item-meta">
                                                <span>Количество: {item.quantity}</span>
                                                <span className="item-price">{item.price}₽</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-actions">
                                    <button className="action-button track">
                                        Отследить
                                    </button>
                                    <button className="action-button details">
                                        Подробнее
                                    </button>
                                </div>
                                <div className="order-total">
                                    Итого: <span>{order.total}₽</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrdersPage;