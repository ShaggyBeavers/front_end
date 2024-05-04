import Category from '../Category/category';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = () => {
    const categories = [
        {
            title: 'Архітектура',
            pic: '/assets/images/landing_sections/architecture.jpg',
        },
        {
            title: 'Зброя',
            pic: '/assets/images/landing_sections/collections.jpg',
        },
        {
            title: 'Скульптура',
            pic: '/assets/images/landing_sections/sculpture.jpg',
        },
        {
            title: 'Живопис',
            pic: '/assets/images/landing_sections/paintings.jpg',
        },
    ];

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="categories" id="categories">
            <Link to="/catalogue?page=1" className="cat_link_all" onClick={handleClick}>
                Подивитись усі:
            </Link>
            <div className="categories_con">
                {categories.map((category, idx) => (
                    <Link
                        to={`/catalogue?page=1&categories=${encodeURIComponent(category.title)}`}
                        onClick={handleClick}
                    >
                        <Category
                            key={idx}
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
