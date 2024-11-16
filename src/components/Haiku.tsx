import React from 'react';

interface HaikuProps {
    theme: 'ПОПУЛЯРНОЕ' | 'НОВОЕ' | 'АКЦИЯ';
}

const Haiku: React.FC<HaikuProps> = ({ theme }) => {
    const getHaiku = (theme: string) => {
        switch (theme) {
            case 'ПОПУЛЯРНОЕ':
                return {
                    lines: [
                        "Все спешат купить",
                        "Выбор многих не случай",
                        "Мудрость толпы здесь"
                    ]
                };
            case 'НОВОЕ':
                return {
                    lines: [
                        "Первый луч зари",
                        "Новинки появились",
                        "Мир удивлён вновь"
                    ]
                };
            case 'АКЦИЯ':
                return {
                    lines: [
                        "Цены тают вмиг",
                        "Время скидок настало",
                        "Спеши за мечтой"
                    ]
                };
            default:
                return {
                    lines: [
                        "Тихий шёпот строк",
                        "В воздухе витает смысл",
                        "Хайку молчит"
                    ]
                };
        }
    };

    const haiku = getHaiku(theme);

    return (
        <div className="my-24 text-center">
            <div className="max-w-2xl mx-auto p-12 bg-black/30 backdrop-blur-md rounded-2xl shadow-2xl">
                {haiku.lines.map((line, index) => (
                    <p
                        key={index}
                        className="text-3xl text-white my-4 font-serif tracking-wide"
                        style={{
                            fontFamily: '"Takashimura", sans-serif',
                            fontSize: '30px',
                            display: "block",
                            textAlign: 'end',
                            marginRight: "10rem"

                        }}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Haiku;