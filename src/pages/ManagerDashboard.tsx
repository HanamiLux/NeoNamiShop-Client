import React, { useState } from 'react';
import {
    ChevronDown,
    Edit,
    Trash2,
    PlusCircle,
    Eye,
    UserCog,
    ShoppingCart,
    MessageCircle
} from 'lucide-react';
import "../styles/manager-dashboard.css"

const ManagerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'users' | 'reviews'>('products');

    const renderProductsTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Example product rows */}
                    {[1, 2, 3].map((product) => (
                        <tr key={product}>
                            <td>{product}</td>
                            <td>Название товара {product}</td>
                            <td>Категория</td>
                            <td>1000 ₽</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="action-edit"><Edit size={16} /></button>
                                    <button className="action-delete"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="manager-actions">
                <button className="manager-action-button">
                    <PlusCircle size={18} />
                    Добавить товар
                </button>
            </div>
        </div>
    );

    const renderCategoriesTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Количество товаров</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3].map((category) => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>Название категории {category}</td>
                            <td>10</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="action-edit"><Edit size={16} /></button>
                                    <button className="action-delete"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="manager-actions">
                <button className="manager-action-button">
                    <PlusCircle size={18} />
                    Добавить категорию
                </button>
            </div>
        </div>
    );

    const renderOrdersTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Статус</th>
                        <th>Сумма</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3].map((order) => (
                        <tr key={order}>
                            <td>{order}</td>
                            <td>Имя Пользователя</td>
                            <td>В обработке</td>
                            <td>5000 ₽</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="action-view"><Eye size={16} /></button>
                                    <button className="action-edit"><Edit size={16} /></button>
                                    <button className="action-delete"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderUsersTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3].map((user) => (
                        <tr key={user}>
                            <td>{user}</td>
                            <td>Имя Пользователя</td>
                            <td>email@example.com</td>
                            <td>Покупатель</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="action-edit"><UserCog size={16} /></button>
                                    <button className="action-delete"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderReviewsTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Товар</th>
                        <th>Оценка</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3].map((review) => (
                        <tr key={review}>
                            <td>{review}</td>
                            <td>Имя Пользователя</td>
                            <td>Название товара</td>
                            <td>5/5</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="action-view"><Eye size={16} /></button>
                                    <button className="action-delete"><Trash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="manager-dashboard content">
            <h1 className="dashboard-title">Панель управления</h1>

            <div className="manager-tabs">
                <button
                    className={`manager-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    <ShoppingCart size={18} />
                    Товары
                </button>
                <button
                    className={`manager-tab ${activeTab === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    <ChevronDown size={18} />
                    Категории
                </button>
                <button
                    className={`manager-tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    <ShoppingCart size={18} />
                    Заказы
                </button>
                <button
                    className={`manager-tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <UserCog size={18} />
                    Пользователи
                </button>
                <button
                    className={`manager-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    <MessageCircle size={18} />
                    Отзывы
                </button>
            </div>

            <div className="manager-content">
                {activeTab === 'products' && renderProductsTab()}
                {activeTab === 'categories' && renderCategoriesTab()}
                {activeTab === 'orders' && renderOrdersTab()}
                {activeTab === 'users' && renderUsersTab()}
                {activeTab === 'reviews' && renderReviewsTab()}
            </div>
        </div>
    );
};

export default ManagerDashboard;