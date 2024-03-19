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
import { FilterCategory } from '../FilterCategory/filter_category';
import { title } from 'process';
import RelicAPI from '../../app/api/Relic/relic';
import Relic from '../Relic/Relic';

interface Photo {
    //FOR STYLING
    id: number;
    thumbnailUrl: string;
    title: string;
}

interface GetAllRelicsResponse {
    totalPages: number;
    totalElements: number;
    size: number;
    content: Relic[];
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    pageable: {
        offset: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
  }

export interface Filters {
    historicalPeriods: string[];
    statuses: string[];
    techniques: string[];
    collections: string[];
    categories: string[];
    [key: string]: string[];
}

const PAGE_SIZE = 18;

const Catalogue = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const [items, setItems] = useState<Photo[]>([]);   FOR STYLING
    const [result, setResult] = useState<GetAllRelicsResponse>({
        totalPages: 0,
        totalElements: 0,
        size: 0,
        content: [],
        number: 0,
        sort: {
            empty: true,
            sorted: true,
            unsorted: true,
        },
        pageable: {
            offset: 0,
            sort: {
                empty: true,
                sorted: true,
                unsorted: true,
            },
            pageNumber: 0,
            pageSize: 0,
            paged: true,
            unpaged: true,
        },
        first: true,
        last: true,
        numberOfElements: 0,
        empty: true,
    });
    const [notFound, setNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedFilterOptions, setSelectedFilterOptions] = useState<Filters>(
        {
            historicalPeriods: [],
            statuses: [],
            techniques: [],
            collections: [],
            categories: [],
        }
    );
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const totalPages = 9; //temporarily hardcoded

    const fetchItems = async (page: number) => {
        try {
            //FOR STYLING
            // const response = await axios.get<Photo[]>(
            //     `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PAGE_SIZE}` //request is under,this is just to display styling
            // );
            const response = await RelicAPI.filterRelics(
                page - 1,
                PAGE_SIZE,
                selectedFilterOptions
            );
            // setItems(response.content);  FOR STYLING
            setResult(response);
            console.log(response, 'Items fetched succesfully');
            console.log(response.content);
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
            scrollToTop();
        }
    };

    const handleFilterCategoryClick = (category: string) => {
        if (category === selectedCategory) {
            setIsFilterModalOpen(false);
            setSelectedCategory(null);
        } else {
            setSelectedCategory(category);
            setIsFilterModalOpen(true);
        }
    };

    const handleFilterOptionClick = (option: string, category: string) => {
        setSelectedFilterOptions((prevOptions) => ({
            ...prevOptions,
            [category]:
                option === 'clear'
                    ? []
                    : prevOptions[category]
                      ? prevOptions[category].includes(option)
                          ? prevOptions[category].filter(
                                (item) => item !== option
                            )
                          : [...prevOptions[category], option]
                      : [option],
        }));
    };

    useEffect(() => {
        console.log(selectedFilterOptions);
    }, [selectedFilterOptions]);

    const filterTitles = [
        'Категорія',
        'Місце',
        'Матеріал',
        'Дата створення',
        'Статус',
        'Колекція',
        'Автор',
        'Техніка',
    ];
    const filterCategories = [
        'category',
        'place',
        'material',
        'creationDate',
        'status',
        'collection',
        'author',
        'technique',
    ];
    const translatedTitles = filterCategories.map(
        (category, index) => filterTitles[index] || category
    );
    const filterOptions = [
        'Option1',
        'Option2',
        'Option3',
        'cow',
        'opposum',
        'Drake',
        'cowbigchonk',
        'opposumextrafff small',
        'Drake2',
        'nocow',
        'opposum1',
        'Drakie',
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const applyFilters = () => {
        console.log('yes,hell');
        fetchItems(currentPage);
    };

    return (
        <>
            {notFound ? (
                <NotFound />
            ) : (
                <div className="catalogue-container">
                    <div className="cat_left">
                        <div className="cat_filter">
                            <div className="cat_photo">
                                <h6>Фото</h6>
                                <SwitchBtn />
                            </div>
                            <div className="filter_categories">
                                <ul>
                                    {filterCategories.map((category, index) => (
                                        <FilterCategory
                                            key={category}
                                            category={category}
                                            title={translatedTitles[index]}
                                            selectedCategory={selectedCategory}
                                            handleFilterCategoryClick={
                                                handleFilterCategoryClick
                                            }
                                            isFilterModalOpen={
                                                isFilterModalOpen
                                            }
                                            options={filterOptions}
                                            selectedFilterOptions={
                                                selectedFilterOptions
                                            }
                                            handleFilterOptionClick={
                                                handleFilterOptionClick
                                            }
                                            setIsFilterModalOpen={
                                                setIsFilterModalOpen
                                            }
                                            applyFilters={applyFilters}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="cat_right">
                        <Search />
                        <div className="cat-items-container">
                            {result &&
                                result.content.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        to={`/catalogue/${item.id}`}
                                        className="cat-item"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                        />
                                        {/* <div className='cat-item-title'><p>{item.title}</p></div> */}
                                        <div className="cat-item-title">
                                            {' '}
                                            {index === 0 ? (
                                                <p>
                                                    Мозаїчне зображення Димитрія
                                                    Солунського
                                                </p>
                                            ) : (
                                                <p>{item.name}</p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                        </div>

                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={paginate}
                        />
                        <div className="to_top" onClick={scrollToTop}>
                            Перейти до гори
                        </div>
                        {isFilterModalOpen && (
                            <div
                                className={`dimmed-overlay ${isFilterModalOpen ? 'active' : ''}`}
                            ></div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Catalogue;
