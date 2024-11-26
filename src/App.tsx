import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/NavigationBar';
import AuthModal from './components/AuthModal';
import AppRoutes from './Routes';
import Footer from './components/Footer';
import { CartProvider } from './components/CartProvider';
import CartModal from './components/CartModal';

interface User {
    userId: string;
    email: string;
    login: string;
    roleName: 'manager' | 'dbadmin' | 'user';
}

const App: React.FC = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        const login = localStorage.getItem('login');
        const role = localStorage.getItem('role') as 'manager' | 'dbadmin' | 'user';

        if (userId && email && login && role) {
            setUser({ userId, email, login, roleName: role });
        }

        setIsCheckingAuth(false);
    }, []);

    const handleLogin = (userData: User) => {
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('login', userData.login);
        localStorage.setItem('role', userData.roleName);
        setUser(userData);
        setShowAuthModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('login');
        localStorage.removeItem('cart');
        localStorage.removeItem('role');
        setUser(null);
    };

    if (isCheckingAuth) {
        return <div>Загрузка...</div>;
    }

    return (
        <Router>
            <CartProvider
                isAuthenticated={!!user}
                onShowAuthModal={() => setShowAuthModal(true)}
            >
                <NavigationBar
                    onShowAuthModal={() => setShowAuthModal(true)}
                    onLogout={handleLogout}
                    user={user}
                    onShowCart={() => setIsCartOpen(true)} // Передаем обработчик открытия корзины
                />
                <AuthModal
                    show={showAuthModal}
                    onHide={() => setShowAuthModal(false)}
                    onLogin={handleLogin}
                />
                <Container>
                    <AppRoutes isAuthenticated={!!user} userRole={user?.roleName || null} />
                </Container>
                <CartModal
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                />
                <Footer />
            </CartProvider>
        </Router>
    );
};

export default App;