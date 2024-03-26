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
import { optionCSS } from 'react-select/dist/declarations/src/components/Option';
import { useQuery } from '@tanstack/react-query';
import CategoriesAPI from '../../app/api/Category/category';
import RegionAPI from '../../app/api/Region/region';
import { useAtom } from 'jotai';
import { filesAtom, selectedPropertiesAtom } from '../../stores/atoms';
import HistoricalPeriodAPI from '@/src/app/api/HistoricalPeriod/historicalPeriod';
import { convertTermToOptions } from '../../lib/utils';

const AddMainRelic = ({ form }: any) => {
    const categories = useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => await CategoriesAPI.getCategories(),
    });
    const regions = useQuery({
        queryKey: ['getRegions'],
        queryFn: async () => await RegionAPI.getRegions(),
    });

    // const historicalPeriods = useQuery({
    //     queryKey: ['getHistoricalPeriods'],
    //     queryFn: async () => await HistoricalPeriodAPI.getHistoricalPeriods(),
    // });
    // const museums = useQuery({
    //     queryKey: ['getMuseums'],
    //     queryFn: async () => await MuseumAPI.getMuseums(),
    // });

    let categoriesOptions: any[] = [];
    if (categories.isFetched)
        categoriesOptions = convertTermToOptions(categories.data || []);

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

    const properties = [
        { id: 1, label: 'Вага', value: 'weight' },
        { id: 2, label: 'Висота', value: 'height' },
        { id: 3, label: 'Ширина', value: 'width' },
        { id: 4, label: 'Довжина', value: 'length' },
    ];
    const region = [
        { label: 'Київ', value: 'Kyiv' },
        { label: 'Харків', value: 'Kharkiv' },
    ];

    if (categories.isError) {
        return <p>Помилка завантаження категорій</p>;
    }

    if (categories.isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h2 className="text-4xl">Основна інформація про реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                {/* First column */}
                <div className="grid grid-rows-6 gap-5">
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
                        name="categories"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="categories">
                                    Категорії
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    isMulti
                                    id="categories"
                                    className="select"
                                    options={categoriesOptions}
                                    placeholder={'Виберіть категорію'}
                                    onChange={(selectedOptions, actionMeta) => {
                                        if (
                                            actionMeta.action === 'remove-value'
                                        ) {
                                            form.resetField(
                                                actionMeta.removedValue.value
                                            );
                                        }
                                        const selectedValues = selectedOptions
                                            ? selectedOptions.map(
                                                  (option) => option.value
                                              )
                                            : [];
                                        field.onChange(selectedValues);
                                    }}
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
                        name="quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="quantity">
                                    Кількість
                                </FormLabel>
                                <FormControl>
                                    <Input
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
                <div className="grid grid-rows-6 gap-5">
                    <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="region">Регіон</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                    'w-full justify-between'
                                                )}
                                            >
                                                {field.value
                                                    ? region.find(
                                                          (region) =>
                                                              region.value ===
                                                              field.value
                                                      )?.label
                                                    : 'Виберіть регіон'}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="relative min-w-[12rem] w-full"
                                        align="start"
                                    >
                                        <Command>
                                            <CommandInput
                                                className="w-full"
                                                placeholder="Search region..."
                                            />
                                            <CommandEmpty>
                                                Жодного регіону не знайдено
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {region.map((region) => (
                                                    <CommandItem
                                                        value={region.label}
                                                        key={region.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'region',
                                                                region.value
                                                            );
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                '',
                                                                region.value ===
                                                                    field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {region.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
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
                    {/* Description */}
                    <div className="row-span-2">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">
                                        Опис
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Введіть опис реліквії"
                                            {...field}
                                            className="min-h-[6.25rem] max-h-[8.25rem]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <div className="row-span-"> */}
                    <FormField
                        control={form.control}
                        name="historicalPeriod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="historicalPeriod">
                                    Історичний період
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="historicalPeriod"
                                    className="select"
                                    options={categoriesOptions}
                                    placeholder={'Виберіть історичний період'}
                                    onBlur={field.onBlur}
                                    value={categoriesOptions.filter(
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
                    {/* </div> */}
                    <FormField
                        control={form.control}
                        name="museum"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="museum">Музей</FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="museum"
                                    className="select"
                                    options={categoriesOptions}
                                    placeholder={'Виберіть музей'}
                                    onBlur={field.onBlur}
                                    value={categoriesOptions.filter(
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
                </div>
                {/* ADDITIONAL PROPS */}
            </div>
            <h4>Додаткові Характеристики</h4>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-1 gap-5 self-start">
                    <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                            <ReactSelect
                                options={properties}
                                isMulti
                                closeMenuOnSelect={false}
                                placeholder={'Оберіть додаткові характеристики'}
                                noOptionsMessage={() =>
                                    'Жодної характеристики не знайдено'
                                }
                                menuPortalTarget={document.body}
                                onChange={(selectedOptions, actionMeta) => {
                                    if (actionMeta.action === 'remove-value') {
                                        form.resetField(
                                            actionMeta.removedValue.value
                                        );
                                    }
                                    const selectedValues = selectedOptions
                                        ? selectedOptions.map(
                                              (option) => option.value
                                          )
                                        : [];
                                    field.onChange(selectedValues);

                                    setSelectedProperties(selectedValues);
                                }}
                                onBlur={field.onBlur}
                                value={properties.filter((properties) =>
                                    field.value?.includes(properties.value)
                                )}
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
                        {selectedProperties.map((option, index) => (
                            <FormField
                                control={form.control}
                                name={option}
                                key={index}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor={option}>
                                            {option}
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
                                            maxFileSize={50 * 1024 * 1024}
                                            maxFiles={3}
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
                                                        Макс. розмір файлу:
                                                        50Mб, Файлів: 3
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
