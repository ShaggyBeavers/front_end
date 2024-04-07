import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Search from '../Search/search';
import './catalogue.css';
import SwitchBtn from '../SwitchButton/switch_btn';
import Pagination from '../Pagination/pagination';
import NotFound from '../NotFound/not_found';
import { FilterCategory } from '../FilterCategory/filter_category';
import RelicAPI from '../../app/api/Relic/relic';
import CategoryAPI from '../../app/api/Category/category';
import HistoricalPeriodAPI from '../../app/api/HistoricalPeriod/historicalPeriod';
import TechniqueAPI from '../../app/api/Technique/technique';
import Relic from '../Relic/Relic';
import { useMutation } from '@tanstack/react-query';

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
    categories: string[];
    [key: string]: string[];
}

const PAGE_SIZE = 18;

const getIdsFromItems = (items: Relic[]) => {
    return items.map((item) => item.id);
};

const Catalogue = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [notFound, setNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
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
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [selectedFilterOptions, setSelectedFilterOptions] = useState<Filters>(
        {
            historicalPeriods: [],
            statuses: [],
            techniques: [],
            categories: [],
        }
    );
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const donwloadImages = useMutation({
        mutationFn: async (entityIds: number[]) => {
            await RelicAPI.getRelicFirstFile(entityIds);
        },
    });

    const fetchData = async (page: number) => {
        try {
            //  FOR STYLING
            // const response = await axios.get<Photo[]>(
            //     `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PAGE_SIZE}` //request is under,this is just to display styling
            // );
            const response = await RelicAPI.filterRelics(
                page - 1,
                PAGE_SIZE,
                selectedFilterOptions
            );
            setResult(response);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching items:', error);
            setNotFound(true);
        }
    };
    useEffect(() => {
        console.log(location.search)
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get('page');
        const categoryParam = searchParams.get('category');
        const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
        console.log(pageNumber)

        setCurrentPage(pageNumber);

        if (categoryParam) {
            const categoriesArray = categoryParam.split(',');
            setSelectedFilterOptions({
                categories: categoriesArray,
                historicalPeriods: [],
                statuses: [],
                techniques: [],
            });
        }
        fetchData(pageNumber);
    }, [location.search]);

    useEffect(() => {
        fetchData(currentPage).then(() => {
            getIdsFromItems(result.content);
        });
    }, [currentPage, navigate, selectedFilterOptions]);

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
        let selectedValue = option;
        if (category === 'statuses') {
            const selectedOption = statusOptions.find(
                ({ label }) => label === option
            );
            if (selectedOption) {
                selectedValue = selectedOption.value;
            }
        }
        setSelectedFilterOptions((prevOptions) => ({
            ...prevOptions,
            [category]:
                option === 'clear'
                    ? []
                    : prevOptions[category]
                      ? prevOptions[category].includes(selectedValue)
                          ? prevOptions[category].filter(
                                (item) => item !== selectedValue
                            )
                          : [...prevOptions[category], selectedValue]
                      : [selectedValue],
        }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryAPI.getCategories();
                const categoryNames = response.map(
                    (item: { name: string }) => item.name
                );
                setCategories(categoryNames);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchHistoricalPeriods = async () => {
            try {
                const response =
                    await HistoricalPeriodAPI.getHistoricalPeriods();
                const periodNames = response.map(
                    (item: { name: string }) => item.name
                );
                setHistoricalPeriods(periodNames);
            } catch (error) {
                console.error('Error fetching historical periods:', error);
            }
        };

        const fetchTechniques = async () => {
            try {
                const response = await TechniqueAPI.getTechniques();
                const techniqueNames = response.map(
                    (item: { name: string }) => item.name
                );
                setTechniques(techniqueNames);
            } catch (error) {
                console.error('Error fetching techniques:', error);
            }
        };

        fetchCategories();
        fetchHistoricalPeriods();
        fetchTechniques();
    }, []);

    const filterTitles = [
        'Категорія',
        'Статус',
        'Історичний період',
        'Техніка',
    ];
    const filterCategories = [
        'categories',
        'statuses',
        'historicalPeriods',
        'techniques',
    ];
    const translatedTitles = filterCategories.map(
        (category, index) => filterTitles[index] || category
    );

    const [categories, setCategories] = useState<string[]>([]);
    const [historicalPeriods, setHistoricalPeriods] = useState<string[]>([]);
    const [techniques, setTechniques] = useState<string[]>([]);
    const statusOptions = [
        { value: 'DESTROYED', label: 'Знищено' },
        { value: 'STOLEN', label: 'Вкрадено' },
        { value: 'RETURNED', label: 'Повернуто' },
        { value: 'UNKNOWN', label: 'Невідомо' },
    ];
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const applyFilters = () => {
        // console.log('yes,hell');
        fetchData(currentPage);
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
                                            options={
                                                category === 'statuses'
                                                    ? statusOptions.map(
                                                          ({ label }) => label
                                                      )
                                                    : category === 'categories'
                                                      ? categories
                                                      : category ===
                                                          'historicalPeriods'
                                                        ? historicalPeriods
                                                        : category ===
                                                            'techniques'
                                                          ? techniques
                                                          : []
                                            }
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
                                result.content.map((item) => (
                                    <Link
                                        key={item.id}
                                        to={`/catalogue/${item.id}`}
                                        className="cat-item"
                                    >
                                        <img src={item.imageUrl} />
                                        <div className="cat-item-title">
                                            <p>{item.name}</p>
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
