import React from 'react';
import ParallaxBackground from '../components/ParallaxBackground';
import ProductsCarousel from '../components/ProductsCarousel';
import imageCity from '../assets/images/popular-bg.jpg'
import image1 from '../assets/images/popular-bg.jpg'
import image2 from '../assets/images/popular-bg.jpg'
import imageBooks from '../assets/images/books.jpg'
import imageCleanings from '../assets/images/cleanings.jpg'
import imageDakimakura from '../assets/images/dakimakura.jpg'
import imageDango from '../assets/images/dango.jpg'
import imageMochi from '../assets/images/mochi.jpg'
import imageRobear from '../assets/images/robear.jfif'
import Footer from "../components/Footer";
import Haiku from "../components/Haiku";

const mockProducts = [
    { title: 'Учебник みんなの日本語', rating: 4.5, image: imageBooks },
    { title: 'Хелперы по дому', rating: 4.8, image: imageCleanings },
    { title: 'Шар в рот', rating: 3.7, image: imageDango },
    { title: 'Подарок подруге', rating: 5.0, image: imageDakimakura },
    { title: 'Моти', rating: 5.0, image: imageMochi },
    { title: 'Робот-медведь', rating: 5.0, image: imageRobear },
    { title: 'Учебник みんなの日本語', rating: 4.5, image: imageBooks },
    { title: 'Хелперы по дому', rating: 4.8, image: imageCleanings },
    { title: 'Шар в рот', rating: 3.7, image: imageDango },
    { title: 'Подарок подруге', rating: 5.0, image: imageDakimakura },
    { title: 'Моти', rating: 5.0, image: imageMochi },
    { title: 'Робот-медведь', rating: 5.0, image: imageRobear },
];

const HomePage: React.FC = () => {
    return (
        <>
            <ParallaxBackground
                title="ПОПУЛЯРНОЕ"
                image={imageCity}
            />
            <Haiku theme="ПОПУЛЯРНОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
            </div>

            <ParallaxBackground
                title="НОВОЕ"
                image={image1}
            />
            <Haiku theme="НОВОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
            </div>

            <ParallaxBackground
                title="АКЦИЯ"
                image={image2}
            />
            <Haiku theme="АКЦИЯ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
            </div>

            <Footer />
        </>
    );
};

export default HomePage;
