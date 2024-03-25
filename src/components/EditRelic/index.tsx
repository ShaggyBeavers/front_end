import { useEffect, useRef } from 'react';
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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import {
    Relic,
    RelicInfoCreateEditDTO,
    LostRelicInfoCreateEditDTO,
    RecoveredRelicInfoCreateEditDTO,
    RelicStatusEnum,
} from '../../types/relic';
import { useAtom } from 'jotai';
import { filesAtom, selectedPropertiesAtom } from '../../stores/atoms';

const relicFormSchema = z
    .object({
        name: z
            .string({ required_error: 'Вкажіть назву реліквії' })
            .min(3, { message: 'Назва повинна бути більше 3 символів.' }),
        //     .max(255),
        // region: z.string({ required_error: 'Вкажіть регіон' }),
        // status: z.string({ required_error: 'Вкажіть статус' }),
        // description: z.string({ required_error: 'Вкажіть опис' }),
        // creationDate: z.string({ required_error: 'Вкажіть дату' }),
        // creationDate: z.coerce.date({
        //     required_error: 'Вкажіть дату',
        //     invalid_type_error: 'Невірний формат дати',
        // }),
        // quantity: z.string({ required_error: 'Вкажіть кількість' }),
        // categories: z.array(z.any()),
        // collection: z.string({ required_error: 'Вкажіть колекцію' }).optional(),
        // image: z.any().optional(),
        image: z.array(z.any()).optional(),
    })
    .passthrough();

type RelicForm = z.infer<typeof relicFormSchema>;

export const EditRelic = () => {
    const [files, setFiles] = useAtom(filesAtom);
    const [selectedProperties, setSelectedProperties] = useAtom(
        selectedPropertiesAtom
    );

    const location = useLocation();
    const { isReturned, isLost }: { isReturned: boolean; isLost: boolean } =
        location.state || { isReturned: false, isLost: false };
    const form = useForm<any>({
        resolver: zodResolver(relicFormSchema),
        defaultValues: {
            // name: '',
            // region: '',
            // status: '',
            // description: '',
            // creationDate: '',
            // quantity: '',
            // collection: '',
            // categories: [],
            // image: [],
        },
        mode: 'onChange',
    });

    // useEffect(() => {
    //     if (form.formState.isSubmitSuccessful) {
    //         console.log('submitted');
    //         form.reset();
    //     }
    // }, [form.formState.isSubmitSuccessful, form.reset]);

    const formRef = useRef<HTMLFormElement>(null);

    const formClick = () => {
        if (formRef.current) {
            formRef.current?.dispatchEvent(
                new Event('submit', { bubbles: true })
            );
        }
    };

    const onSubmit = (data: any) => {
        // if (formRef.current?.checkValidity()) {
        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });

        if (isLost) {
            const { lossWay, probableLocation, lossTime } = data;
            const relicInfo: LostRelicInfoCreateEditDTO = {
                lossWay,
                probableLocation,
                lossTime,
            };
            console.log(relicInfo);
        }

        form.reset({
            name: '',
            collection: '',
            images: '',
            categories: '',
            author: '',
            creationDate: '',
            quantity: '',
            status: '',
            region: '',
            description: '',
            historicalPeriod: '',
            primaryInventoryNumber: '',
            copyCreationDate: '',
            insuranceValue: '',
            inventoryNumber: '',
            copyInformation: '',
            appraisedValue: '',
            dimensions: '',
            signatures: '',
            restoration: '',
            marks: '',
            labels: '',
            annotations: '',
            ...(isReturned && {
                lossWay: '',
                probableLocation: '',
                lossTime: '',
            }),
            ...(isLost && {
                locationSource: '',
                returnProcess: '',
                previousSearchInfo: '',
                courtDecision: '',
            }),
        });
        setFiles([]);
        setSelectedProperties([]);
        console.log('submitted');
        // formRef.current?.dispatchEvent(
        //     new Event('submit', { bubbles: true })
        // );
    };
    console.log(isLost, isReturned, location.state);

    return (
        <>
            <NavBar styles="relative" />
            <Form {...form}>
                <form
                    id="relic-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 py-20 px-28"
                >
                    <AddMainRelic form={form} />
                    {isReturned && <AddReturnedRelic form={form} />}
                    {isLost && <AddLostRelic form={form} />}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Підтвердити</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Зберегти зміни
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Ви впевнені, що хочете зберегти зміни?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Відхилити</AlertDialogCancel>
                                <AlertDialogAction
                                    type="submit"
                                    form="relic-form"
                                    onClick={formClick}
                                >
                                    Прийняти
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    {/* <ConfirmButton
                        buttonMessage="Підтвердити"
                        dialogTitle="Зберегти зміни"
                        dialogDescription="Ви впевнені, що хочете зберегти зміни?"
                        dialogAction={() => {}}
                    /> */}
                </form>
            </Form>
            {/* <Toaster /> */}
        </>
    );
};
