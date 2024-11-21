import React, { useState } from 'react';
import {
    Database,
    Eye,
    Download,
    Upload,
    Server,
    Activity,
    FileText,
    BarChart
} from 'lucide-react';

const AdminDatabaseDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'logs' | 'data-export' | 'data-import' | 'system-stats'>('logs');

    const renderLogsTab = () => (
        <div className="manager-tab-content">
            <div className="manager-table-container">
                <table className="manager-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Пользователь</th>
                        <th>Действие</th>
                        <th>Время</th>
                        <th>Детали</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3, 4, 5].map((log) => (
                        <tr key={log}>
                            <td>{log}</td>
                            <td>Пользователь {log}</td>
                            <td>Вход в систему</td>
                            <td>2024-02-15 14:30:22</td>
                            <td>
                                <button className="action-view"><Eye size={16} /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderDataExportTab = () => (
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
                <div className="export-details">
                    <h4>Последний экспорт</h4>
                    <p>Дата: 2024-02-15 15:45:30</p>
                    <p>Тип: Полная база данных</p>
                    <p>Размер: 256 МБ</p>
                    <button className="manager-action-button">
                        <Download size={18} />
                        Скачать последний экспорт
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDataImportTab = () => (
        <div className="manager-tab-content">
            <div className="data-import-container">
                <div className="import-upload">
                    <h3>Импорт данных</h3>
                    <div className="file-upload-zone">
                        <Upload size={48} />
                        <p>Перетащите файл или выберите</p>
                        <input type="file" className="file-input" />
                    </div>
                    <div className="import-options">
                        <label className="import-option">
                            <input type="checkbox" />
                            Заменить существующие данные
                        </label>
                        <label className="import-option">
                            <input type="checkbox" />
                            Создать резервную копию перед импортом
                        </label>
                    </div>
                    <button className="manager-action-button">
                        <Database size={18} />
                        Начать импорт
                    </button>
                </div>
                <div className="import-history">
                    <h4>История импорта</h4>
                    <table className="manager-table">
                        <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Тип</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[1, 2, 3].map((item) => (
                            <tr key={item}>
                                <td>2024-02-14</td>
                                <td>Пользователи</td>
                                <td>Успешно</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderSystemStatsTab = () => (
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
                    <div className="stat-card">
                        <Server size={32} />
                        <h4>Последнее обновление</h4>
                        <p>2024-02-15</p>
                    </div>
                    <div className="stat-card">
                        <BarChart size={32} />
                        <h4>Запросов в минуту</h4>
                        <p>45</p>
                    </div>
                </div>
            </div>
        </div>
    );

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