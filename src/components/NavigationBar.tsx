import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import {User} from "lucide-react";

interface NavigationBarProps {
    onShowAuthModal: () => void;
    onLogout: () => void;
    user: { userId: string; email: string; login: string } | null;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onShowAuthModal, onLogout, user }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [user]);

    const handleLogout = () => {
        onLogout();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">NEONAMI</Link>
            <ul className="nav-links">
                <li><Link to="/">Главная</Link></li>
                <li><Link to="/catalog">Каталог</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to="/profile">Профиль</Link></li>
                        <li><Link to="/admin">Админ-панель</Link></li>
                        <li><Link to="/manager">Менеджер-панель</Link></li>
                    </>
                )}

                {isAuthenticated ? (
                    <li className="user-info">
                        <div className="user-icon">
                            <User size={20} color="var(--text-color)"/>
                        </div>
                        <span className="username">{user?.login}</span>
                        <img src={`/assets/images/footer-bg.jpg`} alt="Profile" className="profile-picture"/>
                        <button className="btn-important" onClick={handleLogout}>Выйти</button>
                    </li>
                ) : (
                    <li>
                        <button className="btn-important" onClick={onShowAuthModal}>Вход/Регистрация</button>
                    </li>
                )}
            </ul>

        </nav>
    );
};

export default NavigationBar;