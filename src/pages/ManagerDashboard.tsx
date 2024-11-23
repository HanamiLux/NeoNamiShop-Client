import React, {useState, useEffect} from 'react';
import {UserService} from '../services/userService';
import {UserDto} from '../types/user';
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
    Shield,
    X
} from 'lucide-react';
import "../styles/manager-dashboard.css"
import {UserUtils} from "../utils/UserUtils";

// Добавляем интерфейсы для новых типов данных
interface Product {
    productId: number;
    productName: string;
    description: string;
    price: number;
    quantity: number;
    categoryId: number;
    averageRating: number;
    totalFeedbacks: number;
    imagesUrl?: string[];
}

interface Category {
    categoryId: number;
    categoryName: string;
    description: string;
}

interface Order {
    orderId: number;
    userId: string;
    userName: string;
    status: 'new' | 'processing' | 'completed' | 'cancelled';
    totalAmount: number;
    createdAt: string;
}

const ManagerDashboard: React.FC = () => {
    // Существующие состояния
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'users' | 'reviews' | 'roles'>('products');
    const [roles, setRoles] = useState<any[]>([]);
    const [isAddingRole, setIsAddingRole] = useState(false);
    const [newRole, setNewRole] = useState({roleName: '', description: ''});
    const [error, setError] = useState('');
    const [users, setUsers] = useState<UserDto[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const userId = UserUtils.getUserId();

    // Новые состояния для продуктов, категорий и заказов
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalCategories, setTotalCategories] = useState(0);
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);

    // Состояния для модальных окон
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    // Состояния для новых элементов
    const [newProduct, setNewProduct] = useState({
        productName: '',
        description: '',
        price: 0,
        quantity: 0,
        categoryId: 0,
        imagesUrl: []
    });
    const [newCategory, setNewCategory] = useState({
        categoryName: '',
        description: ''
    });

    // Эффекты для загрузки данных
    useEffect(() => {
        if (activeTab === 'products') {
            fetchProducts();
        } else if (activeTab === 'categories') {
            fetchCategories();
        } else if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab, page]);

    // Функции для работы с продуктами
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
                params: {page, take: limit}
            });
            setProducts(response.data.items);
            setTotalProducts(response.data.total);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/products`, newProduct, {
                params: {userId}
            });
            setIsAddingProduct(false);
            setNewProduct({
                productName: '',
                description: '',
                price: 0,
                quantity: 0,
                categoryId: 0,
                imagesUrl: []
            });
            await fetchProducts();
        } catch (err) {
            setError('Failed to create product');
        }
    };

    const handleUpdateProduct = async (productId: number, data: Partial<Product>) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/products/${productId}`, data, {
                params: {userId}
            });
            setEditingProduct(null);
            await fetchProducts();
        } catch (err) {
            setError('Failed to update product');
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
            return;
        }
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                params: {userId}
            });
            await fetchProducts();
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    // Функции для работы с категориями
    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`, {
                params: {page, take: limit}
            });
            setCategories(response.data.items);
            setTotalCategories(response.data.total);
        } catch (err) {
            setError('Failed to fetch categories');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/categories`, newCategory, {
                params: {userId}
            });
            setIsAddingCategory(false);
            setNewCategory({categoryName: '', description: ''});
            await fetchCategories();
        } catch (err) {
            setError('Failed to create category');
        }
    };

    const handleUpdateCategory = async (categoryId: number, data: Partial<Category>) => {
        try {
            console.log('Updating category with data:', data);
            await axios.put(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`, data, {
                params: {userId}
            });
            setEditingCategory(null);
            await fetchCategories();
        } catch (err) {
            setError('Failed to update category');
        }
    };

    const handleDeleteCategory = async (categoryId: number) => {
        if (!window.confirm('Вы уверены, что хотите удалить эту категорию?')) {
            return;
        }
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`, {
                params: {userId}
            });
            await fetchCategories();
        } catch (err) {
            setError('Failed to delete category');
        }
    };

    // Функции для работы с заказами
    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
                params: {page, limit}
            });
            setOrders(response.data.items);
            setTotalOrders(response.data.total);
        } catch (err) {
            setError('Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'roles') {
            fetchRoles();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'users') {
            fetchUsers();
        }
    }, [activeTab, page]);

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
            await axios.post(`${process.env.REACT_APP_API_URL}/roles`, newRole, {params: {userId: userId}});
            setNewRole({roleName: '', description: ''});
            setIsAddingRole(false);
            await fetchRoles();
        } catch (err) {
            setError('Failed to create role');
            console.error('Error creating role:', err);
        }
    };

    const handleDeleteRole = async (roleId: number) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/roles/${roleId}`, {params: {userId: userId}});
            await fetchRoles();
        } catch (err) {
            setError('Failed to delete role');
            console.error('Error deleting role:', err);
        }
    };

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const response = await UserService.getUsers(page, limit);
            setUsers(response.items);
            setTotalUsers(response.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            return;
        }

        try {
            await UserService.deleteUser(userId, UserUtils.getUserId() ?? '');
            await fetchUsers();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete user');
        }
    };

    const handleUpdateOrderStatus = async (orderId: number, status: Order['status']) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/orders/${orderId}`,
                {status},
                {params: {userId}}
            );
            await fetchOrders();
        } catch (err) {
            setError('Failed to update order status');
        }
    };

    const renderProductsTab = () => (
        <div className="manager-tab-content">
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <>
                    <div className="manager-table-container">
                        <table className="manager-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Категория</th>
                                <th>Цена</th>
                                <th>Количество</th>
                                <th>Рейтинг</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{categories.find(c => c.categoryId === product.categoryId)?.categoryName}</td>
                                        <td>{product.price} ₽</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.averageRating.toFixed(1)} ({product.totalFeedbacks})</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-edit"
                                                    onClick={() => setEditingProduct(product)}
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="action-delete"
                                                    onClick={() => handleDeleteProduct(product.productId)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                            </tbody>
                        </table>
                    </div>

                    <div className="pagination">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * limit >= totalProducts}
                        >
                            Next
                        </button>
                    </div>
                    <div className="manager-actions">
                        <button
                            className="manager-action-button"
                            onClick={() => setIsAddingProduct(true)}
                        >
                            <PlusCircle size={18}/>
                            Добавить товар
                        </button>
                    </div>
                </>
            )}

            {/* Модальное окно добавления/редактирования товара */}
            {(isAddingProduct || editingProduct) && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Редактировать товар' : 'Добавить товар'}</h2>
                            <button
                                className="close-button"
                                onClick={() => {
                                    setIsAddingProduct(false);
                                    setEditingProduct(null);
                                }}
                            >
                                <X size={24}/>
                            </button>
                        </div>
                        <form onSubmit={editingProduct ?
                            (e) => {
                                e.preventDefault();
                                handleUpdateProduct(editingProduct.productId, newProduct);
                            } :
                            handleAddProduct
                        }>
                            <div className="form-group">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={editingProduct ? editingProduct.productName : newProduct.productName}
                                    onChange={(e) => editingProduct ?
                                        setEditingProduct({...editingProduct, productName: e.target.value}) :
                                        setNewProduct({...newProduct, productName: e.target.value})
                                    }
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Описание:</label>
                                <textarea
                                    value={editingProduct ? editingProduct.description : newProduct.description}
                                    onChange={(e) => editingProduct ?
                                        setEditingProduct({...editingProduct, description: e.target.value}) :
                                        setNewProduct({...newProduct, description: e.target.value})
                                    }
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Категория:</label>
                                <select
                                    value={editingProduct ? editingProduct.categoryId : newProduct.categoryId}
                                    onChange={(e) => editingProduct ?
                                        setEditingProduct({...editingProduct, categoryId: Number(e.target.value)}) :
                                        setNewProduct({...newProduct, categoryId: Number(e.target.value)})
                                    }
                                    required
                                    className="form-input"
                                >
                                    <option value="">Выберите категорию</option>
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Цена:</label>
                                <input
                                    type="number"
                                    value={editingProduct ? editingProduct.price : newProduct.price}
                                    onChange={(e) => editingProduct ?
                                        setEditingProduct({...editingProduct, price: Number(e.target.value)}) :
                                        setNewProduct({...newProduct, price: Number(e.target.value)})
                                    }
                                    required
                                    min="0"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    Количество:</label>
                                <input
                                    type="number"
                                    value={editingProduct ? editingProduct.quantity : newProduct.quantity}
                                    onChange={(e) => editingProduct ?
                                        setEditingProduct({...editingProduct, quantity: Number(e.target.value)}) :
                                        setNewProduct({...newProduct, quantity: Number(e.target.value)})
                                    }
                                    required
                                    min="0"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {editingProduct ? 'Сохранить' : 'Добавить'}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsAddingProduct(false);
                                        setEditingProduct(null);
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    const renderCategoriesTab = () => (
        <div className="manager-tab-content">
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
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
                            {categories.map((category) => (
                                <tr key={category.categoryId}>
                                    <td>{category.categoryId}</td>
                                    <td>{category.categoryName}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-edit"
                                                onClick={() => setEditingCategory(category)}
                                            >
                                                <Edit size={16}/>
                                            </button>
                                            <button
                                                className="action-delete"
                                                onClick={() => handleDeleteCategory(category.categoryId)}
                                            >
                                                <Trash2 size={16}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * limit >= totalCategories}
                        >
                            Next
                        </button>
                    </div>
                    <div className="manager-actions">
                        <button
                            className="manager-action-button"
                            onClick={() => setIsAddingCategory(true)}
                        >
                            <PlusCircle size={18}/>
                            Добавить категорию
                        </button>
                    </div>
                </>
            )}

            {/* Модальное окно добавления/редактирования категории */}
            {(isAddingCategory || editingCategory) && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}</h2>
                            <button
                                className="close-button"
                                onClick={() => {
                                    setIsAddingCategory(false);
                                    setEditingCategory(null);
                                }}
                            >
                                <X size={24}/>
                            </button>
                        </div>
                        <form onSubmit={editingCategory ?
                            (e) => {
                                e.preventDefault();
                                const data = {
                                    categoryName: editingCategory.categoryName,
                                    description: editingCategory.description
                                };
                                handleUpdateCategory(editingCategory.categoryId, data);
                            } :
                            handleAddCategory
                        }>
                            <div className="form-group">
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={editingCategory ? editingCategory.categoryName : newCategory.categoryName}
                                    onChange={(e) => editingCategory ?
                                        setEditingCategory({...editingCategory, categoryName: e.target.value}) :
                                        setNewCategory({...newCategory, categoryName: e.target.value})
                                    }
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Описание:</label>
                                <textarea
                                    value={editingCategory ? editingCategory.description : newCategory.description}
                                    onChange={(e) => editingCategory ?
                                        setEditingCategory({...editingCategory, description: e.target.value}) :
                                        setNewCategory({...newCategory, description: e.target.value})
                                    }
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {editingCategory ? 'Сохранить' : 'Добавить'}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsAddingCategory(false);
                                        setEditingCategory(null);
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

    const renderOrdersTab = () => (
        <div className="manager-tab-content">
        {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <div className="manager-table-container">
                    <table className="manager-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Пользователь</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Дата создания</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.userName}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value as Order['status'])}
                                        className="status-select"
                                    >
                                        <option value="new">Новый</option>
                                        <option value="processing">В обработке</option>
                                        <option value="completed">Завершен</option>
                                        <option value="cancelled">Отменен</option>
                                    </select>
                                </td>
                                <td>{order.totalAmount} ₽</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-view">
                                            <Eye size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * limit >= totalOrders}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderUsersTab = () => (
        <div className="manager-tab-content">
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-spinner">Loading...</div>
            ) : (
                <div className="manager-table-container">
                    <table className="manager-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="action-edit"
                                            onClick={() => {/* Implement edit logic */
                                            }}
                                        >
                                            <UserCog size={16}/>
                                        </button>
                                        <button
                                            className="action-delete"
                                            onClick={() => handleDeleteUser(user.userId)}
                                        >
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page * limit >= totalUsers}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
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
                                    <button className="action-view"><Eye size={16}/></button>
                                    <button className="action-delete"><Trash2 size={16}/></button>
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
                                onChange={(e) => setNewRole({...newRole, roleName: e.target.value})}
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
                                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
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
                                                <Trash2 size={16}/>
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
                            <PlusCircle size={18}/>
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
                    <ShoppingCart size={18}/>
                    Товары
                </button>
                <button
                    className={`manager-tab ${activeTab === 'categories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('categories')}
                >
                    <ChevronDown size={18}/>
                    Категории
                </button>
                <button
                    className={`manager-tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    <ShoppingCart size={18}/>
                    Заказы
                </button>
                <button
                    className={`manager-tab ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                >
                    <UserCog size={18}/>
                    Пользователи
                </button>
                <button
                    className={`manager-tab ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    <MessageCircle size={18}/>
                    Отзывы
                </button>
                <button
                    className={`manager-tab ${activeTab === 'roles' ? 'active' : ''}`}
                    onClick={() => setActiveTab('roles')}
                >
                    <Shield size={18}/>
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