import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { User, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

interface NavigationBarProps {
    onShowAuthModal: () => void;
    onLogout: () => void;
    user: { userId: string; email: string; login: string, roleName: 'manager' | 'dbadmin' | 'user' } | null;
    onShowCart: () => void; // Новый обработчик для открытия корзины
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onShowAuthModal, onLogout, user, onShowCart }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const { items } = useCart();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;
        let isNavbarVisible = true;
        const navbar = document.querySelector('.navbar') as HTMLElement;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            // Если прокрутка вверх, показываем навбар
            if (prevScrollPos > currentScrollPos && !isNavbarVisible) {
                navbar.style.transform = 'translateY(0)';
                isNavbarVisible = true;
            }
            // Если прокрутка вниз, скрываем навбар
            else if (prevScrollPos < currentScrollPos && isNavbarVisible) {
                navbar.style.transform = 'translateY(-100%)';
                isNavbarVisible = false;
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                        {user?.roleName === 'manager' && (
                            <li><Link to="/manager">Менеджер-панель</Link></li>
                        )}
                        {user?.roleName === 'dbadmin' && (
                            <li><Link to="/admin">Админ-панель</Link></li>
                        )}
                        <li>
                            <button className="cart-icon" onClick={onShowCart}>
                                <ShoppingCart size={24}/>
                                {totalItems > 0 && (
                                    <span className="cart-badge">
                                {totalItems}
                            </span>
                                )}
                            </button>
                        </li>
                    </>
                )}

                {isAuthenticated ? (
                    <li className="user-info">
                        <div className="user-icon">
                            <User size={20} color="var(--text-color)"/>
                        </div>
                        <span className="username">{user?.login}</span>
                        <img src="/assets/images/footer-bg.jpg" alt="Profile" className="profile-picture"/>
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
