import { useLocation } from 'react-router-dom';
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
import { useForm } from 'react-hook-form';
import NavBar from '../NavBar/navbar';
import { Button } from '../ui/button';

export const EditRelic = () => {
    const location = useLocation();
    const { isReturned, isLost, isMain } = location.state;
    console.log(location.state);
    const form = useForm<any>({});

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
                    className="space-y-8 py-20 px-28"
                >
                    {/* <FormField
                        control={form.control}
                        name="name"
                        render={() => (
                            <> */}
                    {isMain && <AddMainRelic form={form} />}
                    {isReturned && <AddReturnedRelic form={form} />}
                    {isLost && <AddLostRelic form={form} />}
                    {/* </>
                        )}
                    /> */}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <Toaster />
        </>
    );
};
