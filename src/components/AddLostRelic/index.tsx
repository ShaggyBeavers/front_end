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
import ReactSelect from 'react-select';
import { convertTermToOptions } from '../../lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import MuseumAPI from '../../../src/app/api/Museum/museum';

const AddLostdRelic = ({ form }: any) => {
    const queryClient = useQueryClient();
    // const museums: any = queryClient.ensureQueryData({
    //     queryKey: ['getMuseums'],
    //     queryFn: async () => await MuseumAPI.getMuseums(),
    // });
    const museums = useQuery({
        queryKey: ['getMuseums'],
        queryFn: async () => await MuseumAPI.getMuseums(),
    });

    if (museums.isLoading) return <div>Loading...</div>;
    let museumOptions: any[] = [];
    if (museums.data)
        museumOptions = convertTermToOptions((museums as any).data || []);

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
                                <FormDescription>
                                    Переміщено внаслідок збройного конфлікту,
                                    викрадено
                                </FormDescription>
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
                                <FormDescription>
                                    Найменування установи, де можливе
                                    місцезнаходження втраченої культурної
                                    цінності
                                </FormDescription>
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
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Museum */}
                    <FormField
                        control={form.control}
                        name="lossMuseumId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="lossMuseumId">
                                    Музей з якого було втрачено
                                </FormLabel>
                                <ReactSelect
                                    {...field}
                                    // isMulti
                                    id="lossMuseumId"
                                    className="select"
                                    options={museumOptions}
                                    getOptionLabel={(option) =>
                                        `
                                        ${
                                            museums.data.find(
                                                (museum: any) =>
                                                    museum.id === option.value
                                            )?.name
                                        } :
                                        ${
                                            museums.data.find(
                                                (museum: any) =>
                                                    museum.id === option.value
                                            )?.nameOld
                                        }`
                                    }
                                    placeholder={'Виберіть музей'}
                                    onBlur={field.onBlur}
                                    value={museumOptions.filter(
                                        (category) =>
                                            field.value?.value ===
                                            category.value
                                    )}
                                    menuPortalTarget={document.body}
                                    theme={(theme) => ({
                                        ...theme,
                                        border: 'none',
                                        borderRadius: 20,
                                        fontSize: 10,
                                        colors: {
                                            ...theme.colors,
                                            primary25: 'rgba(0, 0, 0, 0.1)',
                                            primary: '#1C1C1C',
                                        },
                                    })}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            maxHeight: 180,
                                            overflow: 'hidden',
                                        }),
                                        // control: (provided, state) => ({
                                        //     ...provided,
                                        //     borderColor: state.isFocused
                                        //         ? '#587cc0'
                                        //         : '#587cc0',
                                        // }),
                                    }}
                                />
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

export default AddLostdRelic;
