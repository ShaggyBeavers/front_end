import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    useNavigate,
    useLocation,
    Link,
    useSearchParams,
} from 'react-router-dom';
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
import MuseumAPI from '../../app/api/Museum/museum';
import RegionAPI from '../../app/api/Region/region';
import Relic from '../Relic/Relic';
import {
    infiniteQueryOptions,
    useMutation,
    useQuery,
} from '@tanstack/react-query';
import { array } from 'zod';
import { useWindowSize } from '@react-hook/window-size';
import { unzipSync } from 'fflate';
import { Buffer } from 'buffer';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
    Masonry,
    useContainerPosition,
    useResizeObserver,
    usePositioner,
    MasonryScroller,
} from 'masonic';
import RelicItem from './relicItem';

interface Photo {
    //FOR STYLING
    id: number;
    thumbnailUrl: string;
    title: string;
}

interface RelicWithDisplayImage extends Relic {
    displayImage?: string;
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
    name: string;
    historicalPeriods: string[];
    statuses: string[];
    techniques: string[];
    categories: string[];
    regions: string[];
    museums: string[];
    file: any;
    [key: string]: any;
}

interface ImageId {
    id: number;
    image: string;
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
    const [ids, setIds] = useState<ImageId[]>([]);
    const [searchParam, setSearchParam] = useSearchParams();
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
            name: '',
            historicalPeriods: [],
            statuses: [],
            techniques: [],
            categories: [],
            museums: [],
            regions: [],
            file: null,
        }
    );
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    // const downloadImages = useQuery({
    //     queryKey: ['relicImages', ids],
    //     queryFn: async () =>
    //         await RelicAPI.getRelicFirstFile({ entityIds: ids }),
    //     // refetchInterval: 10000,
    //     // retry: false,
    // });
    const {
        data: downloadData,
        isSuccess: isDownloadSuccesm,
        mutate: downloadImages,
        mutateAsync: downloadImagesAsync,
    } = useMutation({
        mutationFn: async (entityIds: number[]) =>
            await RelicAPI.getRelicFirstFile({ entityIds: entityIds }),
        onSuccess: (data) => {
            // console.log('downloadImages', typeof data);
        },
        onError: (error) => {
            console.error('Error downloading images:', error);
        },
        retry: false,
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
            const idsList = getIdsFromItems(response.content);
            setIds(idsList.map((id) => ({ id: id, image: '' })));
            if (idsList.length > 0) {
                // downloadImages(ids);
                const reader = new FileReader();

                reader.onload = (e) => {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const imagesArray = unzipSync(new Uint8Array(arrayBuffer));
                    const batchSize = 15; // Adjust the batch size as needed
                    const tmp: ImageId[] = [];
                    for (
                        let i = 0;
                        i < Object.keys(imagesArray).length;
                        i += batchSize
                    ) {
                        const batch = Object.entries(imagesArray).slice(
                            i,
                            i + batchSize
                        );
                        tmp.push(
                            ...batch.map(([key, value]) => {
                                const modifiedKey = parseInt(key, 10);
                                return {
                                    id: modifiedKey,
                                    image: Buffer.from(value).toString(
                                        'base64'
                                    ),
                                };
                            })
                        );
                    }

                    setResult((prevResult) => {
                        const updatedContent = prevResult.content.map(
                            (item) => {
                                const matchingId = tmp.find(
                                    (id) => id.id === item.id
                                );
                                if (matchingId) {
                                    return {
                                        ...item,
                                        displayImage: matchingId.image,
                                    };
                                }
                                return item;
                            }
                        );
                        return {
                            ...prevResult,
                            content: updatedContent,
                        };
                    });

                    setIds(tmp);
                };

                reader.onerror = (e) => {
                    console.error('Error reading file:', e);
                };

                downloadImagesAsync(idsList).then((data) => {
                    reader.readAsArrayBuffer(data);
                });
            }
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error('Error fetching items:', error);
            setNotFound(true);
        }
    };

    useEffect(() => {
        // const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParam.get('page');
        const categoryParam = searchParam.get('category');
        const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
        setCurrentPage(pageNumber);

        if (categoryParam) {
            const categoriesArray = categoryParam.split(',');
            setSelectedFilterOptions((prevState) => ({
                ...prevState,
                categories: categoriesArray,
            }));
        }
        fetchData(pageNumber);
    }, [location.search]);

    useEffect(() => {
        fetchData(currentPage);
    }, [navigate, selectedFilterOptions]);

    useEffect(() => {
        console.log(selectedFilterOptions);
    }, [selectedFilterOptions]);

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            navigate(`?page=${pageNumber}`);
            scrollToTop();
        }
    };

    const handleToggleFileFilter = (isChecked: boolean | null) => {
        setSelectedFilterOptions((prevOptions) => ({
            ...prevOptions,
            file: isChecked === null ? null : isChecked,
        }));
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
                    : Array.isArray(prevOptions[category])
                      ? prevOptions[category].includes(selectedValue)
                          ? prevOptions[category].filter(
                                (item: string) => item !== selectedValue
                            )
                          : [...prevOptions[category], selectedValue]
                      : [selectedValue],
        }));
    };

    useEffect(() => {
        const fetchData = async (
            apiFunction: () => Promise<{ name: string }[]>,
            setStateFunction: (names: string[]) => void
        ) => {
            try {
                const response = await apiFunction();
                const names = response.map((item) => item.name);
                setStateFunction(names);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        };

        fetchData(CategoryAPI.getCategories, setCategories);
        fetchData(
            HistoricalPeriodAPI.getHistoricalPeriods,
            setHistoricalPeriods
        );
        fetchData(TechniqueAPI.getTechniques, setTechniques);
        fetchData(MuseumAPI.getMuseums, setMuseums);
        fetchData(RegionAPI.getRegions, setRegions);
    }, []);

    const filterTitles = [
        'Категорія',
        'Статус',
        'Історичний період',
        'Техніка',
        'Музей',
        'Регіон',
    ];
    const filterCategories = [
        'categories',
        'statuses',
        'historicalPeriods',
        'techniques',
        'museums',
        'regions',
    ];
    const translatedTitles = filterCategories.map(
        (category, index) => filterTitles[index] || category
    );

    const [categories, setCategories] = useState<string[]>([]);
    const [historicalPeriods, setHistoricalPeriods] = useState<string[]>([]);
    const [techniques, setTechniques] = useState<string[]>([]);
    const [museums, setMuseums] = useState<string[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
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
        fetchData(currentPage);
    };

    const containerRef = useRef(null);
    const [windowWidth, windowHeight] = useWindowSize({
        initialWidth: window.innerWidth,
        initialHeight: window.innerHeight,
    });
    const { offset, width } = useContainerPosition(containerRef, [
        windowWidth,
        windowHeight,
    ]);
    const positioner = usePositioner(
        {
            // width: width * 0.7,
            width: window.innerWidth * 0.6,
            columnGutter: 20,
            columnWidth: 120,
            columnCount: 3,
            // rowGutter: 15,
        },
        [result.content]
    );

    const resizeObserver = useResizeObserver(positioner);

    return (
        <>
            {notFound ? (
                <NotFound />
            ) : (
                <div className="catalogue-container">
                    <div className="cat_left">
                        <div className="cat_search">
                            <Search
                                setSelectedFilterOptions={
                                    setSelectedFilterOptions
                                }
                            />
                        </div>
                        <div className="cat_filter">
                            <div className="cat_photo">
                                <h6>Фото</h6>
                                <SwitchBtn onToggle={handleToggleFileFilter} />
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
                                                          : category ===
                                                              'museums'
                                                            ? museums
                                                            : category ===
                                                                'regions'
                                                              ? regions
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
                    {/* <div className="cat_right"> */}
                    <div className="w-full">
                        {result.totalElements === 0 ? (
                            <div className="w-full flex justify-center items-center h-screen">
                                <div className="max-w-md text-center ">
                                    <h3 className="pb-20">
                                        За вашим запитом нічого не знайдено
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-full">
                                    <MasonryScroller
                                        items={result.content}
                                        positioner={positioner}
                                        resizeObserver={resizeObserver}
                                        height={windowHeight}
                                        offset={offset}
                                        // columnGutter={5}
                                        // rowGutter={15}
                                        // columnCount={3}
                                        // columnWidth={140}
                                        overscanBy={Infinity}
                                        render={RelicItem}
                                    />
                                    {/* {result &&
                                        result.content.map((item) => (
                        
                                      ))} */}
                                </div>

                                <div className="flex flex-col items-center">
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={paginate}
                                    />
                                    <div
                                        className="to_top"
                                        onClick={scrollToTop}
                                    >
                                        Перейти до гори
                                    </div>
                                </div>
                            </>
                        )}
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
