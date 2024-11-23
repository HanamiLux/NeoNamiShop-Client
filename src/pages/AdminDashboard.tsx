import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Database,
    Eye,
    Download,
    Upload,
    Server,
    Activity,
    FileText,
    BarChart,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface Log {
    logId: number;
    userId: string;
    content: string;
    type: string;
    date: Date;
    user: {
        username: string;
    };
}

interface LogsResponse {
    items: Log[];
    total: number;
}

const AdminDatabaseDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'logs' | 'data-export' | 'data-import' | 'system-stats'>('logs');
    const [logs, setLogs] = useState<Log[]>([]);
    const [totalLogs, setTotalLogs] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 10;

    const fetchLogs = async (page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get<LogsResponse>(`${process.env.REACT_APP_API_URL}/logs`, {
                params: {
                    page,
                    take: itemsPerPage
                }
            });

            setLogs(response.data.items);
            setTotalLogs(response.data.total);
        } catch (err) {
            setError('Failed to fetch logs');
            console.error('Error fetching logs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'logs') {
            fetchLogs(currentPage);
        }
    }, [activeTab, currentPage]);

    const totalPages = Math.ceil(totalLogs / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const renderLogsTab = () => {
        return (
            <div className="manager-tab-content">
                {error && (
                    <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="manager-table-container">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                        </div>
                    ) : (
                        <>
                            <table className="manager-table w-full">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Пользователь</th>
                                    <th>Тип</th>
                                    <th>Содержание</th>
                                    <th>Время</th>
                                    <th>Действия</th>
                                </tr>
                                </thead>
                                <tbody>
                                {logs.map((log) => (
                                    <tr key={log.logId}>
                                        <td>{log.logId}</td>
                                        <td>{log.user?.username || log.userId}</td>
                                        <td>{log.type}</td>
                                        <td>{log.content}</td>
                                        <td>{format(new Date(log.date), 'dd.MM.yyyy HH:mm:ss')}</td>
                                        <td>
                                            <button className="action-view">
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="text-sm">
                                        Страница {currentPage} из {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="text-sm text-gray-600">
                                    Всего записей: {totalLogs}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const renderDataExportTab = () => {
        return (
            <div className="manager-tab-content">
                <div className="data-export-container">
                    <div className="export-options">
                        <h3>Экспорт данных</h3>
                        <div className="export-grid">
                            <button className="export-button">
                                <FileText size={24} />
                                Экспорт пользователей
                            </button>
                            <button className="export-button">
                                <Server size={24} />
                                Экспорт товаров
                            </button>
                            <button className="export-button">
                                <BarChart size={24} />
                                Экспорт заказов
                            </button>
                            <button className="export-button">
                                <Database size={24} />
                                Полной базы данных
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderDataImportTab = () => {
        return (
            <div className="manager-tab-content">
                <div className="data-import-container">
                    <div className="import-upload">
                        <h3>Импорт данных</h3>
                        <div className="file-upload-zone">
                            <Upload size={48} />
                            <p>Перетащите файл или выберите</p>
                            <input type="file" className="file-input" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderSystemStatsTab = () => {
        return (
            <div className="manager-tab-content">
                <div className="system-stats-container">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <Database size={32} />
                            <h4>Размер БД</h4>
                            <p>512 МБ</p>
                        </div>
                        <div className="stat-card">
                            <Activity size={32} />
                            <h4>Активные подключения</h4>
                            <p>12</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="manager-dashboard content">
            <h1 className="dashboard-title">Панель администратора базы данных</h1>

            <div className="manager-tabs">
                <button
                    className={`manager-tab ${activeTab === 'logs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('logs')}
                >
                    <FileText size={18} />
                    Логи пользователей
                </button>
                <button
                    className={`manager-tab ${activeTab === 'data-export' ? 'active' : ''}`}
                    onClick={() => setActiveTab('data-export')}
                >
                    <Download size={18} />
                    Экспорт данных
                </button>
                <button
                    className={`manager-tab ${activeTab === 'data-import' ? 'active' : ''}`}
                    onClick={() => setActiveTab('data-import')}
                >
                    <Upload size={18} />
                    Импорт данных
                </button>
                <button
                    className={`manager-tab ${activeTab === 'system-stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('system-stats')}
                >
                    <BarChart size={18} />
                    Статистика системы
                </button>
            </div>

            <div className="manager-content">
                {activeTab === 'logs' && renderLogsTab()}
                {activeTab === 'data-export' && renderDataExportTab()}
                {activeTab === 'data-import' && renderDataImportTab()}
                {activeTab === 'system-stats' && renderSystemStatsTab()}
            </div>
        </div>
    );
};

export default AdminDatabaseDashboard;