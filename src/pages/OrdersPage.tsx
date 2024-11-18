import React from "react";
import ParallaxBackground from "../components/ParallaxBackground";
import { Order } from "../models/Order";
import "../styles/user-profile.css";
import "../styles/order.css";

const OrdersPage: React.FC = () => {
    // Пример данных заказов
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
    const userProfile = {
        name: "Иван Иванов",
        email: "ivan.ivanov@example.com",
        avatar: "/assets/images/avatar.jpg"
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
                {/* Профиль пользователя */}
                <div className="user-profile" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    margin: '2rem auto',
                    padding: '2rem',
                    maxWidth: '600px',
                    border: '2px solid var(--border-color)',
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                }}>
                    <img
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                    <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{userProfile.name}</h2>
                    <p style={{ fontSize: '1rem', color: 'gray' }}>{userProfile.email}</p>
                </div>

                {/* Список заказов */}
                <div className="orders-list" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="product-card"
                            style={{
                                width: '100%',
                                height: 'auto',
                                minHeight: '200px',
                                padding: '1.5rem',
                                backgroundColor: '#fff',
                                borderRadius: '15px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="order-header" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                borderBottom: '2px solid var(--border-color)',
                                paddingBottom: '1rem'
                            }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                        Заказ #{order.orderId}
                                    </h3>
                                    <p style={{ opacity: 0.7 }}>
                                        {order.date.toLocaleDateString('ru-RU')}
                                    </p>
                                    <p style={{ opacity: 0.7 }}>
                                        Адрес: {order.address}
                                    </p>
                                </div>
                                <div style={{
                                    padding: '0.5rem 1rem',
                                    border: `2px solid ${getStatusColor(order.status)}`,
                                    borderRadius: '15px',
                                    color: getStatusColor(order.status)
                                }}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="order-items" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                {order.items.map((item) => (
                                    <div key={item.productId} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem 0',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}>
                                            <div className="product-image-container" style={{
                                                width: '80px',
                                                height: '80px',
                                                borderRadius: '10px',
                                                overflow: 'hidden'
                                            }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="product-image"
                                                />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                                    {item.name}
                                                </p>
                                                <p style={{ opacity: 0.7 }}>
                                                    Количество: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                            {item.quantity * item.price}₽
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: '1.5rem',
                                paddingTop: '1rem',
                                borderTop: '2px solid var(--border-color)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem'
                                }}>
                                    <button className="category-tab">
                                        Отследить
                                    </button>
                                    <button className="category-tab">
                                        Подробнее
                                    </button>
                                </div>
                                <div style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold'
                                }}>
                                    Итого: {order.total}₽
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
