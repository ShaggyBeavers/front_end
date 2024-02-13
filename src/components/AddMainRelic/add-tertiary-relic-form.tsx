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
// import { Separator } from '@radix-ui/react-select';
import { Separator } from '../ui/separator';

export const AddTertiaryRelicForm = ({ form }: any) => {
    return (
        <div>
            <h2 className="text-4xl mb-5">Третинна інформація про реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-3 gap-5">
                    {/* Dimensions */}
                    <FormField
                        control={form.control}
                        name="dimensions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="dimensions">
                                    Розміри
                                </FormLabel>
                                <FormControl>
                                    <Input type="text"  {...field}   />
                                </FormControl>
                                <FormDescription>
                                    Вкажіть розмір у мм
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Signatures */}
                    <FormField
                        control={form.control}
                        name="signatures"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="signatures">
                                    Підписи
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Restoration */}
                    <FormField
                        control={form.control}
                        name="restoration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="restoration">
                                    Реставрація
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                Інформація про здійснення/потребу здійснення реставрації
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-rows-3 gap-5">
                    {/* marks */}
                    <FormField
                        control={form.control}
                        name="marks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="marks">
                                    Марки
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* labels */}
                    <FormField
                        control={form.control}
                        name="labels"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel 
                                htmlFor="labels">
                                    Ярлики
                                    </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* annotation */}
                    <FormField
                        control={form.control}
                        name="annotation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="annotation">
                                    Анотація
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                Будь-яка інформація з історії перебування культурної цінності до/після втрати її музеєм
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            <Separator className="my-6 border-zinc-200 border-2" />
        </div>
    );
};
