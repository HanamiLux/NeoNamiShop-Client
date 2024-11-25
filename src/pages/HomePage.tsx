import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParallaxBackground from '../components/ParallaxBackground';
import ProductsCarousel from '../components/ProductsCarousel';
import Haiku from "../components/Haiku";
import CatalogButton from "../components/CatalogButton";
import { ProductDto } from '../models/Product'; // You'll need to create this type based on your API
import Notification from '../components/Notification';

interface NotificationItem {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const HomePage: React.FC = () => {
    const [popularProducts, setPopularProducts] = useState<ProductDto[]>([]);
    const [newProducts, setNewProducts] = useState<ProductDto[]>([]);
    const [discountedProducts, setDiscountedProducts] = useState<ProductDto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const addNotification = (message: string, type: 'success' | 'error') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
    };

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch popular products (sorted by rating)
                const popularResponse = await axios.get<{ items: ProductDto[], total: number }>(
                    `${process.env.REACT_APP_API_URL}/products`,
                    {
                        params: {
                            sort: 'averageRating',
                            order: 'DESC',
                            page: 1,
                            take: 12
                        }
                    }
                );
                setPopularProducts(popularResponse.data.items);

                // Fetch new products (sorted by creation date)
                const newResponse = await axios.get<{ items: ProductDto[], total: number }>(
                    `${process.env.REACT_APP_API_URL}/products`,
                    {
                        params: {
                            sort: 'productId',
                            order: 'DESC',
                            page: 1,
                            take: 12
                        }
                    }
                );
                setNewProducts(newResponse.data.items);

                // Fetch discounted products (you might need to add a discount field to your Product entity)
                const discountResponse = await axios.get<{ items: ProductDto[], total: number }>(
                    `${process.env.REACT_APP_API_URL}/products`,
                    {
                        params: {
                            // hasDiscount: true,
                            page: 1,
                            take: 12
                        }
                    }
                );
                setDiscountedProducts(discountResponse.data.items);

            } catch (error) {
                addNotification('Failed to fetch products.', 'error');
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <ParallaxBackground
                title="ПОПУЛЯРНОЕ"
                image="/assets/images/popular-bg.jpg"
            />
            <Haiku theme="ПОПУЛЯРНОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={popularProducts} />
                <CatalogButton position="end" text="К товарам"/>
            </div>

            <ParallaxBackground
                title="НОВОЕ"
                image="/assets/images/new-bg.jpg"
            />
            <Haiku theme="НОВОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={newProducts} />
                <CatalogButton position="start" text="Смотреть"/>
            </div>

            <ParallaxBackground
                title="АКЦИЯ"
                image="/assets/images/discounts-bg.jpg"
            />
            <Haiku theme="АКЦИЯ" />
            <div className="mt-5 content">
                <ProductsCarousel products={discountedProducts} />
                <CatalogButton position="center" text="Все товары"/>
            </div>

            <div className="notifications-container">
                {notifications.map((n) => (
                    <Notification
                        key={n.id}
                        message={n.message}
                        type={n.type}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default HomePage;