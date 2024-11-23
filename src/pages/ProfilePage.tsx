import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ParallaxBackground from "../components/ParallaxBackground";
import "../styles/user-profile.css";
import { ReviewCard } from "../components/Card_review";
import Notification from '../components/Notification';

interface Review {
    id: number;
    product: string;
    text: string;
    productId: number;
    rating: number;
}

interface FormData {
    login: string;
    email: string;
    defaultAddress: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ValidationErrors {
    login?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

interface NotificationItem {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const ProfilePage = () => {
    const [formData, setFormData] = useState<FormData>({
        login: '',
        email: '',
        defaultAddress: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const navigate = useNavigate();
    const userId = getUserId();

    useEffect(() => {
        if (!userId) {
            addNotification('User ID not found.', 'error');
            setIsLoading(false);
            return;
        }

        axios.get<FormData>(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                addNotification('Failed to fetch user data.', 'error');
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        axios.get<{ items: Review[] }>(`${process.env.REACT_APP_API_URL}/feedbacks/user/${userId}`)
            .then(response => {
                setReviews(response.data.items);
            })
            .catch(error => {
                addNotification('Failed to fetch user reviews.', 'error');
                console.error('Error fetching user reviews:', error);
            });
    }, [userId]);

    const addNotification = (message: string, type: 'success' | 'error') => {
        const id = Date.now(); // Generate a unique ID
        setNotifications((prev) => [...prev, { id, message, type }]);
    };

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };


    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        let isValid = true;

        if (formData.newPassword && !formData.currentPassword) {
            errors.currentPassword = 'Необходимо ввести текущий пароль';
            isValid = false;
        }

        if (formData.newPassword && formData.newPassword.length < 6) {
            errors.newPassword = 'Пароль должен быть не менее 6 символов';
            isValid = false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают';
            isValid = false;
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Некорректный email адрес';
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear validation error when user starts typing
        if (validationErrors[name as keyof ValidationErrors]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSaving(true);

        // Create payload excluding empty password fields
        const payload = {
            login: formData.login,
            email: formData.email,
            currentPassword: formData.currentPassword || undefined,
            newPassword: formData.newPassword || undefined,
        };

        if (payload.currentPassword === '' || payload.newPassword === '') {
            delete payload.currentPassword;
            delete payload.newPassword;
        }

        try {
            console.log(payload);
            await axios.put(
                `${process.env.REACT_APP_API_URL}/users/${userId}`,
                payload,
                {
                    params: { userId }
                }
            );
            addNotification('Данные успешно сохранены', 'success');
            // Clear password fields after successful update
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                addNotification(error.response.data.message || 'Ошибка сохранения данных', 'error');
            } else {
                addNotification('Произошла ошибка при сохранении данных', 'error');
            }
            console.error('Error saving data:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <ParallaxBackground
                title="ПРОФИЛЬ"
                image="/assets/images/profile-bg.jpg"
            />
            <div className="profile-layout content">
                {isLoading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    <>
                        <div className="user-reviews">
                            <h3>Мои отзывы</h3>
                            <ul>
                                {reviews.length > 0 ? (
                                    reviews.map(review => (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                        />
                                    ))
                                ) : (
                                    <div className="no-reviews">No reviews yet.</div>
                                )}
                            </ul>
                        </div>

                        <div className="user-profile">
                            <div className="user-avatar">
                                <img
                                    src="/assets/images/dakimakura.jpg"
                                    alt="Аватар пользователя"
                                />
                            </div>

                            <h2 className="user-name">{formData.login}</h2>
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
                                        name="login"
                                        value={formData.login}
                                        onChange={handleInputChange}
                                        placeholder="Введите логин"
                                    />
                                    {validationErrors.login && (
                                        <span className="error-message">{validationErrors.login}</span>
                                    )}
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
                                    {validationErrors.email && (
                                        <span className="error-message">{validationErrors.email}</span>
                                    )}
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
                                    {validationErrors.currentPassword && (
                                        <span className="error-message">{validationErrors.currentPassword}</span>
                                    )}
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
                                    {validationErrors.newPassword && (
                                        <span className="error-message">{validationErrors.newPassword}</span>
                                    )}
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
                                    {validationErrors.confirmPassword && (
                                        <span className="error-message">{validationErrors.confirmPassword}</span>
                                    )}
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="submit-button"
                                    >
                                        {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="user-orders">
                            <button
                                className="catalog-button"
                                onClick={() => navigate('/orders')}
                            >
                                Мои заказы
                            </button>
                        </div>
                    </>
                )}
            </div>
            <div className="notifications-container">
                {notifications.map((n) => (
                    <Notification
                        key={n.id}
                        message={n.message}
                        type={n.type}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>
        </>
    );
};

const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId || !/^[0-9a-fA-F-]{36}$/.test(userId)) {
        return null;
    }
    return userId;
};

export default ProfilePage;