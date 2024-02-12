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

const AddMainRelic = ({ form }: any) => {
    const [files, setFiles] = useState<any>([]);
    const [imgSrc, setImgSrc] = useState<any>(undefined);

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
    const [propertyFields, setPropertyFields] = useState<any>([
        { id: properties[0].id, value: '' },
    ]);
    const region = [
        { label: 'Київ', value: 'Kyiv' },
        { label: 'Харків', value: 'Kharkiv' },
    ];

    return (
        <>
            <h2 className="text-4xl">Основна інформація про реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-5 gap-5">
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
                                    />
                                </FormControl>
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
                                    Дата створення копії
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
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
                                    <Input placeholder="Кількість" {...field} />
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
                    <h4>Додаткові Характеристики</h4>
                    {propertyFields.map((propertyField: any, index: number) => {
                        return (
                            <FormField
                                control={form.control}
                                name={`property-${propertyField.id}`}
                                key={propertyField.id}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="property">
                                            {
                                                properties.find(
                                                    (property) =>
                                                        property.id ===
                                                        propertyField.id
                                                )?.label
                                            }
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Значення"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                    {/* <FormField
                        control={form.control}
                        name="properties"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="properties">
                                    Додаткова характеристика
                                </FormLabel>
                                <div className="flex flex-row">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl className="rounded-r-none">
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
                                                        ? properties.find(
                                                              (property) =>
                                                                  property.value ===
                                                                  field.value
                                                          )?.label
                                                        : 'Виберіть характеристику'}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <Command>
                                                <CommandInput
                                                    className="w-full"
                                                    placeholder="Search property..."
                                                />
                                                <CommandEmpty>
                                                    Жодної характеристики не
                                                    знайдено
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {properties.map(
                                                        (property) => (
                                                            <CommandItem
                                                                value={
                                                                    property.label
                                                                }
                                                                key={
                                                                    property.value
                                                                }
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'properties',
                                                                        property.value
                                                                    );
                                                                }}
                                                            >
                                                                <CheckIcon
                                                                    className={cn(
                                                                        '',
                                                                        property.value ===
                                                                            field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {property.label}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <Input
                                        type="text"
                                        className="rounded-l-none"
                                    />
                                    <Button className="bg-red-500">
                                        Trash
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                </div>
                {/* Second Column */}
                <div className="grid grid-rows-4 gap-5">
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
                                    <Input placeholder="Колекція" {...field} />
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
                                            placeholder="Опис"
                                            {...field}
                                            className="min-h-[6.25rem] max-h-[8.25rem]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="material">
                                    Матеріал
                                </FormLabel>
                                <FormControl><>
                                    <Dropzone
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
                                            height: 'auto',
                                            border: '1px solid #e4e4e7',
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
                                                    Макс. розмір файлу: 50Mб,
                                                    Файлів: 3
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
