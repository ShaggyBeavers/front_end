import Category from '../Category/category';
import { Link } from 'react-router-dom';
import './categories.css';

const Categories = () => {
    const categories = [
        { title: 'Архітектура' },
        { title: 'Колекції' },
        { title: 'Скульптура' },
        { title: 'Живопис' },
    ];

    return (
        <div className="categories">
            <Link to="/catalogue?page=1">Подивитись усі:</Link>
            <div className="categories_con">
                {categories.map((category) => (
                    <Category title={category.title} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
