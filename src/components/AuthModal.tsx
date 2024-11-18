import React, { useState } from 'react';
import '../styles/modal.css';

interface AuthModalProps {
    show: boolean;
    onHide: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onHide }) => {
    const [isLogin, setIsLogin] = useState(true);

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
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Логин</label>
                            <input type="text" id="name" placeholder="Введите отображаемое имя" />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Введите email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" placeholder="Введите пароль" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn-important " onClick={() => {
                        console.log(isLogin ? 'Вход выполнен' : 'Регистрация выполнена');
                        onHide();
                    }}>
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    <button
                        className="btn-link"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войдите'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
