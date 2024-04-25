import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
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

export default function Report() {
    const { register, handleSubmit, formState, reset, setValue } =
        useForm<reportData>();
    const { errors } = formState;
    const [remainingChars, setRemainingChars] = useState(3);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<
        { value: string; id: number }[]
    >([]);
    const [photos, setPhotos] = useState<any[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<{
        value: string;
        id: number;
    } | null>(null);
    const [regions, setRegions] = useState<{ value: string; id: number }[]>([]);
    const [categories, setCategories] = useState<
        { value: string; id: number }[]
    >([]);
    const navigate = useNavigate();

    const submitForm: SubmitHandler<reportData> = async (data) => {
        try {
            const formData = {
                ...data,
                categoryIds: selectedCategories.map((category) => category.id),
                regionId: selectedRegion ? selectedRegion.id : null,
            };
            // console.log(formData);
            await ReportAPI.createReport(formData);
            reset();
            setSelectedCategories([]);
            setSelectedRegion(null);
            toast.success('Ваша звістка успішно надіслана');
            setTimeout(() => {
                navigate('/profile');
            }, 700);
        } catch (error: any) {
            if (error) {
                console.log(error);
                reset();
                setSelectedCategories([]);
                setSelectedRegion(null);
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

    return (
        <div className="report">
            <div className="report_con">
                <div className="report_form">
                    <form onSubmit={handleSubmit(submitForm)} noValidate>
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
                                style={{ width: '60%' }}
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
                                style={{ width: '35%' }}
                            >
                                <div
                                    className="report_input optional_v "
                                    style={{ width: '100%' }}
                                >
                                    <label htmlFor="name">Регіон:</label>
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
                                {/* <DropZone
                                    onFilesChange={setPhotos}
                                    initialFiles={photos}
                                /> */}
                            </div>
                        </div>

                        <button type="submit">Опублікувати</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
