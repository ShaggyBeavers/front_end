import Category from '../Category/category';
import './categories.css';

const Categories = () => {
  const categories = [
    { title: 'Архітектура' },
    { title: 'Колекції' },
    { title: 'Скульптура' },
    { title: 'Живопис' }
  ];

  return (
    <div className='categories'>
      <a href="/catalogue">Подивитись усі:</a>
      <div className="categories_con">
        {categories.map((category) => (
          <Category title={category.title} />
        ))}
      </div>
    </div>

  );
};

export default Categories;
