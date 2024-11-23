import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import AuthModal from './components/AuthModal';
import AppRoutes from './Routes';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [user, setUser] = useState<{ userId: string; email: string; login: string } | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Для проверки авторизации

    // Проверка локального хранилища при загрузке
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const login = localStorage.getItem('login');

        if (userId && email && login) {
            setUser({ userId, email, login });
        }

        setIsCheckingAuth(false); // Завершаем проверку
    }, []);

    const handleLogin = (userData: { userId: string; email: string; login: string }) => {
        // Сохранение данных пользователя в локальное хранилище
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('login', userData.login);
        setUser(userData); // Устанавливаем текущего пользователя
        setShowAuthModal(false); // Закрываем модальное окно авторизации
    };

    const handleLogout = () => {
        // Удаление данных пользователя из локального хранилища
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('login');
        setUser(null); // Сбрасываем текущего пользователя
    };

    if (isCheckingAuth) {
        // Пока идет проверка авторизации, можно показать индикатор загрузки
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <NavigationBar
                onShowAuthModal={() => setShowAuthModal(true)}
                onLogout={handleLogout}
                user={user} // Передаем текущего пользователя
            />
            <AuthModal
                show={showAuthModal}
                onHide={() => setShowAuthModal(false)}
                onLogin={handleLogin} // Передаем функцию для обработки успешного входа
            />
            <Container>
                {/* Передаем данные об авторизации в маршруты */}
                <AppRoutes isAuthenticated={!!user} />
            </Container>
            <Footer />
        </Router>
    );
};

export default App;