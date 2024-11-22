import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    ChevronDown,
    Edit,
    Trash2,
    PlusCircle,
    Eye,
    UserCog,
    ShoppingCart,
    MessageCircle,
    Shield
} from 'lucide-react';
import "../styles/manager-dashboard.css"

const ManagerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'users' | 'reviews' | 'roles'>('products');
    const [roles, setRoles] = useState<any[]>([]);
    const [isAddingRole, setIsAddingRole] = useState(false);
    const [newRole, setNewRole] = useState({ roleName: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (activeTab === 'roles') {
            fetchRoles();
        }
    }, [activeTab]);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/roles`);
            setRoles(response.data.items);
        } catch (err) {
            setError('Failed to fetch roles');
            console.error('Error fetching roles:', err);
        }
    };

    const handleAddRole = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/roles`, newRole);
            setNewRole({ roleName: '', description: '' });
            setIsAddingRole(false);
            await fetchRoles();
        } catch (err) {
            setError('Failed to create role');
            console.error('Error creating role:', err);
        }
    };

    const handleDeleteRole = async (roleId: number) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/roles/${roleId}`);
            await fetchRoles();
        } catch (err) {
            setError('Failed to delete role');
            console.error('Error deleting role:', err);
        }
    };

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

    const renderRolesTab = () => (
        <div className="manager-tab-content">
            {isAddingRole ? (
                <div className="role-form-container">
                    <h2>Добавить новую роль</h2>
                    <form onSubmit={handleAddRole} className="role-form">
                        <div className="form-group">
                            <label>Название роли:</label>
                            <input
                                type="text"
                                value={newRole.roleName}
                                onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
                                required
                                className="form-input"
                                minLength={2}
                                maxLength={50}
                            />
                        </div>
                        <div className="form-group">
                            <label>Описание:</label>
                            <textarea
                                value={newRole.description}
                                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="submit-button">Сохранить</button>
                            <button
                                type="button"
                                onClick={() => setIsAddingRole(false)}
                                className="cancel-button"
                            >
                                Отмена
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="manager-table-container">
                        <table className="manager-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Описание</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {roles.map((role) => (
                                <tr key={role.roleId}>
                                    <td>{role.roleId}</td>
                                    <td>{role.roleName}</td>
                                    <td>{role.description}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-delete"
                                                onClick={() => handleDeleteRole(role.roleId)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="manager-actions">
                        <button
                            className="manager-action-button"
                            onClick={() => setIsAddingRole(true)}
                        >
                            <PlusCircle size={18} />
                            Добавить роль
                        </button>
                    </div>
                </>
            )}
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
                <button
                    className={`manager-tab ${activeTab === 'roles' ? 'active' : ''}`}
                    onClick={() => setActiveTab('roles')}
                >
                    <Shield size={18} />
                    Роли
                </button>
            </div>

            <div className="manager-content">
                {activeTab === 'products' && renderProductsTab()}
                {activeTab === 'categories' && renderCategoriesTab()}
                {activeTab === 'orders' && renderOrdersTab()}
                {activeTab === 'users' && renderUsersTab()}
                {activeTab === 'reviews' && renderReviewsTab()}
                {activeTab === 'roles' && renderRolesTab()}
            </div>
        </div>
    );
};

export default ManagerDashboard;