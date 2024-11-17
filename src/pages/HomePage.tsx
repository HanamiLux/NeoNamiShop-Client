import React from 'react';
import ParallaxBackground from '../components/ParallaxBackground';
import ProductsCarousel from '../components/ProductsCarousel';
import imageBooks from '../assets/images/books.jpg'
import imageCleanings from '../assets/images/cleanings.jpg'
import imageDakimakura from '../assets/images/dakimakura.jpg'
import imageDango from '../assets/images/dango.jpg'
import imageMochi from '../assets/images/mochi.jpg'
import imageRobear from '../assets/images/robear.jfif'
import Haiku from "../components/Haiku";
import CatalogButton from "../components/CatalogButton";

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
                image="/assets/images/popular-bg.jpg"
            />
            <Haiku theme="ПОПУЛЯРНОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
                <CatalogButton position={"end"} text={"К товарам"}/>
            </div>

            <ParallaxBackground
                title="НОВОЕ"
                image="/assets/images/new-bg.jpg"
            />
            <Haiku theme="НОВОЕ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
                <CatalogButton position={"start"} text={"Смотреть"}/>
            </div>

            <ParallaxBackground
                title="АКЦИЯ"
                image="/assets/images/discounts-bg.jpg"
            />
            <Haiku theme="АКЦИЯ" />
            <div className="mt-5 content">
                <ProductsCarousel products={mockProducts} />
                <CatalogButton position={"center"} text={"Все товары"}/>
            </div>
        </>
    );
};

export default HomePage;
