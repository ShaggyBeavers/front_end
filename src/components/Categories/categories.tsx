import Category from '../Category/category';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = () => {
    const categories = [
        {
            title: 'Архітектура',
            query: 'architecture',
            pic: '/assets/images/landing_sections/architecture.jpg',
        },
        {
            title: 'Зброя',
            query: 'weapon',
            pic: '/assets/images/landing_sections/collections.jpg',
        },
        {
            title: 'Скульптура',
            query: 'sculpture',
            pic: '/assets/images/landing_sections/sculpture.jpg',
        },
        {
            title: 'Живопис',
            query: 'paintings',
            pic: '/assets/images/landing_sections/paintings.jpg',
        },
    ];

    return (
        <div className="categories" id="categories">
            <Link to="/catalogue?page=1" className='cat_link_all'>Подивитись усі:</Link>
            <div className="categories_con">
                {categories.map((category) => (
                    <Link
                        to={`/catalogue?page=1&category=${encodeURIComponent(category.query)}`}
                    >
                        <Category
                            title={category.title}
                            picture={category.pic}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
