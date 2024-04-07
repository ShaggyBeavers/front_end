import './index.css';
import { useState } from 'react';
import { Input } from 'src/components/ui/input';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

import ReactSelect from 'react-select';

import { Textarea } from '../ui/textarea';
import { Form } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
    Command,
    CommandInput,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from '../ui/command';
import { Separator } from '../ui/separator';
import {
    Dropzone,
    FileMosaic,
    ExtFile,
    FullScreen,
    ImagePreview,
} from '@dropzone-ui/react';
import { Badge } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import CategoriesAPI from '../../app/api/Category/category';
import RegionAPI from '../../app/api/Region/region';
import { useAtom } from 'jotai';
import { filesAtom, selectedPropertiesAtom } from '../../stores/atoms';
import HistoricalPeriodAPI from '../../../src/app/api/HistoricalPeriod/historicalPeriod';
import MuseumAPI from '../../../src/app/api/Museum/museum';
import PropertyAPI from '../../../src/app/api/Property/property';
import { convertTermToOptions } from '../../lib/utils';
import TechniqueAPI from '../../../src/app/api/Technique/technique';

interface Museum {
    id: number;
    name: string;
    nameOld?: string;
    isDestroyed: boolean;
}

const AddMainRelic = ({ form }: any) => {
    const categories = useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => await CategoriesAPI.getCategories(),
    });
    const regions = useQuery({
        queryKey: ['getRegions'],
        queryFn: async () => await RegionAPI.getRegions(),
    });
    const historicalPeriods = useQuery({
        queryKey: ['getHistoricalPeriods'],
        queryFn: async () => await HistoricalPeriodAPI.getHistoricalPeriods(),
    });
    const museums = useQuery({
        queryKey: ['getMuseums'],
        queryFn: async () => await MuseumAPI.getMuseums(),
    });
    const properties = useQuery({
        queryKey: ['getProperties'],
        queryFn: async () => await PropertyAPI.getProperties(),
    });
    const technique = useQuery({
        queryKey: ['getTechniques'],
        queryFn: async () => await TechniqueAPI.getTechniques(),
    });

    let categoriesOptions: any[] = [];
    if (categories.isFetched)
        categoriesOptions = convertTermToOptions(categories.data || []);

    let museumOptions: any[] = [];
    if (museums.isFetched)
        museumOptions = convertTermToOptions(museums.data || []);

    let historicalPeriodOptions: any[] = [];
    if (historicalPeriods.isFetched)
        historicalPeriodOptions = convertTermToOptions(
            historicalPeriods.data || []
        );

    let propertiesOptions: any[] = [];
    if (properties.isFetched)
        propertiesOptions = convertTermToOptions(properties.data || []);

    let regionOptions: any[] = [];
    if (regions.isFetched)
        regionOptions = convertTermToOptions(regions.data || []);

    let techniqueOptions: any[] = [];
    if (technique.isFetched)
        techniqueOptions = convertTermToOptions(technique.data || []);

    const [files, setFiles] = useAtom(filesAtom);
    const [imgSrc, setImgSrc] = useState<any>(undefined);
    const [selectedProperties, setSelectedProperties] = useAtom(
        selectedPropertiesAtom
    );

    const handleSeeImage = (imageSource: any) => {
        setImgSrc(imageSource);
    };

    const updateFile = (newFile: any) => {
        setFiles(newFile);
    };
    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

    if (
        categories.isError ||
        regions.isError ||
        historicalPeriods.isError ||
        museums.isError
    ) {
        return <p>Помилка завантаження категорій</p>;
    }

    if (
        categories.isLoading ||
        regions.isLoading ||
        historicalPeriods.isLoading ||
        museums.isLoading ||
        properties.isLoading ||
        technique.isLoading
    ) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2 className="text-4xl">Основна інформація про реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                {/* First column */}
                <div className="grid grid-rows-7 gap-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Назва</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ім'я реліквії"
                                        {...field}
                                        // required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="relicCategoryIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="relicCategoryIds">
                                    Категорії
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    isMulti
                                    id="relicCategoryIds"
                                    className="select"
                                    options={categoriesOptions}
                                    closeMenuOnSelect={false}
                                    placeholder={'Виберіть категорію'}
                                    onChange={(options) =>
                                        field.onChange(
                                            options
                                                ? options.map(
                                                      (option) => option.value
                                                  )
                                                : []
                                        )
                                    }
                                    onBlur={field.onBlur}
                                    value={categoriesOptions.filter(
                                        (category) =>
                                            field.value?.includes(
                                                category.value
                                            )
                                    )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="author">Автор</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ім'я автора"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="creationDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="creationDate">
                                    Дата створення
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        // type="date"
                                        placeholder="Дата створення"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="historicalPeriodId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="historicalPeriodId">
                                    Історичний період
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="historicalPeriodId"
                                    className="select"
                                    options={historicalPeriodOptions}
                                    placeholder={'Виберіть історичний період'}
                                    onBlur={field.onBlur}
                                    value={historicalPeriodOptions.filter(
                                        (category) =>
                                            field.value?.value ===
                                            category.value
                                    )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="quantity">
                                    Кількість
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Введіть кількість"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Статус */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="status">Статус</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            <SelectValue placeholder="Оберіть статус реліквії" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DESTROYED">
                                            Знищено
                                        </SelectItem>
                                        <SelectItem value="STOLEN">
                                            Вкрадено
                                        </SelectItem>
                                        <SelectItem value="RETURNED">
                                            Повернено
                                        </SelectItem>
                                        <SelectItem value="UNKNOWN">
                                            Невідомо
                                        </SelectItem>
                                    </SelectContent>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                {/* Second Column */}
                <div className="grid grid-rows-7 gap-5">
                    <FormField
                        control={form.control}
                        name="regionId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="regionId">Регіон</FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="regionId"
                                    className="select"
                                    options={regionOptions}
                                    // closeMenuOnSelect={false}
                                    placeholder={'Виберіть регіон'}
                                    // onChange={(options) =>
                                    //     field.onChange(
                                    //         options
                                    //             ? options.map(
                                    //                   (option) => option.value
                                    //               )
                                    //             : []
                                    //     )
                                    // }
                                    onBlur={field.onBlur}
                                    // value={regionOptions.filter((category) =>
                                    //     field.value?.includes(category.value)
                                    // )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="creationPlaceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="creationPlaceId">
                                    Місце створення
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="creationPlaceId"
                                    className="select"
                                    options={regionOptions}
                                    // closeMenuOnSelect={false}
                                    placeholder={'Виберіть регіон'}
                                    // onChange={(options) =>
                                    //     field.onChange(
                                    //         options
                                    //             ? options.map(
                                    //                   (option) => option.value
                                    //               )
                                    //             : []
                                    //     )
                                    // }
                                    onBlur={field.onBlur}
                                    // value={regionOptions.filter((category) =>
                                    //     field.value?.includes(category.value)
                                    // )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="collection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="collection">
                                    Колекція
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Введіть колекцію"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="techniqueId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="techniqueId">
                                    Техніка Створення
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    id="techniqueId"
                                    className="select"
                                    options={techniqueOptions}
                                    placeholder={'Виберіть техніку'}
                                    // onChange={(option, actionMeta) => {
                                    //     console.log(
                                    //         'technique',
                                    //         option,
                                    //         actionMeta
                                    //     );
                                    //     if (
                                    //         actionMeta.action ===
                                    //             'remove-value' ||
                                    //         actionMeta.action === 'clear' ||
                                    //         actionMeta.action === 'pop-value' ||
                                    //         actionMeta.action ===
                                    //             'deselect-option'
                                    //     ) {
                                    //         form.resetField(
                                    //             actionMeta.removedValue.value
                                    //         );
                                    //     }
                                    //     field.onChange(option.value);
                                    //     (selectedOption, actionMeta) => {
                                    //     if (
                                    //         actionMeta.action === 'remove-value'
                                    //     ) {
                                    //         form.resetField(
                                    //             actionMeta.removedValue.value
                                    //         );
                                    //     }
                                    //     field.onChange(selectedOption.value);
                                    // }
                                    // }}
                                    onBlur={field.onBlur}
                                    // value={regionOptions.find(
                                    //     (category) =>
                                    //         field.value === category.value
                                    // )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <div className="row-span-"> */}

                    {/* <FormField
                        control={form.control}
                        name="historicalPeriod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="historicalPeriod">
                                    Історичний період
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Введіть історичний період"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    {/* Museum */}
                    <FormField
                        control={form.control}
                        name="museumId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="museumId">Музей</FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="museumId"
                                    className="select"
                                    options={museumOptions}
                                    getOptionLabel={(option) =>
                                        `
                                        ${
                                            museums.data.find(
                                                (museum: Museum) =>
                                                    museum.id === option.value
                                            )?.name
                                        } :
                                        ${
                                            museums.data.find(
                                                (museum: Museum) =>
                                                    museum.id === option.value
                                            )?.nameOld
                                        }`
                                    }
                                    placeholder={'Виберіть музей'}
                                    onBlur={field.onBlur}
                                    value={museumOptions.filter(
                                        (category) =>
                                            field.value?.value ===
                                            category.value
                                    )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Description */}
                    <div className="row-span-2">
                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="comment">
                                        Опис
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Введіть опис реліквії"
                                            id="comment"
                                            {...field}
                                            className="min-h-[6.25rem] max-h-[8.25rem]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* ADDITIONAL PROPS */}
            </div>
            <h4>Додаткові Характеристики</h4>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-1 gap-5 self-start">
                    <FormField
                        control={form.control}
                        name="property"
                        render={({ field }) => (
                            <ReactSelect
                                {...field}
                                isMulti
                                id="property"
                                className="select"
                                options={propertiesOptions}
                                closeMenuOnSelect={false}
                                placeholder={'Оберіть додаткові характеристики'}
                                noOptionsMessage={() =>
                                    'Жодної характеристики не знайдено'
                                }
                                onChange={(options) => {
                                    // field.onChange(
                                    //     options
                                    //         ? options.map(
                                    //               (option) => option.value
                                    //           )
                                    //         : []
                                    // );
                                    field.onChange(options);

                                    setSelectedProperties(
                                        options
                                            ? options.map((option) => ({
                                                  value: option.value,
                                                  label: option.label,
                                              }))
                                            : []
                                    );
                                }}
                                onBlur={field.onBlur}
                                // value={propertiesOptions.filter((properties) =>
                                //     field.value?.includes(properties.value)
                                // )}
                                menuPortalTarget={document.body}
                                styles={{
                                    placeholder: (base) => ({
                                        ...base,
                                        fontSize: '0.9rem',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 180,
                                        overflow: 'hidden',
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    border: 'none',
                                    borderRadius: 20,
                                    fontSize: 10,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'rgba(0, 0, 0, 0.1)',
                                        primary: '#1C1C1C',
                                    },
                                })}
                            />
                        )}
                    />
                    <div>
                        {selectedProperties
                            // .filter((option) =>
                            //     selectedProperties.includes(option.value)
                            // )
                            .map((option: any) => (
                                <FormField
                                    control={form.control}
                                    name={option.label}
                                    key={option.value}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor={option.label}>
                                                {option.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            ))}
                    </div>
                </div>
                <div className="grid grid-rows-1 gap-5">
                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <Dropzone
                                            {...field}
                                            onChange={(files) => {
                                                field.onChange(files);
                                                updateFile(files);
                                            }}
                                            maxFileSize={10 * 1024 * 1024}
                                            maxFiles={10}
                                            accept="image/*"
                                            value={files}
                                            header={false}
                                            style={{
                                                // height: 'auto',
                                                // height: '50px',
                                                border: '1px solid #e4e4e7',
                                                // maxHeight: '50px',
                                            }}
                                            label={
                                                'Перетягніть фото сюди або клікніть, щоб вибрати'
                                            }
                                            background=""
                                            // headerConfig={{
                                            //     customHeader: (
                                            //         <></>
                                            //         // <p className="flex justify-end p-4 text-muted-foreground">
                                            //         //     Макс. розмір файлу: 50Mб,
                                            //         //     Файлів: 3{' '}
                                            //         // </p>
                                            //     ),
                                            // }}
                                            footerConfig={{
                                                customMessage: (
                                                    <>
                                                        Макс. розмір файлу: 10Mб,
                                                        Файлів: 10
                                                    </>
                                                ),
                                            }}
                                            clickable
                                        >
                                            {files.map((file: ExtFile) => (
                                                <FileMosaic
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
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <Separator className="my-6 border-zinc-200 border-2" />
        </>
    );
};

export default AddMainRelic;
