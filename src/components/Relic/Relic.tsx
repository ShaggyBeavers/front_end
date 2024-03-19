import React, { useEffect, useState } from 'react';
import './relic.css';
import { useNavigate } from 'react-router-dom';
import RelicAPI from '../../app/api/Relic/relic';

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
    const navigate = useNavigate();
    const [item, setItem] = useState<Relic | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await RelicAPI.fetchDetails(relicId);
                console.log('Request Details:', response.config);
                setItem(response.data);
                console.log(item);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        fetchItemDetails();
    }, [relicId]);

    const goBack = () => {
        navigate(-1);
    };
    const placeholderImages = [
        '/assets/images/dima_tall.png',
        '/assets/images/dima_wide.jpg',
    ];
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            //   Math.min(prevIndex + 1, item?.imageUrl.length - 1 || 0)
            Math.min(prevIndex + 1, placeholderImages.length - 1)
        );
    };

    function renderFieldValue(value: any) {
        return value !== null && value !== undefined ? value : '-';
    }

    return (
        <div className="relic_con">
            <div className="relic_left">
                <div className="prev_relic" onClick={goBack}>
                    <img
                        src="/icons/prev_page_relic.svg"
                        alt=""
                        style={{ height: 14 }}
                    />
                    <p>Повернутись</p>
                </div>
                <h3>
                    Мозаїчне зображення Димитрія Солунського з Михайлівського
                    Золотоверхого собору
                </h3>
                {/* <h3>{renderFieldValue(item?.name)}</h3> */}
                <div>
                    <h6>Категорія:</h6>
                    <p>Мозаїка</p>
                    {/* waiting for back */}
                </div>
                <div className="relic_col">
                    <h6>Колекція:</h6>
                    <a style={{ cursor: 'unset' }}>
                        Якась гіпер довга назва аби Макс глянув чи вона працює
                    </a>
                    {/* <a style={{ cursor: 'unset' }}> {renderFieldValue(item?.collection)}</a> */}
                </div>
                <div>
                    <h6>Автор:</h6>
                    <p>Beaver Beaverovich</p>
                    {/* waiting for back */}
                </div>
                <div>
                    <h6>Опис:</h6>
                    <p>
                        Михайлівський собор, збудований у 1108-1113 роках, був
                        зруйнований у 1937 році. Мозаїки та фрески з собору були
                        виставлені в Державному українському музеї в Києві.
                        Після розстрілу директора музею частину творів вивезли
                        до Софійського собору та Москви. Незважаючи на
                        реконструкцію, ключові твори мистецтва так і не були
                        повернуті до Києва і залишаються в Третьяковській
                        галереї в Москві.
                    </p>
                    {/* <p>{renderFieldValue(item?.comment)}</p> */}
                </div>
                <div>
                    <h6>Дата створення:</h6>
                    <p>70-роки якоїсь там доби</p>
                    {/* <p>{renderFieldValue(item?.creationDate)}</p> */}
                </div>
                <div>
                    <h6>Кількість:</h6>
                    <p>1</p>
                    {/* <p> {renderFieldValue(item?.quantity)}</p> */}
                </div>
                <div>
                    <h6>Історичне місце знаходження:</h6>
                    <p>Михайлівський Золотоверхий монастир, Київ, Україна</p>
                    {/* <p>{renderFieldValue(item?.creationPlaceName)}</p> */}
                </div>
                <div>
                    <h6>Статус:</h6>
                    <p>Викрадено</p>
                    {/* <p>{renderFieldValue(item?.status)}</p> */}
                </div>

                <div className="relic_divider" />

                <h4>Вторинна інформація</h4>
                {/* waiting for back */}

                <div>
                    <h6>Первинний інвентарний номер:</h6>
                    <p>73820239480932</p>
                </div>
                <div>
                    <h6>Інвентарний номер:</h6>
                    <p>32718</p>
                </div>
                <div>
                    <h6>Дата створення копії:</h6>
                    <p>-</p>
                </div>
                <div>
                    <h6>Інформація про копію:</h6>
                    <p>Не існує</p>
                </div>
                <div>
                    <h6>Страхова вартість:</h6>
                    <p>3 бублика</p>
                </div>
                <div>
                    <h6>Оціночна вартість:</h6>
                    <p>3 бублика і булочка</p>
                </div>

                <div className="relic_divider" />

                <h4>Третинна інформація</h4>

                <div>
                    <h6>Розміри:</h6>
                    <p>61/62/64</p>
                    {/* <p>{renderFieldValue(item?.relicInfoDTO.dimensions)}</p> */}
                </div>
                <div>
                    <h6>Позначки:</h6>
                    <p>-</p>
                    {/* <p>{renderFieldValue(item?.relicInfoDTO.marks)}</p> */}
                </div>
                <div>
                    <h6>Підписи:</h6>
                    <p>-</p>
                    {/* <p>{renderFieldValue(item?.relicInfoDTO.signatures)}</p> */}
                </div>
                <div>
                    <h6>Бірка:</h6>
                    <p>Кльова</p>
                    {/* <p>{renderFieldValue(item?.relicInfoDTO.labels)}</p> */}
                </div>
                <div>
                    <h6>Реставрація:</h6>
                    <p>-</p>
                   {/* <p>{renderFieldValue(item?.relicInfoDTO.restoration)}</p> */}
                </div>
                <div>
                    <h6>Анотація:</h6>
                    <p>-</p>
                   {/* <p>{renderFieldValue(item?.relicInfoDTO.annotation)}</p> */}
                </div>

                <div className="relic_divider" />

                <h4>Інформація про загублення</h4>

                <div>
                    <h6>Шлях втрати:</h6>
                    <p>-</p>
                    {/* <p>{renderFieldValue(item?.lostRelicInfoDTO.lossWay)}</p> */}
                </div>
                <div>
                    <h6>Дата втрати:</h6>
                    <p>23.01.19</p>
                    {/* <p>{renderFieldValue(item?.lostRelicInfoDTO.lossTime)}</p> */}
                </div>
                <div>
                    <h6>Можливе місцезнаходження:</h6>
                    <p>-</p>
                    {/* <p>{renderFieldValue(item?.lostRelicInfoDTO.probableLocation)}</p> */}
                </div>

                <div className="relic_divider" />

                <h4>Інформація про повернення</h4>

                <div>
                    <h6>Джерело інформації про повернення:</h6>
                    <p>Новини</p>
                   {/* <p>{renderFieldValue(item?.recoveredRelicInfoDTO.locationSource)}</p> */}
                </div>
                <div>
                    <h6>Попереднє джерело про пошук:</h6>
                    <p>-</p>
                     {/* <p>{renderFieldValue(item?.recoveredRelicInfoDTO.previousSearchInfo)}</p> */}
                </div>
                <div>
                    <h6>Процес повернення:</h6>
                    <p>Розпочато</p>
                    {/* <p>{renderFieldValue(item?.recoveredRelicInfoDTO.returnProcess)}</p> */}
                </div>
                <div>
                    <h6>Судовий процес:</h6>
                    <p>Розпочато</p>
                    {/* <p>{renderFieldValue(item?.recoveredRelicInfoDTO.courtDecision)}</p> */}
                </div>
            </div>
            <div className="relic_right">
                <div className="relic_carousel">
                    <div className="relic_pic_nav">
                        <img
                            src={
                                currentImageIndex === 0
                                    ? '/icons/prev_arrow_relic.svg'
                                    : '/icons/prev_arrow_relic_d.svg'
                            }
                            className={`arrow prev ${currentImageIndex === 0 ? 'relic_disabled' : ''}`}
                            onClick={handlePrevImage}
                            alt="Previous"
                        />
                    </div>
                    <div className="relic_img_con">
                        <img
                            src={placeholderImages[currentImageIndex]}
                            // src={item.imageUrl[currentImageIndex]}
                            alt={`Relic Image ${currentImageIndex + 1}`}
                            // src='/vert.jpg'
                        />
                    </div>

                    <div className="relic_pic_nav">
                        <img
                            className={`arrow next ${currentImageIndex === placeholderImages.length - 1 ? 'relic_disabled' : ''}`}
                            onClick={handleNextImage}
                            src={
                                currentImageIndex ===
                                placeholderImages.length - 1
                                    ? '/icons/next_arrow_relic_d.svg'
                                    : '/icons/next_arrow_relic.svg'
                            }
                            alt="Next"
                        />
                    </div>

                    <div className="relic_pic_nav_resp hidden">
                        <div>
                            <img
                                src={
                                    currentImageIndex === 0
                                        ? '/icons/prev_arrow_relic.svg'
                                        : '/icons/prev_arrow_relic_d.svg'
                                }
                                className={`arrow prev ${currentImageIndex === 0 ? 'relic_disabled' : ''}`}
                                onClick={handlePrevImage}
                                alt="Previous"
                            />
                        </div>
                        <div
                            className={`arrow next ${currentImageIndex === placeholderImages.length - 1 ? 'relic_disabled' : ''}`}
                            onClick={handleNextImage}
                        >
                            <img
                                src={
                                    currentImageIndex ===
                                    placeholderImages.length - 1
                                        ? '/icons/next_arrow_relic_d.svg'
                                        : '/icons/next_arrow_relic.svg'
                                }
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
