import React from "react";
import ParallaxBackground from "../components/ParallaxBackground";
import { Order } from "../models/Order";
import "../styles/user-profile.css";
import "../styles/order.css";

const OrdersPage: React.FC = () => {

    const orders: Order[] = [
        {
            orderId: 1,
            userId: "user123",
            date: new Date("2024-03-15"),
            address: "г. Москва, ул. Примерная, д. 1",
            status: "Доставлен",
            items: [
                {
                    productId: 1,
                    name: "Учебник みんなの日本語",
                    price: 2500,
                    image: "/assets/images/books.jpg",
                    quantity: 2
                },
                {
                    productId: 2,
                    name: "Моти",
                    price: 800,
                    image: "/assets/images/mochi.jpg",
                    quantity: 1
                }
            ],
            total: 5800
        },
        {
            orderId: 2,
            userId: "user456",
            date: new Date("2024-03-10"),
            address: "г. Санкт-Петербург, ул. Примерная, д. 5",
            status: "В обработке",
            items: [
                {
                    productId: 3,
                    name: "Робот-медведь",
                    price: 10000,
                    image: "/assets/images/robear.jfif",
                    quantity: 1
                }
            ],
            total: 10000
        }
    ];

    // Пример данных пользователя
    const user = {
        name: "Иван Иванов",
        email: "ivan.ivanov@example.com",
        avatar: "/assets/images/dakimakura.jpg"
    };

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'доставлен':
                return '#4CAF50';
            case 'в обработке':
                return '#FFC107';
            case 'отменён':
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