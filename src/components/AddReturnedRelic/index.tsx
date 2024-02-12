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
            <h2 className="text-4xl mb-5">
                Інформація про загубленну реліквію
            </h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-2 gap-5">
                    <FormField
                        control={form.control}
                        name="lossWay"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="lossWay">
                                    Шляхи втрати
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="probableLocation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="probableLocation">
                                    Можливе місце знаходження
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-rows-2 gap-5">
                    <FormField
                        control={form.control}
                        name="lossTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="lossTime">
                                    Дата втрачання
                                </FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
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
