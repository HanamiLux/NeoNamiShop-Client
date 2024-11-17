import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavigationBar: React.FC = () => {
    useEffect(() => {
        let prevScrollPos = window.pageYOffset;
        let isNavbarVisible = true;
        const navbar = document.querySelector('.navbar') as HTMLElement;
        let timeout: NodeJS.Timeout;
        let lastScrollPosForTimer = prevScrollPos; // Хранит позицию прокрутки для проверки актуальности

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            // Если экран в самом верху, всегда показываем навбар
            if (currentScrollPos === 0) {
                clearTimeout(timeout); // Сбрасываем таймер
                navbar.style.transform = 'translateY(0)';
                isNavbarVisible = true;
                return;
            }

            // Скролл вниз - прячем навбар
            if (prevScrollPos < currentScrollPos && isNavbarVisible) {
                navbar.style.transform = 'translateY(-100%)';
                isNavbarVisible = false;
            }
            // Скролл вверх - показываем навбар
            else if (prevScrollPos > currentScrollPos && !isNavbarVisible) {
                clearTimeout(timeout); // Сбрасываем таймер
                navbar.style.transform = 'translateY(0)';
                isNavbarVisible = true;
            }

            prevScrollPos = currentScrollPos;
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Если мышь в пределах 50px от верхней части экрана
            if (e.clientY <= 50) {
                clearTimeout(timeout); // Сбрасываем таймер
                navbar.style.transform = 'translateY(0)';
                isNavbarVisible = true;
            } else if (prevScrollPos > 100 && !isNavbarVisible) {
                // Устанавливаем текущую позицию прокрутки для проверки
                lastScrollPosForTimer = prevScrollPos;

                // Таймер для скрытия навбара
                timeout = setTimeout(() => {
                    // Проверяем актуальность: прокрутка не должна измениться
                    if (lastScrollPosForTimer === prevScrollPos) {
                        navbar.style.transform = 'translateY(-100%)';
                        isNavbarVisible = false;
                    }
                }, 5000); // Задержка перед скрытием
            }
        };

        // Привязка событий
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousemove', handleMouseMove);

        // Очистка событий при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
