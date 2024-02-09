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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip';

const AddLostRelic = ({ form }: any) => {
    return (
        <div>
            <h2 className="text-4xl mb-5">Інформація про повернуту реліквію</h2>
            <div className="grid grid-cols-2 gap-10">
                <div className="grid grid-rows-2 gap-5">
                    {/* Dimensions */}
                    <FormField
                        control={form.control}
                        name="locationSource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="locationSource">
                                    Джерело інформації про повернення
                                </FormLabel>
                                <FormControl>
                                    <>
                                        <Input type="text" {...field} />
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    krk
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        Вкажіть, звідки ви
                                                        дізналися про повернення
                                                        реліквії
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </>
                                </FormControl>
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
                    {/* Restoration */}
                </div>
                <div className="grid grid-rows-2 gap-5">
                    {/* marks */}
                    <FormField
                        control={form.control}
                        name="previousSearchInfo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="previousSearchInfo">
                                    Попереднє Джерело про пошук
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

export default AddLostRelic;
