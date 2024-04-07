import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, z } from 'zod';
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
    RelicDTO,
    RelicInfoCreateEditDTO,
    LostRelicInfoCreateEditDTO,
    RecoveredRelicInfoCreateEditDTO,
} from '../../types/relic.d';
import { RelicStatusEnum } from '../../enums/relicstatus';
import { useAtom } from 'jotai';
import { filesAtom, selectedPropertiesAtom } from '../../stores/atoms';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RelicAPI from '../../../src/app/api/Relic/relic';

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
        quantity: z.coerce
            .number({ required_error: 'Вкажіть кількість' })
            .min(1, {
                message: 'Кількість повинна бути більше 0',
            }),
        inventoryNumber: z.string().optional(),
        formerInventoryNumber: z.string().optional(),
        // categories: z.array(z.any()),
        // collection: z.string({ required_error: 'Вкажіть колекцію' }).optional(),
        // image: z.any().optional(),
        // image: z.array(z.any()).optional(),
    })
    .passthrough();

type RelicForm = z.infer<typeof relicFormSchema>;

const cleanUpData = (data: any) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== '')
    );
};

export const EditRelic = () => {
    const queryClient = useQueryClient();
    const [files, setFiles] = useAtom(filesAtom);
    const uploadRelicFile = useMutation({
        mutationFn: async ({ relicId, file }: { relicId: number; file: any }) =>
            await RelicAPI.uploadRelicFile(relicId, file),
        onSuccess: () => {
            console.log('File uploaded');
            queryClient.invalidateQueries({ queryKey: ['relicImages'] });
        },
        onError: (error) => {
            console.log(error);
        },
        // retryDelay: 1000,
        // retry: 3,
    });

    const formData = new FormData();
    const [relicId, setRelicId] = useState<number>(0);
    const addRelic = useMutation({
        mutationFn: RelicAPI.createRelic,
        onSuccess: (data) => {
            console.log(
                'Relic added. Now we can start adding photos to: ',
                data.data
            );
            // files.forEach((file) => {
            //     if (file?.file) {
            //         formData.append('file', file.file);
            //     }
            // });
            setRelicId(data.data);
        },
        onSettled: () => {
            // uploadRelicFile.mutate({ relicId: relicId, file: formData });
        },
        onError: (error) => {
            console.log(error);
        },
    });

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
        data = cleanUpData(data);
        // if (formRef.current?.checkValidity()) {
        // toast('You submitted the following values:', {
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });

        let LostRelicInfoCreateEditDTO: LostRelicInfoCreateEditDTO | undefined =
            {};
        if (isLost) {
            const {
                lossWay = '',
                probableLocation = '',
                lossTime = '',
                lossMuseumId = '',
            } = data;
            LostRelicInfoCreateEditDTO = {
                lossWay,
                probableLocation,
                lossTime,
                museumId: lossMuseumId.value,
            };
        }

        let RecoveredRelicInfoCreateEditDTO:
            | RecoveredRelicInfoCreateEditDTO
            | undefined = {};
        if (isReturned) {
            const {
                locationSource = '',
                returnProcess = '',
                returnDate = '',
                previousSearchInfo = '',
                courtDecision = '',
            } = data;
            RecoveredRelicInfoCreateEditDTO = {
                locationSource,
                returnProcess,
                returnDate,
                previousSearchInfo,
                courtDecision,
            };
        }

        const relicInfoCreateEditDTO: RelicInfoCreateEditDTO = {
            ...(data.techniqueId && { techniqueId: data.techniqueId.value }),
            ...(data.historicalPeriodId && {
                historicalPeriodId: data.historicalPeriodId.value,
            }),
            ...(data.dimensions && { dimensions: data.dimensions }),
            ...(data.marks && { marks: data.marks }),
            ...(data.labels && { labels: data.labels }),
            ...(data.signatures && { signatures: data.signatures }),
            ...(data.restoration && { restoration: data.restoration }),
            ...(data.appraisedValue && { appraisedValue: data.appraisedValue }),
            ...(data.insuranceValue && { insuranceValue: data.insuranceValue }),
            ...(data.annotations && { annotation: data.annotations }),
            ...(isLost && {
                LostRelicInfoCreateEditDTO: LostRelicInfoCreateEditDTO,
            }),
            ...(isReturned && {
                RecoveredRelicInfoCreateEditDTO:
                    RecoveredRelicInfoCreateEditDTO,
            }),
        };

        let propertyValues: string[] = [];
        let propertyIds: number[] = [];
        if (selectedProperties.length > 0) {
            propertyValues = selectedProperties.map((property: any) => {
                return data[property.label];
            });
            propertyIds = selectedProperties.map(
                (property: any) => property.value
            );
        }

        const relic: RelicDTO = {
            ...(data.status && { status: data.status }),
            ...(data.creationDate && { creationDate: data.creationDate }),
            ...(data.author && { author: data.author }),
            ...(data.regionId && { regionId: data.regionId.value }),
            ...(data.name && { name: data.name }),
            ...(data.creationPlaceId && {
                creationPlaceId: data.creationPlaceId.value,
            }),
            ...(data.reportIds && { reportIds: data.reportIds }),
            ...(data.relicCategoryIds && {
                relicCategoryIds: data.relicCategoryIds,
            }),
            ...(data.museumId && { museumId: data.museumId.value }),
            ...(data.quantity && { quantity: data.quantity }),
            ...(data.collection && { collection: data.collection }),
            ...(data.comment && { comment: data.comment }),
            ...(data.copyInformation && {
                copyInformation: data.copyInformation,
            }),
            ...(data.copyCreationTime && {
                copyCreationTime: data.copyCreationTime,
            }),
            ...(data.entryBookNumber && {
                entryBookNumber: data.entryBookNumber,
            }),
            ...(data.inventoryNumber && {
                inventoryNumber: data.inventoryNumber,
            }),
            ...(data.formerInventoryNumber && {
                formerInventoryNumber: data.formerInventoryNumber,
            }),
            ...(data.relicPropertyIds && {
                relicPropertyIds: data.relicPropertyIds,
            }),
            ...(propertyIds && { relicPropertyIds: propertyIds }),
            ...(propertyValues && { propertyValues: propertyValues }),
            ...(relicInfoCreateEditDTO && {
                relicInfoCreateEditDTO: relicInfoCreateEditDTO,
            }),
        };

        // add upload files to relicId 20
        const formData = new FormData();
        files.forEach((file) => {
            if (file?.file) {
                formData.append('file', file.file);
            }
        });
        addRelic
            .mutateAsync(relic)
            .then((data: any) => {
                uploadRelicFile.mutate({ relicId: data.data, file: formData });
            })
            .catch((error: any) => {
                console.log(error);
            });

        // uploadRelicFile.mutate({ relicId: relicId, file: formData });

        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(relic, null, 2)}
                    </code>
                </pre>
            ),
        });
        form.reset({
            name: '',
            collection: '',
            images: '',
            categories: '',
            author: '',
            creationDate: '',
            quantity: 0,
            status: '',
            regionId: '',
            comment: '',
            historicalPeriodId: '',
            formerInventoryNumber: '',
            copyCreationTime: '',
            techniqueId: '',
            insuranceValue: '',
            inventoryNumber: '',
            creationPlaceId: '',
            copyInformation: '',
            appraisedValue: '',
            dimensions: '',
            signatures: '',
            restoration: '',
            marks: '',
            labels: '',
            annotation: '',
            museumId: '',
            ...(isLost && {
                lossWay: '',
                probableLocation: '',
                lossTime: '',
                lossMuseumId: '',
            }),
            ...(isReturned && {
                locationSource: '',
                returnProcess: '',
                returnDate: '',
                previousSearchInfo: '',
                courtDecision: '',
            }),
        });

        setFiles([]);
        setSelectedProperties([]);
        // formRef.current?.dispatchEvent(
        //     new Event('submit', { bubbles: true })
        // );
    };

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
                    {isLost && <AddLostRelic form={form} />}
                    {isReturned && <AddReturnedRelic form={form} />}
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
