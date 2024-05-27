import {
    SubmitHandler,
    useForm,
    FieldValues,
    useController,
} from 'react-hook-form';
import './report.css';
import { useEffect, useState } from 'react';
import DropZone from '../DropZone/dropzone';
import ReportAPI from '../../app/api/Report/report';
import ReactSelect from 'react-select';
import { reportData } from '../../app/api/Report/report';
import RegionAPI from '../../app/api/Region/region';
import CategoryAPI from '../../app/api/Category/category';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
    Dropzone,
    FileMosaic,
    ExtFile,
    FullScreen,
    ImagePreview,
} from '@dropzone-ui/react';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useAtom } from 'jotai';
import { filesAtom, selectedPropertiesAtom } from '../../stores/atoms';
import { useMutation } from '@tanstack/react-query';

export default function Report() {
    const { register, handleSubmit, formState, reset, setValue, control } =
        useForm<reportData>();
    const { errors } = formState;
    const [remainingChars, setRemainingChars] = useState(3);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<
        { value: string; id: number }[]
    >([]);
    const [selectedRegion, setSelectedRegion] = useState<{
        value: string;
        id: number;
    } | null>(null);
    const [regions, setRegions] = useState<{ value: string; id: number }[]>([]);
    const [categories, setCategories] = useState<
        { value: string; id: number }[]
    >([]);
    const navigate = useNavigate();
    const [files, setFiles] = useAtom(filesAtom);


    const addReport = useMutation({
        mutationFn: ReportAPI.createReport,
        onSuccess: (data) => {
            console.log(
                'Report added. Now we can start adding photos to: ',
                data
            );
        },
        onError: (error) => {
            console.log(error);
            toast.error('Помилка при додаванні репорту');
        },
    });

    const uploadReportFile = useMutation({
        mutationFn: async ({ reportId, file }: { reportId: number; file: any }) =>
            await ReportAPI.uploadFiles(reportId, file),
        onSuccess: () => {
            console.log('File uploaded');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Помилка при завантаженні файлу');
        },
    });

    const submitForm: SubmitHandler<reportData> = async (data) => {
        try {
            const { image, ...restData } = data;
            const formData = {
                ...restData,
                categoryIds: selectedCategories.map((category) => category.id),
                regionId: selectedRegion ? selectedRegion.id : null,
            };

            const fileData = new FormData();
            files.forEach((file) => {
                if (file?.file) {
                    fileData.append('file', file.file);
                }
            });

            console.log('REPORT FILE',fileData)

            addReport
                .mutateAsync(formData)
                .then((data: any) => {
                    console.log(data.data)
                    uploadReportFile.mutate({
                        reportId: data.data,
                        file: fileData,
                    });
                })
                .catch((error: any) => {
                    console.log(error);
                });

            reset();
            setSelectedCategories([]);
            setSelectedRegion(null);
            setFiles([]);
            toast.success('Звістку успішно надіслано!');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error: any) {
            if (error) {
                console.log(error);
                reset();
                setSelectedCategories([]);
                setSelectedRegion(null);
                setFiles([]);
            }
        }
    };

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await RegionAPI.getRegions();
                if (response) {
                    const regionsData = response.map(
                        (region: { id: number; name: string }) => ({
                            value: region.name,
                            id: region.id,
                        })
                    );
                    setRegions(regionsData);
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await CategoryAPI.getCategories();
                if (response) {
                    const categoriesData = response.map(
                        (category: { id: number; name: string }) => ({
                            value: category.name,
                            id: category.id,
                        })
                    );
                    setCategories(categoriesData);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchRegions();
        fetchCategories();
    }, []);

    const [imgSrc, setImgSrc] = useState<any>(undefined);
    const { field } = useController({
        name: 'image',
        control,
    });

    const handleSeeImage = (imageSource: any) => {
        setImgSrc(imageSource);
    };

    const updateFile = (newFile: any) => {
        setFiles(newFile);
    };
    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

    return (
        <div className="report">
            <div className="report_con">
                <div className="report_form">
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
                        <div className="report_group">
                            <h3>Звістка</h3>
                            <p style={{ textAlign: 'right' }}>
                                Поділіться відомою вам інформацією про
                                загублену/викрадену реліквію
                            </p>
                        </div>
                        <div className="report_group">
                            <div
                                className={`report_input ${errors.name ? 'error' : ''}`}
                                style={{ width: '45%' }}
                            >
                                <label htmlFor="name">Назва:</label>
                                <input
                                    type="text"
                                    placeholder="Введіть назву артефакту"
                                    {...register('name', {
                                        required: 'Заповніть це поле',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Мінімальна довжина - 2 символи',
                                        },
                                    })}
                                />
                                <p>{errors.name?.message as string}</p>
                            </div>

                            <div
                                className="report_input"
                                style={{ width: '51%' }}
                            >
                                <label htmlFor="name">
                                    Категорії:<p>(опційно)</p>
                                </label>
                                <ReactSelect
                                    options={categories.map((category) => ({
                                        value: category.id.toString(),
                                        label: category.value,
                                    }))}
                                    value={selectedCategories.map(
                                        (category) => ({
                                            value: category.id.toString(),
                                            label: category.value,
                                        })
                                    )}
                                    onChange={(selectedOptions) => {
                                        const selectedValues = selectedOptions
                                            ? selectedOptions.map((option) => ({
                                                  value: option.label,
                                                  id: parseInt(option.value),
                                              }))
                                            : [];
                                        setSelectedCategories(selectedValues);
                                    }}
                                    isMulti
                                    noOptionsMessage={() =>
                                        'Жодної категорії не знайдено'
                                    }
                                    closeMenuOnSelect={false}
                                    placeholder="Оберіть категорії"
                                    onBlur={() => setIsTyping(false)}
                                    styles={{
                                        placeholder: (base) => ({
                                            ...base,
                                            fontSize: '0.84rem',
                                            color: '#dadada',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            overflowY: 'auto',
                                        }),
                                        control: (base) => ({
                                            ...base,
                                            borderWidth: 2,
                                            boxShadow: 'none',
                                        }),
                                        valueContainer: (provided, state) => ({
                                            ...provided,
                                            maxHeight: '64px',
                                            overflow: 'auto',
                                        }),
                                    }}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 15,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                            neutral20: '#000000',
                                            neutral80: '#000000',
                                            neutral30: '#000000',
                                        },
                                    })}
                                />
                            </div>
                        </div>
                        <div className="report_group">
                            <div
                                className="report_input"
                                style={{ width: '100%' }}
                            >
                                <label htmlFor="description">
                                    Опис:<p>(опційно)</p>
                                </label>
                                <textarea
                                    rows={4}
                                    maxLength={300}
                                    placeholder="Введіть опис до 300 символів"
                                    {...register('description')}
                                    onChange={(e) => {
                                        const inputLength =
                                            e.target.value.length;
                                        const maxLength = 300;
                                        const remainingChars =
                                            maxLength - inputLength;
                                        setRemainingChars(remainingChars);
                                        setIsTyping(true);
                                        setValue('description', e.target.value);
                                    }}
                                    onBlur={() => setIsTyping(false)}
                                />
                                {isTyping && (
                                    <p style={{ fontSize: '11px' }}>
                                        Залишилось символів: {remainingChars}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="report_group drop">
                            <div
                                className="report_input"
                                style={{ width: '53%' }}
                            >
                                <div
                                    className={`report_input optional_v ${errors.mapLocation ? 'error' : ''}`}
                                    style={{ width: '100%' }}
                                >
                                    <label htmlFor="location">
                                        Ймовірне місце розташування:
                                    </label>
                                    <label>
                                        {' '}
                                        <p>(опційно)</p>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Введіть місце розташування"
                                        {...register('mapLocation', {
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Мінімальна довжина - 2 символи',
                                            },
                                        })}
                                    />
                                    <p>
                                        {errors.mapLocation?.message as string}
                                    </p>
                                </div>

                                <div
                                    className={`report_input ${errors.infoReferences ? 'error' : ''}`}
                                    style={{ width: '100%' }}
                                >
                                    <label htmlFor="abduction">
                                        Шляхи втрати:
                                        <p>(опційно)</p>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Введіть місце викрадення"
                                        {...register('infoReferences', {
                                            minLength: {
                                                value: 2,
                                                message:
                                                    'Мінімальна довжина - 2 символи',
                                            },
                                        })}
                                    />
                                    <p>
                                        {
                                            errors.infoReferences
                                                ?.message as string
                                        }
                                    </p>
                                </div>
                            </div>

                            <div
                                className="region_photo"
                                style={{ width: '42%' }}
                            >
                                <div
                                    className="report_input optional_v "
                                    style={{ width: '100%' }}
                                >
                                    <label htmlFor="name">Регіон походження:</label>
                                    <label>
                                        <p>(опційно)</p>
                                    </label>
                                    <ReactSelect
                                        options={regions.map((region) => ({
                                            value: region.id.toString(),
                                            label: region.value,
                                        }))}
                                        isClearable
                                        noOptionsMessage={() =>
                                            'Жодного регіону не знайдено'
                                        }
                                        placeholder="Оберіть регіон"
                                        onChange={(selectedOption) => {
                                            const selectedValue = selectedOption
                                                ? {
                                                      value: selectedOption.label,
                                                      id: parseInt(
                                                          selectedOption.value
                                                      ),
                                                  }
                                                : null;
                                            setSelectedRegion(selectedValue);
                                        }}
                                        onBlur={() => setIsTyping(false)}
                                        value={
                                            selectedRegion
                                                ? {
                                                      value: selectedRegion.id.toString(),
                                                      label: selectedRegion.value,
                                                  }
                                                : null
                                        }
                                        styles={{
                                            placeholder: (base) => ({
                                                ...base,
                                                fontSize: '0.84rem',
                                                color: '#dadada',
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                overflowY: 'auto',
                                            }),
                                            control: (base) => ({
                                                ...base,
                                                borderWidth: 2,
                                                maxHeight: '39.5px',
                                                boxShadow: 'none',
                                            }),
                                            valueContainer: (
                                                provided,
                                                state
                                            ) => ({
                                                ...provided,
                                                fontSize: '0.9rem',
                                                overflow: 'auto',
                                            }),
                                        }}
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 15,
                                            fontSize: 10,
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'rgba(0, 0, 0, 0.1)',
                                                primary: '#1C1C1C',
                                                neutral20: '#000000',
                                                neutral80: '#000000',
                                                neutral30: '#000000',
                                            },
                                        })}
                                    />
                                </div>
                                {/* Image Upload */}
                                <div>
                                    {' '}
                                    <Dropzone
                                        {...field}
                                        onChange={(files) => {
                                            field.onChange(files);
                                            updateFile(files);
                                        }}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={3}
                                        accept="image/*"
                                        value={files}
                                        header={false}
                                        style={{
                                            marginTop: '10px',
                                            border: '1px solid #e4e4e7',
                                        }}
                                        label={
                                            'Перетягніть фото сюди або клікніть, щоб вибрати'
                                        }
                                        background=""
                                        footerConfig={{
                                            customMessage: (
                                                <>Максимум: 10Mб, 3 файли</>
                                            ),
                                        }}
                                        clickable
                                    >
                                        {files.map((file: ExtFile) => (
                                            <FileMosaic
                                                style={{
                                                    height: '85px',
                                                    width: '85px',
                                                    fontSize: '10px',
                                                }}
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                preview
                                                onSee={handleSeeImage}
                                            />
                                        ))}
                                    </Dropzone>
                                    <FullScreen
                                        open={imgSrc !== undefined}
                                        onClose={() => setImgSrc(undefined)}
                                    >
                                        <ImagePreview src={imgSrc} />
                                    </FullScreen>
                                </div>
                            </div>
                        </div>

                        <button type="submit">Опублікувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
