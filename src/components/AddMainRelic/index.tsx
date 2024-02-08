import './index.css';
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

const AddMainRelic = ({ form }: any) => {
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
                                <FormLabel htmlFor="CreationDate">
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
                                        <SelectTrigger>
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
                                            Загублено
                                        </SelectItem>
                                    </SelectContent>
                                    <FormMessage />
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-rows-5 gap-5">
                    <FormField
                        control={form.control}
                        name="regionId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="regionId">Регіон</FormLabel>
                                <FormControl>
                                    <Input placeholder="Регіон" {...field} />
                                </FormControl>
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
                                    Колекція
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Місце створення"
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
                    <FormField
                        control={form.control}
                        name="collection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="collection">
                                    Додаткова характеристика
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Колекція" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default AddMainRelic;
