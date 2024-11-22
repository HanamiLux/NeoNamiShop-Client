import React, { useState } from 'react';
import axios from 'axios';
import '../styles/modal.css';

interface AuthModalProps {
    show: boolean;
    onHide: () => void;
    onLogin: (user: { userId: string; email: string; login: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async () => {
        setLoading(true);
        setError(null);

        try {
            const endpoint = isLogin ? 'login' : '';
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/${endpoint}`, {
                email,
                password,
                ...(!isLogin && { login: name }),
            });

            if (response.data.message) {
                throw new Error(response.data.message);
            }

            if (isLogin) {
                const { user } = response.data;
                localStorage.setItem('userId', user.userId);
                localStorage.setItem('email', user.email);
                localStorage.setItem('login', user.login);
                console.log('Вход выполнен:', response.data);
                onLogin(user);
                onHide();
            } else {
                console.log('Регистрация выполнена:', response.data);
                setIsLogin(true);
            }


        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Ошибка сервера');
        } finally {
            setLoading(false);
        }
    };

    const handleSwitchMode = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setName('');
        setError(null);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
                    <button className="btn-secondary close-btn" onClick={onHide}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {error && <p className="error-message">{error}</p>}
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Логин</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Введите отображаемое имя"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Введите email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-important" onClick={handleAuth} disabled={loading}>
                        {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    <button className="btn-link" onClick={handleSwitchMode} disabled={loading}>
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;