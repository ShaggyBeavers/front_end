import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Search from '../Search/search';
import './catalogue.css';
import SwitchBtn from '../SwitchButton/switch_btn';
import Pagination from '../Pagination/pagination';
import NotFound from '../NotFound/not_found';
import agent from '../../app/api/agent';

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

const PAGE_SIZE = 18;

const Catalogue = () => {
  const [items, setItems] = useState<Photo[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const totalPages = 6;//temporarily hardcoded

  const fetchItems = async (page: number) => {
    //request is under,this is just to display styling
    try {
      const response = await axios.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PAGE_SIZE}`);
      // const response = await agent.Catalogue.fetchItems(page, PAGE_SIZE);
      setItems(response.data);
      console.log(response.data, 'Items fetched succesfully')
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get('page');
    const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      setNotFound(true);
    }
  }, [location.search]);

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage, navigate]);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      navigate(`?page=${pageNumber}`);
    }
  };

  return (<>{
    notFound ? <NotFound /> : <div className="catalogue-container" >
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
          {items && items.map((item) => (
            <Link key={item.id} to={`/catalogue/${item.id}`} className="cat-item">
              <img src={item.thumbnailUrl} alt={item.title} />
              <div className='cat-item-title'><a>{item.title}</a></div>
            </Link>
          ))}
        </div>

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={paginate} />
      </div>
    </div>
  }
  </>
  );
};

export default Catalogue;
