import React, { useEffect, useState } from 'react';
import './relic.css';
import { useNavigate, useParams } from 'react-router-dom';
import RelicAPI from '../../app/api/Relic/relic';
import {
    infiniteQueryOptions,
    useMutation,
    useQuery,
} from '@tanstack/react-query';
// import { unzipFile } from '../../../src/lib/utils';
import { set } from 'zod';
import { unzipSync} from 'fflate';
import { Buffer } from 'buffer';
import { imageProcessing } from '../../../src/lib/imageFunc';
import ProtectedItems from '../ProtectedItems';
import { RoleEnum } from '../../../src/enums/roles';
import { Button } from '../ui/button';
import { Toaster, toast } from 'sonner';
import { ConfirmButton } from '../ConfirmButton';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
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
    appraisedValue: string;
    insuranceValue: string;
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

interface categoryDTOs {
    id: number;
    name: string;
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
    categoryDTOs: categoryDTOs[];
}

const Relic = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const relicId = Number(params.relicsid);

    const [imageNames, setImageNames] = useState<string[]>([]);

    //   const [isLoading, setIsLoading] = useState(false);
    //    const [images, setImages] = useState<any[]>([]);
    //    const relicId = Number(params.relicsid);

    const getImages = useQuery({
        queryKey: ['relicImages', relicId],
        queryFn: () => RelicAPI.getRelicFiles(relicId),
        // staleTime: Infinity,
        // retry: false,
    });

    const getRelic = useQuery({
        queryKey: ['relic', relicId],
        queryFn: () => RelicAPI.fetchDetails(relicId),
    });

    const item = getRelic.data;

    const goBack = () => {
        navigate(-1);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            //   Math.min(prevIndex + 1, item?.imageUrl.length - 1 || 0)
            Math.min(prevIndex + 1, imageNames.length - 1)
        );
    };

    function renderFieldValue(value: any) {
        const statusVocabulary: { [key: string]: string } = {
            UNKNOWN: 'Невідомо',
            DESTROYED: 'Знищено',
            RETURNED: 'Повернуто',
            STOLEN: 'Викрадено',
            NONE: ' - ',
        };

        if (value === null || value === undefined) {
            return '-';
        } else if (statusVocabulary[value]) {
            return statusVocabulary[value];
        } else {
            return value;
        }
    }

    useEffect(() => {
        if (getImages.isSuccess) {
            // imageProcessing({ setImages, data: getImages.data });
            const reader = new FileReader();
            reader.onload = function (e) {
                const arrayBuffer = new Uint8Array(
                    reader.result as ArrayBuffer
                );
                const imagesArray = unzipSync(arrayBuffer);
                let keys: any[] = [];
                for (const key in imagesArray) {
                    keys.push(key);
                    const newImage = Buffer.from(imagesArray[key]).toString(
                        'base64'
                    );

                    setImages((prevImages) => [...prevImages, newImage]);
                }
                setImageNames(keys);
            };
            reader.onerror = function (e) {
                console.error('Error reading file:', e?.target?.error);
            };
            reader.readAsArrayBuffer(getImages.data);
        }
    }, [getImages.data]);

    const deleteRelicFile = useMutation({
        mutationKey: ['deleteRelicFile'],
        mutationFn: (relicId: any) => RelicAPI.deleteRelicFile(relicId),
        // onMutate: () => {
        //     setIsLoading(true);
        // },
        onSuccess: () => {
            toast.success('Файл реліквії успішно видалено');
            // setIsLoading(false);
        },
        onError: (error) => {
            toast.error('Помилка видалення файлу реліквії');
            // setIsLoading(false);
            console.error(error);
        },
    });

    const deleteRelic = useMutation({
        mutationKey: ['deleteRelic', relicId],
        mutationFn: () => RelicAPI.deleteRelic(relicId),
        onMutate: () => {
            deleteRelicFile.mutate(relicId);
            // setIsLoading(true);
        },
        onSuccess: () => {
            toast.success('Реліквію успішно видалено');
            navigate('/catalogue?page=1');
        },
        onError: (error) => {
            toast.error('Помилка видалення реліквії');
            // setIsLoading(false);
            console.error(error);
        },
    });

    const handleDeleteRelic = () => {
        deleteRelic.mutate();
    };

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
                    {item?.categoryDTOs?.length === 0
                        ? renderFieldValue(null)
                        : item?.categoryDTOs
                              .map((category: categoryDTOs) => category.name)
                              .join(', ')}
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
                    <p>
                        {renderFieldValue(item?.relicInfoDTO?.insuranceValue)}
                    </p>
                </div>
                <div>
                    <h6>Оціночна вартість:</h6>
                    <p>
                        {renderFieldValue(item?.relicInfoDTO?.appraisedValue)}
                    </p>
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
            <div className="relic_right flex flex-col">
                <ProtectedItems
                    role={[
                        RoleEnum.ADMIN,
                        RoleEnum.REGIONAL_MODERATOR,
                        RoleEnum.MODERATOR,
                    ]}
                >
                    <div className="relic-control-buttons flex flex-row space-between space-x-5 basis-1/6">
                        <Button
                        // onClick={}
                        >
                            Редагувати
                        </Button>
                        {/* Видалити */}
                        {/* <ConfirmButton
                            dialogAction={() => handleDeleteRelic()}
                            dialogTitle="Видалити реліквію"
                            dialogDescription="Ви дійсно хочете видалити реліквію?"
                            buttonVariant="destructive"
                            buttonMessage="Видалити"
                        /> */}
                        <div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant={'destructive'}
                                        type="submit"
                                        className="logout_btn"
                                    >
                                        {'Видалити'}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Видалити реліквію
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Ви дійсно хочете видалити реліквію?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Відхилити
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDeleteRelic()}
                                            className="text-white hover:bg-red-500 "
                                        >
                                            Прийняти
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </ProtectedItems>
                <div className="relic_carousel mt-5 basis-5/6">
                    <div className="relic_pic_nav">
                        <ChevronLeftIcon
                            className={`arrow prev ${currentImageIndex === 0 ? 'relic_disabled' : ''}`}
                            onClick={handlePrevImage}
                            size={65}
                        />
                    </div>
                    <div className="relic_img_con">
                        {getImages.isLoading && <p>Loading ...</p>}
                        {getImages.isError && <p>{String(getImages.error)}</p>}
                        {images.length > 0 && (
                            <img
                                src={`data:image/png;base64, ${images[currentImageIndex]}`}
                                alt={`Relic Image ${currentImageIndex + 1}`}
                            />
                        )}
                    </div>

                    <div className="relic_pic_nav">
                        <ChevronRightIcon
                            className={`arrow next ${currentImageIndex === imageNames.length - 1 ? 'relic_disabled' : ''}`}
                            onClick={handleNextImage}
                            size={65}
                        />
                    </div>

                    <div className="relic_pic_nav_resp hidden">
                        <ChevronLeftIcon
                            className={`arrow prev ${currentImageIndex === 0 ? 'relic_disabled' : ''}`}
                            onClick={handlePrevImage}
                            size={65}
                        />
                        <ChevronRightIcon
                            className={`arrow next ${currentImageIndex === imageNames.length - 1 ? 'relic_disabled' : ''}`}
                            onClick={handleNextImage}
                            size={65}
                        />
                    </div>
                </div>
            </div>
            <Toaster richColors />;
        </div>
    );
};

export default Relic;
