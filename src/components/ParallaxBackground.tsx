import React from 'react';
import { Parallax } from 'react-parallax';

interface ParallaxBackgroundProps {
    title: string;
    image: string;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ title, image }) => {
    // Динамически определяем размер шрифта на основе длины текста
    const getFontSize = (text: string) => {
        return text === "ПОПУЛЯРНОЕ" ? "10rem" : "15rem";
    };
    const getTransform = (text: string) => {
        return text === "ПОПУЛЯРНОЕ" ? "translate(-50%, -220%)" : "translate(-50%, -120%)";
    };

    return (
        <Parallax bgImage={image} strength={600}>
            <div className="parallax-container">
                <div className="parallax-gradient-top"></div>
                <div className="parallax-gradient-bottom"></div>
                <h1
                    className="parallax-title"
                    style={{ fontSize: getFontSize(title), transform: getTransform(title) }}
                >
                    {title}
                </h1>
            </div>
        </Parallax>
    );
};

export default ParallaxBackground;