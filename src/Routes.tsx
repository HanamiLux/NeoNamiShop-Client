import React, {useEffect, useState} from 'react';
import { Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ProductPage from './pages/ProductPage';
import axios from "axios";
import {ProductDto} from "./models/Product";

// Add a product fetching hook or service
const useProductDetails = (productId: string) => {
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get<ProductDto>(`${process.env.REACT_APP_API_URL}/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError('Product not found');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    return { product, isLoading, error };
};

const ProductPageWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { product, isLoading, error } = useProductDetails(id || '');

    if (isLoading) return <div>Loading...</div>;
    if (error || !product) return <Navigate to="/catalog" replace />;

    return <ProductPage product={product} />;
};

interface AppRoutesProps {
    isAuthenticated: boolean;
    userRole: 'manager' | 'dbadmin' | 'user' | null;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated, userRole }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPageWrapper />} />

            {/* Protected routes */}
            <Route
                path="/profile"
                element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" replace />}
            />
            <Route
                path="/orders"
                element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" replace />}
            />

            <Route path="/admin" element={isAuthenticated && userRole === 'dbadmin' ? <AdminDashboard /> : <Navigate to="/" replace />} />
            <Route path="/manager" element={isAuthenticated && userRole === 'manager' ? <ManagerDashboard /> : <Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;