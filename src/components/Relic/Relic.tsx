import React, { useEffect, useState } from 'react';
import './relic.css';
import { useNavigate, useParams } from 'react-router-dom';
import RelicAPI from '../../app/api/Relic/relic';
import { infiniteQueryOptions, useQuery } from '@tanstack/react-query';
// import { unzipFile } from '../../../src/lib/utils';
import { set } from 'zod';
import JSZip from 'jszip';
// import * from 'uzip';
import { gzipSync, decompressSync, unzipSync } from 'fflate';
import { get } from 'http';

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
    author: string;
    creationDate: string;
    creationPlaceName: string;
    imageUrl: string;
    museumName: string;
    regionName: string;
    quantity: number;
    collection: string;
    comment: string;
    status: string;
    inventoryNumber: number;
    formerInventoryNumber: number;
    copyInformation: string;
    copyCreationTime: string;
    relicPropertyDTOs: RelicPropertyDTO[];
    relicInfoDTO: RelicInfoDTO;
    recoveredRelicInfoDTO: RecoveredRelicInfoDTO;
    lostRelicInfoDTO: LostRelicInfoDTO;
}

const unzipFile = async (zipFile: any) => {
    try {
        const new_zip = new JSZip();
        const images: any = await new_zip
            .loadAsync(zipFile)
            .then((zip) => {
                let promises = Object.keys(zip.files).map(async (fileName) => {
                    const file = zip.files[fileName];
                    const data = await file.async('blob');
                    return { name: fileName, data };
                });
                return Promise.all(promises);
            })
            .then((files) => {
                // console.log('files', files);
                return files.reduce((acc, file) => {
                    acc[file.name] = file.data;
                    return acc;
                }, {} as any);
                // return files;
            });
        console.log('images', images);
        return images;
    } catch (error) {
        console.error('Error unzipping file:', error);
        return [];
    }
};

