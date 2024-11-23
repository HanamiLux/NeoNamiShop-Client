import React, {useEffect} from 'react';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ProductPage from './pages/ProductPage';


interface AppRoutesProps {
    isAuthenticated: boolean;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Прокрутка с анимацией
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Плавная прокрутка
        });
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />

            {/* Защищенные маршруты */}
            <Route
                path="/profile"
                element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/orders"
                element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" replace />}
            />


            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />

        </Routes>
    );
};

export default AppRoutes;
