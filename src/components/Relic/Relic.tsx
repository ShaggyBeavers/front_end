import React, { useEffect, useState } from 'react';
import axios from 'axios';
import agent from '../../app/api/agent';
import NotFound from '../NotFound/not_found';
import './relic.css'
import { useNavigate } from 'react-router-dom';

interface RelicProps {
    relicId: number;
}

interface RelicPropertyDTO {
    name: string;
    value: string;
}

interface RelicInfoDTO {
    techniqueName: string;
    historicalPeriodName: string;
    dimensions: string;
    marks: string;
    labels: string;
    signatures: string;
    restoration: string;
    annotation: string;
}

interface RecoveredRelicInfoDTO {
    locationSource: string;
    returnProcess: string;
    returnDate: string;
    courtDecision: string;
}

interface LostRelicInfoDTO {
    lossWay: string;
    lossTime: string;
    museumName: string;
    probableLocation: string;
}

interface Relic {
    id: number;
    name: string;
    creationDate: string;
    creationPlaceName: string;
    imageUrl: string;
    museumName: string;
    regionName: string;
    quantity: number;
    collection: string;
    comment: string;
    status: string;
    relicPropertyDTOs: RelicPropertyDTO[];
    relicInfoDTO: RelicInfoDTO;
    recoveredRelicInfoDTO: RecoveredRelicInfoDTO;
    lostRelicInfoDTO: LostRelicInfoDTO;
}


const Relic = ({ relicId }: RelicProps) => {
    const [item, setItem] = useState<Relic | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await agent.Relic.fetchDetails(relicId);
                console.log('Request Details:', response.config);
                setItem(response.data);
                console.log(item);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        fetchItemDetails();
    }, [relicId]);

    // if (!item) {
    //     return <NotFound/>;
    // }
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const placeholderImages = [
        'https://via.placeholder.com/400x300?text=Image+1',
        'https://via.placeholder.com/400x300?text=Image+2',
        'https://via.placeholder.com/400x300?text=Image+3',
    ]
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            //   Math.min(prevIndex + 1, item?.imageUrl.length - 1 || 0)
            Math.min(prevIndex + 1, placeholderImages.length - 1)
        );
    };


    return (
        <div className='relic_con'>
            <div className='relic_left'>
                <div className='prev_relic' onClick={goBack}>
                    <img src="/icons/prev_page_relic.svg" alt="" style={{ height: 14 }} />
                    <p>Повернутись</p>
                </div>
                <h4>Мозаїчне зображення Димитрія Солунського з Михайлівського Золотоверхого собору</h4>
                {/* <h4>{item.name}</h4> */}
                <div>
                    <h6>Категорія:</h6>
                    <p>Мозаїка</p>
                </div>
                <div className='relic_col'>
                    <h6>Колекція:</h6>
                    <a style={{ fontFamily: 'eUkraine-Thin', cursor: 'unset' }}>Якась гіпер довга назва аби Макс глянув чи вона працює</a>
                </div>

                <div className='relic_dates'>
                    <div>
                        <h5>Рік створення:</h5>
                        <p>1108-1113</p>
                    </div>
                    <div>
                        <h5>Викрадено:</h5>
                        <p>1937</p>
                    </div>
                </div>
                <div>
                    <h5>Історичне місце знаходження:</h5>
                    <p>Михайлівський Золотоверхий монастир, Київ, Україна</p>
                </div>
                <div>
                    <h5>Опис:</h5>
                    <p>Михайлівський собор, збудований у 1108-1113 роках, був зруйнований у 1937 році. Мозаїки та фрески з собору були виставлені в Державному українському музеї в Києві.
                        Після розстрілу директора музею частину творів вивезли до Софійського собору та Москви.
                        Незважаючи на реконструкцію, ключові твори мистецтва так і не були повернуті до Києва і залишаються в Третьяковській
                        галереї в Москві.</p>
                </div>
                <div className='relic_am_status'>
                    <div>
                        <h5>Кількість:</h5>
                        <p>1</p>
                        {/* <p>{item.quantity}</p> */}
                    </div>
                    <div>
                        <h5>Статус:</h5>
                        <p>Викрадено</p>
                        {/* <p>{item.status}</p> */}
                    </div>
                </div>
                <div>
                    <h5>Історичний період:</h5>
                    <p>Поступовий розклад Київської держави</p>
                </div>
                <div>
                    <h5>Місце зникнення:</h5>
                    <p>Київ</p>
                </div>
                <div>
                    <h5>Дата зникнення:</h5>
                    <p>12.12.1938</p>
                </div>
                <div>
                    <h5>Судові рішення:</h5>
                    <p>-</p>
                </div>
                <div className='relic_source'>
                    <h5>Джерела:</h5>
                    <a>https://www.pravda.com.ua/cdn/cd1/treasures/eng/</a>
                    {/* <a>{item.source}</a> */}
                </div>
            </div>
            <div className='relic_right'>
                <div className='relic_carousel'>
                    <div className='relic_pic_nav'>
                        <img
                            src={currentImageIndex === 0 ? "/icons/prev_arrow_relic.svg" : "/icons/prev_arrow_relic_d.svg"}
                            className={`arrow prev ${currentImageIndex === 0 ? 'disabled' : ''}`}
                            onClick={handlePrevImage}
                            alt="Previous"
                        />
                    </div>
                    <div className='relic_img_con'>
                        <img
                            src={placeholderImages[currentImageIndex]}
                            // src={item.imageUrl[currentImageIndex]}
                            alt={`Relic Image ${currentImageIndex + 1}`}
                        // src='/vert.jpg'
                        />
                    </div>

                    <div className='relic_pic_nav'>
                        <img
                            className={`arrow next ${currentImageIndex === placeholderImages.length - 1 ? 'disabled' : ''}`}
                            onClick={handleNextImage}
                            src={currentImageIndex === placeholderImages.length - 1 ? "/icons/next_arrow_relic_d.svg" : "/icons/next_arrow_relic.svg"}
                            alt="Next"
                        />
                    </div>

                    <div className='relic_pic_nav_resp hidden'>
                        <div>
                            <img
                                src={currentImageIndex === 0 ? "/icons/prev_arrow_relic.svg" : "/icons/prev_arrow_relic_d.svg"}
                                className={`arrow prev ${currentImageIndex === 0 ? 'disabled' : ''}`}
                                onClick={handlePrevImage}
                                alt="Previous"
                            />
                        </div>
                        <div className={`arrow next ${currentImageIndex === placeholderImages.length - 1 ? 'disabled' : ''}`}
                            onClick={handleNextImage}>
                            <img
                                src={currentImageIndex === placeholderImages.length - 1 ? "/icons/next_arrow_relic_d.svg" : "/icons/next_arrow_relic.svg"}
                                alt="Next"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relic;