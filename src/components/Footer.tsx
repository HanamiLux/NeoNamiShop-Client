import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">О нас</h3>
                        <p className="text-gray-400">
                            Мы предлагаем широкий выбор японских товаров высочайшего качества
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Контакты</h3>
                        <ul className="text-gray-400">
                            <li className="mb-2">Телефон: +7 (999) 123-45-67</li>
                            <li className="mb-2">Email: info@japanstore.ru</li>
                            <li className="mb-2">Адрес: г. Москва, ул. Японская, 1</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Информация</h3>
                        <ul className="text-gray-400">
                            <li className="mb-2">Доставка</li>
                            <li className="mb-2">Оплата</li>
                            <li className="mb-2">Возврат</li>
                            <li className="mb-2">FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
                        <ul className="text-gray-400">
                            <li className="mb-2">VK</li>
                            <li className="mb-2">Telegram</li>
                            <li className="mb-2">WhatsApp</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>&copy; 2024 Japan Store. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;