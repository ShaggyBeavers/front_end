import { Input } from 'src/components/ui/input';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { cn } from '../../lib/utils';
import { Separator } from '../ui/separator';

export const AddSecondaryRelicForm = ({ form }: any) => {
    return (
        <div>
            <h2 className="text-4xl mb-5">Вторинна інформація про реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-3 gap-5">
                    <FormField
                        control={form.control}
                        name="formerInventoryNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="formerInventoryNumber">
                                    Первинний інвентарний номер
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Введіть інвентарний номер реліквії"
                                        id="formerInventoryNumber"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* CopyCreationDate */}
                    <FormField
                        control={form.control}
                        name="copyCreationTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="copyCreationTime">
                                    Дата створення копії
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* insuranceValue */}
                    <FormField
                        control={form.control}
                        name="insuranceValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="insuranceValue">
                                    Страхова вартість
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    І вкажіть валюту
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-rows-3 gap-5">
                    {/* inventoryNumber */}
                    <FormField
                        control={form.control}
                        name="inventoryNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="inventoryNumber">
                                    Інвентарний номер
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Введіть інвентарний номер реліквії"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* copyInformation */}
                    <FormField
                        control={form.control}
                        name="copyInformation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="copyInformation">
                                    Інформація про копію
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        // placeholder="Інформація"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>За наявності</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* appraisedValue */}
                    <FormField
                        control={form.control}
                        name="appraisedValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="appraisedValue">
                                    Оціночна вартість
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormDescription>
                                    І вкажіть валюту
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
