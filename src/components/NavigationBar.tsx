import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">NEONAMI</Link>
            <ul className="nav-links">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/catalog">Каталог</Link></li>
                <li><Link to="/orders">Мои заказы</Link></li>
                <li><Link to="/profile">Мой профиль</Link></li>
                <li><Link to="/admin">Админ-панель</Link></li>
                <li><Link to="/manager">Менеджер-панель</Link></li>
            </ul>
        </nav>
    );
};

export default NavigationBar;