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
import { Separator } from '../ui/separator';

const AddReturnedRelic = ({ form }: any) => {
    return (
        <div>
            <h2 className="text-4xl mb-5">Інформація про повернуту реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-3 gap-5">
                    {/* location source */}
                    <FormField
                        control={form.control}
                        name="locationSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="locationSource">
                                    Джерело інформації про повернення
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription className="mr-10">
                                    Інформації, за допомогою якої було знайдено
                                    культурну цінність (каталог виставки,
                                    електронна база даних втрат культурних
                                    цінностей)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Signatures */}
                    <FormField
                        control={form.control}
                        name="returnProcess"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="returnProcess">
                                    Процес повернення
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Вкажіть, як відбувався процес повернення
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* return date */}
                    <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="returnDate">
                                    Дата повернення
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-rows-3 gap-5">
                    {/* prevSearchInfo */}
                    <FormField
                        control={form.control}
                        name="previousSearchInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="previousSearchInfo">
                                    Додаткова інформація про попередній розшук
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* marks */}
                    <FormField
                        control={form.control}
                        name="courtDecision"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="courtDecision">
                                    Судовий процес
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
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

export default AddReturnedRelic;
