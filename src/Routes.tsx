import React, {useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ProductPage from './pages/ProductPage';

const AppRoutes: React.FC = () => {
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
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
    );
};

export default AppRoutes;
