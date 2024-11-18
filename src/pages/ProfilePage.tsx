import React, { useState } from 'react';
import ParallaxBackground from "../components/ParallaxBackground";
import "../styles/user-profile.css";

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: 'Ivan4ik',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        defaultAddress: 'г. Москва, ул. Примерная, д. 1',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const reviews = [
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },
        { id: 1, product: 'Товар 1', text: 'Отличный товар!', productId: 101 },
        { id: 2, product: 'Товар 2', text: 'Очень качественно!', productId: 102 },
        { id: 3, product: 'Товар 3', text: 'Не соответствует описанию.', productId: 103 },
        { id: 4, product: 'Товар 4', text: 'Превосходно!', productId: 104 },
        { id: 5, product: 'Товар 5', text: 'Доставили вовремя.', productId: 105 },

    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Сохранение данных:', formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewClick = (productId: number) => {
        window.location.href = `/product/${productId}`;
    };

    return (
        <>
            <ParallaxBackground
                title="ПРОФИЛЬ"
                image="/assets/images/profile-bg.jpg"
            />
            <div className="profile-layout content">
                {/* Секция "Мои отзывы" */}
                <div className="user-reviews">
                    <h3>Мои отзывы</h3>
                    <ul>
                        {reviews.map(review => (
                            <li key={review.id} onClick={() => handleReviewClick(review.productId)}>
                                <p><strong>{review.product}:</strong> {review.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Блок профиля */}
                <div className="user-profile">
                    <div className="user-avatar">
                        <img
                            src="/assets/images/dakimakura.jpg"
                            alt="Аватар пользователя"
                        />
                    </div>

                    <h2 className="user-name">{formData.name}</h2>
                    <p className="user-email">{formData.email}</p>

                    <div className="user-stats">
                        <div className="user-stat">
                            <h3 className="user-stat-value">12</h3>
                            <p className="user-stat-label">Заказов</p>
                        </div>
                        <div className="user-stat">
                            <h3 className="user-stat-value">15000₽</h3>
                            <p className="user-stat-label">Сумма покупок</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Логин</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Введите ФИО"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Введите email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Введите номер телефона"
                            />
                        </div>

                        <div className="form-group">
                            <label>Адрес доставки по умолчанию</label>
                            <input
                                type="text"
                                name="defaultAddress"
                                value={formData.defaultAddress}
                                onChange={handleInputChange}
                                placeholder="Введите адрес доставки"
                            />
                        </div>

                        <div className="form-group">
                            <label>Текущий пароль</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder="Введите текущий пароль"
                            />
                        </div>

                        <div className="form-group">
                            <label>Новый пароль</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder="Введите новый пароль"
                            />
                        </div>

                        <div className="form-group">
                            <label>Подтверждение пароля</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Подтвердите новый пароль"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit">
                                Сохранить изменения
                            </button>
                        </div>
                    </form>
                </div>

                {/* Секция "Мои заказы" */}
                <div className="user-orders">
                    <button className="catalog-button"
                        onClick={() => window.location.href = '/orders'}
                    >
                        Мои заказы
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
