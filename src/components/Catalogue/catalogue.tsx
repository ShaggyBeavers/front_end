import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from '../Search/search';
import './catalogue.css';
import SwitchBtn from '../SwitchButton/switch_btn';
import Pagination from '../Pagination/pagination';

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

const PAGE_SIZE = 18;

const Catalogue = () => {
  const [items, setItems] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchItems = async (page: number) => {
    //request is ready in agent.ts,this is just to display styling
    try {
      const response = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PAGE_SIZE}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
    setCurrentPage(pageNumber);
  }, [location.search]);


  useEffect(() => {
    fetchItems(currentPage);
    navigate(`?page=${currentPage}`);
  }, [currentPage, navigate]);


  const totalPages = 6;//temporarily hardcoded

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="catalogue-container" id='cat_top'>
      <div className='cat_left'>
        <div className='cat_filter'>
          <div className='cat_photo'>
            <h6>Фото</h6>
            <SwitchBtn />
          </div>
          <div className='filter_categories'>
            <ul>
              <li>
                <img src="" />
                <h6>Категорія</h6>
                <img src="" />
              </li>
              <li>
                <img src="" />
                <h6>Категорія</h6>
                <img src="" />
              </li>
              <li>
                <img src="" />
                <h6>Категорія</h6>
                <img src="" />
              </li>
              <li>
                <img src="" />
                <h6>Категорія</h6>
                <img src="" />
              </li>
              <li>
                <img src="" />
                <h6>Категорія</h6>
                <img src="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='cat_right'>
        <Search />
        <div className="cat-items-container">
          {items.map((item) => (
            <div key={item.id} className="cat-item">
              <img src={item.thumbnailUrl} alt={item.title} />
              <div className='cat-item-title'><a>{item.title}</a></div>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={paginate} topRef='cat_top' />
      </div>
    </div>
  );
};

export default Catalogue;
