import React, {useState, useEffect} from 'react';
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
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import "../styles/manager-dashboard.css";
import {UserUtils} from "../utils/UserUtils";
import {Order} from "../models/Order";
import {ProductDto} from "../models/Product";
import {CategoryDto} from "../models/Category";

const ManagerDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders' | 'users' | 'reviews' | 'roles'>('products');
    const [roles, setRoles] = useState<any[]>([]);
    const [isAddingRole, setIsAddingRole] = useState(false);
    const [newRole, setNewRole] = useState({roleName: '', description: ''});
    const [error, setError] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const userId = UserUtils.getUserId();

    const [products, setProducts] = useState<ProductDto[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [totalCategories, setTotalCategories] = useState(0);
    const [orders, setOrders] = useState<Order[]>([]);
    const [totalOrders, setTotalOrders] = useState(0);

    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [editingProduct, setEditingProduct] = useState<{
        productId?: number;
        productName: string;
        description: string;
        price: number;
        quantity: number;
        categoryId: number;
        imagesUrl: File[];
    } | null>(null);
    const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
    const [editingUser, setEditingUser] = useState<string | null>(null);

    const toggleEditingUser = (userId: string) => {
        setEditingUser(editingUser === userId ? null : userId);
    };

    // Состояния для новых элементов
    const [newProduct, setNewProduct] = useState({
        productName: '',
        description: '',
        price: 0,
        quantity: 0,
        categoryId: 0,
        imagesUrl: [] as File[]
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
            const response = await axios.get<{
                items: ProductDto[],
                total: number
            }>(`${process.env.REACT_APP_API_URL}/products`, {
                params: {page, take: limit}
            });
            setProducts(response.data.items);
            await fetchCategories();
            setTotalProducts(response.data.total);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        // Создаем объект с JSON данными продукта
        const productData = {
            productName: newProduct.productName,
            description: newProduct.description,
            price: newProduct.price,
            quantity: newProduct.quantity,
            categoryId: newProduct.categoryId,
        };

        const formData = new FormData();
        formData.append('product', JSON.stringify(productData));

        if (newProduct.imagesUrl.length > 0) {
            newProduct.imagesUrl.forEach((file) => {
                formData.append('images', file);
            });
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, formData, {
                params: {userId},
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setIsAddingProduct(false);
                setNewProduct({
                    productName: '',
                    description: '',
                    price: 0,
                    quantity: 0,
                    categoryId: 0,
                    imagesUrl: [],
                });
                await fetchProducts();
            } else {
                setError('Failed to create product');
            }
        } catch (err) {
            setError('Failed to create product');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            if (editingProduct) {
                setEditingProduct({
                    ...editingProduct,
                    imagesUrl: [...editingProduct.imagesUrl, ...Array.from(files)]
                });
            } else {
                setNewProduct({
                    ...newProduct,
                    imagesUrl: [...newProduct.imagesUrl, ...Array.from(files)]
                });
            }
        }
    };

    const handleUpdateProduct = async (productId: number) => {
        try {
            // Создаем объект с JSON данными продукта
            const productData = {
                productName: editingProduct?.productName,
                description: editingProduct?.description,
                price: editingProduct?.price,
                quantity: editingProduct?.quantity,
                categoryId: editingProduct?.categoryId,
            };


            // Создаем FormData
            const formData = new FormData();
            formData.append('product', JSON.stringify(productData));

            // Если есть новые изображения, добавляем их в FormData
            if (editingProduct?.imagesUrl && editingProduct?.imagesUrl.length >= 0) {
                editingProduct.imagesUrl.forEach((file) => {
                    formData.append('images', file);  // Добавляем изображение
                });
            }

            // Отправляем запрос на обновление
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${productId}`, formData, {
                params: {userId},
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setEditingProduct(null);  // Закрываем режим редактирования
                await fetchProducts();    // Обновляем список продуктов
            } else {
                setError('Failed to update product');
            }
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
            const response = await axios.get<{
                items: CategoryDto[],
                total: number
            }>(`${process.env.REACT_APP_API_URL}/categories`, {
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

    const handleUpdateCategory = async (categoryId: number, data: Partial<CategoryDto>) => {
        try {
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
            const response = await axios.get<{
                items: Order[],
                total: number
            }>(`${process.env.REACT_APP_API_URL}/orders`, {
                params: {page, take: limit}
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
            if (roles.length === 0) {
                fetchRoles();
            }
        }
    }, [activeTab, page]);

    const fetchRoles = async () => {
        try {
            const response = await axios.get<{ items: any[], total: number }>(`${process.env.REACT_APP_API_URL}/roles`);
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

    const handleRoleChange = async (userId: string, roleName: string) => {
        try {
            const role = roles.find(r => r.roleName === roleName);
            if (!role) {
                setError('Role not found');
                return;
            }

            await axios.put(`${process.env.REACT_APP_API_URL}/users/${userId}`, {roleId: role.roleId}, {
                params: {userId: userId}
            });

            // Обновляем состояние пользователей
            setUsers(users.map(user => user.userId === userId ? {...user, roleName} : user));
            setEditingUser(null); // Сбрасываем режим редактирования
        } catch (err) {
            setError('Failed to update user role');
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
            const response = await axios.get<{
                items: any[],
                total: number
            }>(`${process.env.REACT_APP_API_URL}/users`, {
                params: {page, take: limit}
            });
            setUsers(response.data.items);
            setTotalUsers(response.data.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (userId === UserUtils.getUserId()) {
            setError('Нельзя удалить себя');
            return;
        }
        if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                params: {userId: UserUtils.getUserId() ?? ''}
            });
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

    const renderProductsTab = () => {
        const totalPages = Math.ceil(totalProducts / limit);

        return (
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
                                    <th>Изображения</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.category ? product.category.categoryName : 'Без категории'}</td>
                                        <td>{product.price} ₽</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.averageRating.toFixed(1)} ({product.totalFeedbacks})</td>
                                        <td>
                                            {product?.imagesUrl?.map((imageUrl, index) => (
                                                <img key={index} src={imageUrl} alt={product.productName}
                                                     style={{width: '50px', margin: '5px'}}/>
                                            ))}
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="action-edit"
                                                    onClick={() => setEditingProduct({
                                                        productId: product.productId,
                                                        productName: product.productName,
                                                        description: product.description,
                                                        price: product.price,
                                                        quantity: product.quantity,
                                                        categoryId: product.category.categoryId,
                                                        imagesUrl: []
                                                    })}
                                                >
                                                    <Edit size={16}/>
                                                </button>
                                                <button
                                                    className="action-delete"
                                                    onClick={() => handleDeleteProduct(product.productId)}
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
                                <ChevronLeft size={16}/>
                            </button>
                            <span>Страница {page} из {totalPages || 1}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * limit >= totalProducts}
                            >
                                <ChevronRight size={16}/>
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
                                    handleUpdateProduct(editingProduct.productId!);
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
                                    <label>Количество:</label>
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
                                <div className="form-group">
                                    <label>Изображения:</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="form-input"
                                    />
                                    {/* Предпросмотр изображений */}
                                    <div className="image-previews">
                                        {(editingProduct ? editingProduct.imagesUrl : newProduct.imagesUrl).map((file, index) => (
                                            <div key={index} className="image-preview">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`preview-${index}`}
                                                    style={{width: '50px', padding: '5px'}}
                                                />
                                                <button
                                                    type="button"
                                                    className="remove-image-button"
                                                    onClick={() => {
                                                        if (editingProduct) {
                                                            setEditingProduct({
                                                                ...editingProduct,
                                                                imagesUrl: editingProduct.imagesUrl.filter((_, i) => i !== index)
                                                            });
                                                        } else {
                                                            setNewProduct({
                                                                ...newProduct,
                                                                imagesUrl: newProduct.imagesUrl.filter((_, i) => i !== index)
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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
    };

    const renderCategoriesTab = () => {
        const totalPages = Math.ceil(totalCategories / limit);

        return (
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
                                <ChevronLeft size={16}/>
                            </button>
                            <span>Страница {page} из {totalPages || 1}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * limit >= totalCategories}
                            >
                                <ChevronRight size={16}/>
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
    };

    const renderOrdersTab = () => {
        const totalPages = Math.ceil(totalOrders / limit);

        return (
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
                                    <td>{order.userId}</td>
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
                                    <td>{order.total} ₽</td>
                                    <td>{new Date(order.date).toLocaleString()}</td>
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
                                <ChevronLeft size={16}/>
                            </button>
                            <span>Страница {page} из {totalPages || 1}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * limit >= totalOrders}
                            >
                                <ChevronRight size={16}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderUsersTab = () => {
        const totalPages = Math.ceil(totalUsers / limit);

        return (
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
                                <th>Роль</th>
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
                                        {editingUser === user.userId ? (
                                            <select
                                                value={user.roleName}
                                                onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                                                className="role-select"
                                            >
                                                {roles.map((role) => (
                                                    <option key={role.roleId} value={role.roleName}>
                                                        {role.roleName}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            user.roleName
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="action-edit"
                                                onClick={() => toggleEditingUser(user.userId)}
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
                                <ChevronLeft size={16}/>
                            </button>
                            <span>Страница {page} из {totalPages || 1}</span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page * limit >= totalUsers}
                            >
                                <ChevronRight size={16}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

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