import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Search from '../Search/search';
import './catalogue.css';
import SwitchBtn from '../SwitchButton/switch_btn';
import Pagination from '../Pagination/pagination';
import NotFound from '../NotFound/not_found';
import FilterRelicsLine from '../icons/filter_relics_line';
import FilterModal from '../FilterModal/filter_modal';
import FilterExpand from '../icons/filter_expand';
import SelFilterExpand from '../icons/sel_filter_expand';

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
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

  const handleFilterCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setIsFilterModalOpen(true);
  };

  const handleFilterOptionClick = (option: string) => {
    setSelectedFilterOptions((prevOptions) => [...prevOptions, option]);
  };

  const filterOptions = ['Option1', 'Option2', 'Option3','cow','opposum','Drake'];
  return (<>{
    notFound ? <NotFound /> :
      <div> 
        {/* Filter Modal */}
          {isFilterModalOpen && (
            <FilterModal
              options={filterOptions}
              selectedOptions={selectedFilterOptions}
              onClose={() => { setIsFilterModalOpen(false); setSelectedCategory(null); }}
              onOptionClick={(option) => handleFilterOptionClick(option)}
            />
          )}
        <div className={`catalogue-container ${isFilterModalOpen ? 'dim' : ''}`}>
         
          <div className='cat_left'>
            <div className='cat_filter'>
              <div className='cat_photo'>
                <h6>Фото</h6>
                <SwitchBtn />
              </div>
              <div className='filter_categories'>
                <ul>
                  <li className={selectedCategory === 'category' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('category')} style={{marginTop:'0.6rem'}}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Категорія</h6>
                      {selectedCategory === 'category' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'place' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('place')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Місце</h6>
                      {selectedCategory === 'place' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'material' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('material')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Матеріал</h6>
                      {selectedCategory === 'material' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'creationDate' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('creationDate')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Дата створення</h6>
                      {selectedCategory === 'creationDate' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'status' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('status')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Статус</h6>
                      {selectedCategory === 'status' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'collection' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('collection')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Колекція</h6>
                      {selectedCategory === 'collection' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'author' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('author')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Автор</h6>
                      {selectedCategory === 'author' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                  </li>

                  <li className={selectedCategory === 'techniqueName' ? 'selected' : ''}
                    onClick={() => handleFilterCategoryClick('techniqueName')}>
                    <FilterRelicsLine />
                    <div className='filter_inner'>
                      <h6>Техніка</h6>
                      {selectedCategory === 'techniqueName' ? <SelFilterExpand /> : <FilterExpand />}
                    </div>
                    <FilterRelicsLine />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='cat_right'>
            <Search />
            <div className="cat-items-container">
              {items && items.map((item, index) => (
                <Link key={item.id} to={`/catalogue/${item.id}`} className="cat-item">
                  <img src={item.thumbnailUrl} alt={item.title} />
                  {/* <div className='cat-item-title'><p>{item.title}</p></div> */}
                  <div className='cat-item-title'> {index === 0 ? <p>Мозаїчне зображення Димитрія Солунського</p> : <p>{item.title}</p>}</div>
                </Link>
              ))}
            </div>

            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={paginate} />
          </div>
        </div>
      </div>


  }
  </>
  );
};

export default Catalogue;