const Relic = () => {
    const navigate = useNavigate();
    const params = useParams();
    // const [item, setItem] = useState<Relic | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [image, setImage] = useState<any>(null);
    const relicId = Number(params.relicsid);

    const getImages = useQuery({
        queryKey: ['relicImages', relicId],
        queryFn: () => RelicAPI.getRelicFiles(relicId),
        staleTime: Infinity,
        retry: false,
    });

    const getRelic = useQuery({
        queryKey: ['relic', relicId],
        queryFn: () => RelicAPI.fetchDetails(relicId),
        staleTime: Infinity,
        retry: false,
    });

    const item = getRelic.data;
    // setItem(getRelic.data);
    // useEffect(() => {
    //     const fetchItemDetails = async () => {
    //         try {
    //             const response = await RelicAPI.fetchDetails(
    //                 Number(params.relicsid)
    //             );
    //             console.log('Request Details:', response);
    //             setItem(response);
    //         } catch (error) {
    //             console.error('Error fetching item details:', error);
    //         }
    //     };
    //     fetchItemDetails();
    // }, [params.relicsid]);

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
        const statusVocabulary: { [key: string]: string } = {
            UNKNOWN: 'Невідомо',
            DESTROYED: 'Знищено',
            RETURNED: 'Повернуто',
            STOLEN: 'Викрадено',
        };

        if (value === null || value === undefined) {
            return '-';
        } else if (statusVocabulary[value]) {
            return statusVocabulary[value];
        } else {
            return value;
        }
    }

    if (getImages.isLoading) return <div>Loading...</div>;
    if (getImages.isError) return <>{`Error: ${String(getImages.error)}`}</>;

    if (getImages.isSuccess) {
        console.log('getImages', getImages.data);
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log('target', e?.target?.result);
            console.log('reader', reader.result);
            // const blobData = e?.target?.result;

            const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
            const imagesArray = unzipSync(arrayBuffer);
            console.log('imagesArray', imagesArray);
            let keys: any[] = [];
            let values: any[] = [];
            for (const key in imagesArray) {
                keys.push(key);
                // setImages((prevImages) => [
                //     ...prevImages,
                //     btoa(
                //         String.fromCharCode.apply(
                //             null,
                //             Array.from(new Uint8Array(imagesArray[key]))
                //         )
                //     ),
                // ]);
            }

            // console.log('images', images);
            // const base64String =
            // console.log('base64String', base64String);
            // setImage(base64String);
        };
        reader.onerror = function (e) {
            console.error('Error reading file:', e?.target?.error);
        };
        reader.readAsArrayBuffer(getImages.data);
        // reader.readAsBinaryString(getImages.data);
        // const imagesArray = unzipSync(getImages.data);
        // let arrayBuffer = unzipSync(new Uint8Array(getImages.data));
        // console.log(JSON.parse(String.fromCharCode.apply(arrayBuffer)));
    }

    // console.log('imagesArray', imagesArray);

    // setImages(imagesArray.);

    // useEffect(() => {
    //     const extractImages = async () => {
    //         setIsLoading(true);
    //         try {
    //             const imageZip = await getImages.data;
    //             const extractedImages = await unzipFile(imageZip);
    //             setImages(Object.values(extractedImages));
    //             console.log('Extract images', images);
    //         } catch (error) {
    //             console.error('Error extracting images:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     if (getImages.isSuccess) {
    //         extractImages();
    //     }
    // }, [getImages.data]);

    // const imageZip = getImages.data;

    // const imagesArray =  unzipFile(getImages.data);

    // console.log('imagesArray', imagesArray);
    // const extImages = async () => {
    //     const imagesArray = await unzipFile(getImages.data);
    //     setImages(imagesArray);
    // };
    // extImages();
    // console.log('images', images);
    // setImages();
    // const extractImages = async () => {
    //     const imagesArray = await unzipFile(imageZip);
    //     setImages(imagesArray);
    // };
    // extractImages();

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
                <h3>{renderFieldValue(item?.name)}</h3>
                <div>
                    <h6>Категорія:</h6>
                    <p>Мозаїка</p>
                    {/* waiting for back */}
                </div>
                <div className="relic_col">
                    <h6>Колекція:</h6>
                    <a style={{ cursor: 'unset' }}>
                        {' '}
                        {renderFieldValue(item?.collection)}
                    </a>
                </div>
                <div>
                    <h6>Автор:</h6>
                    <p>{renderFieldValue(item?.author)}</p>
                </div>
                <div>
                    <h6>Опис:</h6>
                    <p>{renderFieldValue(item?.comment)}</p>
                </div>
                <div>
                    <h6>Дата створення:</h6>
                    <p>{renderFieldValue(item?.creationDate)}</p>
                </div>
                <div>
                    <h6>Кількість:</h6>
                    <p> {renderFieldValue(item?.quantity)}</p>
                </div>
                <div>
                    <h6>Історичне місце знаходження:</h6>
                    <p>{renderFieldValue(item?.creationPlaceName)}</p>
                </div>
                <div>
                    <h6>Статус:</h6>
                    <p>{renderFieldValue(item?.status)}</p>
                </div>

                <div className="relic_divider" />

                <h4>Вторинна інформація</h4>
                {/* waiting for back */}

                <div>
                    <h6>Первинний інвентарний номер:</h6>
                    <p>{renderFieldValue(item?.formerInventoryNumber)}</p>
                </div>
                <div>
                    <h6>Інвентарний номер:</h6>
                    <p>{renderFieldValue(item?.inventoryNumber)}</p>
                </div>
                <div>
                    <h6>Дата створення копії:</h6>
                    <p>{renderFieldValue(item?.copyCreationTime)}</p>
                </div>
                <div>
                    <h6>Інформація про копію:</h6>
                    <p>{renderFieldValue(item?.copyInformation)}</p>
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
                    <p>{renderFieldValue(item?.relicInfoDTO?.dimensions)}</p>
                </div>
                <div>
                    <h6>Позначки:</h6>
                    <p>{renderFieldValue(item?.relicInfoDTO?.marks)}</p>
                </div>
                <div>
                    <h6>Підписи:</h6>
                    <p>{renderFieldValue(item?.relicInfoDTO?.signatures)}</p>
                </div>
                <div>
                    <h6>Бірка:</h6>
                    <p>{renderFieldValue(item?.relicInfoDTO?.labels)}</p>
                </div>
                <div>
                    <h6>Реставрація:</h6>
                    <p>{renderFieldValue(item?.relicInfoDTO?.restoration)}</p>
                </div>
                <div>
                    <h6>Анотація:</h6>
                    <p>{renderFieldValue(item?.relicInfoDTO?.annotation)}</p>
                </div>

                <div className="relic_divider" />

                <h4>Інформація про загублення</h4>

                <div>
                    <h6>Шлях втрати:</h6>
                    <p>{renderFieldValue(item?.lostRelicInfoDTO?.lossWay)}</p>
                </div>
                <div>
                    <h6>Дата втрати:</h6>
                    <p>{renderFieldValue(item?.lostRelicInfoDTO?.lossTime)}</p>
                </div>
                <div>
                    <h6>Можливе місцезнаходження:</h6>
                    <p>
                        {renderFieldValue(
                            item?.lostRelicInfoDTO?.probableLocation
                        )}
                    </p>
                </div>

                <div className="relic_divider" />

                <h4>Інформація про повернення</h4>

                <div>
                    <h6>Джерело інформації про повернення:</h6>
                    <p>
                        {renderFieldValue(
                            item?.recoveredRelicInfoDTO?.locationSource
                        )}
                    </p>
                </div>
                <div>
                    <h6>Час повернення:</h6>
                    <p>
                        {renderFieldValue(
                            item?.recoveredRelicInfoDTO?.returnDate
                        )}
                    </p>
                </div>
                <div>
                    <h6>Процес повернення:</h6>
                    <p>
                        {renderFieldValue(
                            item?.recoveredRelicInfoDTO?.returnProcess
                        )}
                    </p>
                </div>
                <div>
                    <h6>Судовий процес:</h6>
                    <p>
                        {renderFieldValue(
                            item?.recoveredRelicInfoDTO?.courtDecision
                        )}
                    </p>
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
                        {isLoading ? (
                            <p>Loading ...</p>
                        ) : (
                            image && (
                                // ) : images.length > 0 ? (
                                <img
                                    // src={images[currentImageIndex]}
                                    // src={`data:image/png;base64, '${image}`}
                                    src={`data:image/png;base64, ${image}`}
                                    // src={item.imageUrl[currentImageIndex]}
                                    alt={`Relic Image ${currentImageIndex + 1}`}
                                    // src='/vert.jpg'
                                />
                            )
                        )}
                        {/* // : (
                        //     <p>No Images found</p>
                        // )} */}
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
