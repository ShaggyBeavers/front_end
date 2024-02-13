import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AddMainRelic from '../AddMainRelic';
import AddLostRelic from '../AddLostRelic';
import AddReturnedRelic from '../AddReturnedRelic';
import { Toaster } from '../ui/sonner';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import NavBar from '../NavBar/navbar';
import { Button } from '../ui/button';

const relicFormSchema = z.object({
    name: z
        .string({ required_error: 'Вкажіть назву реліквії' })
        .min(3, { message: 'Назва повинна бути більше 3 символів.' })
        .max(255),
    region: z.string({ required_error: 'Вкажіть регіон' }),
    status: z.string({ required_error: 'Вкажіть статус' }),
    description: z.string({ required_error: 'Вкажіть опис' }),
    // date: z.date({ required_error: 'Вкажіть дату' }),
    quantity: z.string({ required_error: 'Вкажіть кількість' }),
});

type RelicForm = z.infer<typeof relicFormSchema>;

export const EditRelic = () => {
    const location = useLocation();
    const { isReturned, isLost, isMain } = location.state;
    console.log(location.state);
    const form = useForm<any>({
        // resolver: zodResolver(relicFormSchema),
        // defaultValues: {},
        // mode: 'onChange',
    });

    const onSubmit = (data: any) => {
        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    };

    return (
        <>
            <NavBar styles="relative" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 p-20"
                >
                    {isMain && <AddMainRelic form={form} />}
                    {isReturned && <AddReturnedRelic form={form} />}
                    {isLost && <AddLostRelic form={form} />}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <Toaster />
        </>
    );
};
