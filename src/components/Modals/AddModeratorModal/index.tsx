import { useForm, Controller } from 'react-hook-form';
import './index.css';
import Select from 'react-select';
import DefaultButton from '../../DefaultButton/defaultbutton';
import { toast } from 'sonner';
import ProtectedItems from '../../ProtectedItems';
import { RoleEnum } from '../../../../src/enums/roles';
import { useMutation, useQuery } from '@tanstack/react-query';
import UserAPI from '../../../app/api/Account/User/user';
import RegionAPI from '../../../../src/app/api/Region/region';
import CategoryAPI from '../../../../src/app/api/Category/category';
import { convertTermToOptions, Option } from '../../../../src/lib/utils';
import AdminAPI from '../../../../src/app/api/Admin/admin';

const AddModeratorModal = (props: any) => {
    const { handleSubmit, control } = useForm();
    const users = useQuery({
        queryKey: ['users'],
        queryFn: async () => await UserAPI.getUsers(),
    });
    const categories = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await CategoryAPI.getCategories(),
    });
    const regions = useQuery({
        queryKey: ['regions'],
        queryFn: async () => await RegionAPI.getRegions(),
    });

    // const getUser = useMutation({
    //     mutationKey: ['getUser'],
    //     mutationFn: (userId: number) => UserAPI.getUser(userId),
    // });

    const addModerator = useMutation({
        mutationKey: ['addModerator'],
        // mutationFn: (data: any) => AdminAPI.addModerator(data),
        mutationFn: (data: any) => AdminAPI.addModerator(data),
        onSuccess: (data) => {
            toast.success('Користувачу надані права модератора');
        },
        onError: (error) => {
            toast.error(
                'Помилка при додаванні модератора. Цей користувач вже є звичайним або регіональним модератором.'
            );
            console.log('Error on adding moderator: ', error);
        },
    });

    const addRegModerator = useMutation({
        mutationKey: ['addRegModerator'],
        mutationFn: (data: any) => AdminAPI.addRegionalModerator(data),
        onSuccess: (data) => {
            toast.success('Користувачу надані права регіонального модератора');
        },
        onError: (error) => {
            toast.error(
                'Помилка при додаванні Регіонального модератора. Цей користувач вже є звичайним або регіональним модератором.'
            );
            console.log('Error on adding regional moderator: ', error);
        },
    });

    const changeModerator = useMutation({
        mutationKey: ['changeModerator'],
        mutationFn: (data: any) => AdminAPI.changeModerator(data),
        onSuccess: (data) => {
            toast.success('Користувачу надані права Модератора');
        },
        onError: (error) => {
            toast.error(
                'Помилка при додаванні Модератора. Цей користувач вже є звичайним або регіональним модератором.'
            );
            console.log('Error on adding moderator: ', error);
        },
    });

    const changeRegModerator = useMutation({
        mutationKey: ['changeRegModerator'],
        mutationFn: (data: any) => AdminAPI.changeRegModerator(data),
        onSuccess: (data) => {
            toast.success('Користувачу надані права регіонального модератора');
        },
        onError: (error) => {
            toast.error(
                'Помилка при додаванні Регіонального модератора. Цей користувач вже є звичайним або регіональним модератором.'
            );
            console.log('Error on adding regional moderator: ', error);
        },
    });

    let categoryOptions: Option[] = [];
    let regionOptions: Option[] = [];
    if (users.isLoading || categories.isLoading || regions.isLoading)
        return <div>Loading...</div>;

    if (categories.isFetched && regions.isFetched) {
        categoryOptions = convertTermToOptions(categories.data);
        regionOptions = convertTermToOptions(regions.data);
    }

    let usersOptions: Option[] = [];
    if (users.isFetched) {
        usersOptions =
            users.data?.data
                .filter((user: any) => !user.ban)
                .map((user: any) => ({
                    value: user.id,
                    label: user.email,
                })) ?? [];
    }

    const onSubmit = (data: any) => {
        const { regModerator, ...formData } = data;
        // From users list get roleName of the user with id mathcing formData.userId
        const user = users.data?.data.find(
            (user: any) => user.id === formData.userId
        );

        console.log('User: ', user);

        const nFormData = {
            userId: formData.userId,
            regionIds: formData.regionIds || [],
            categoryIds: formData.categoryIds || [],
        };

        // addModerator.mutate(nFormData);
        // if user is already a moderator
        if (user?.roleName === RoleEnum.MODERATOR || user?.roleName === RoleEnum.REGIONAL_MODERATOR) {
            if (regModerator) changeRegModerator.mutate(nFormData);
            else changeModerator.mutate(nFormData);
            return;
        }
        if (regModerator) addRegModerator.mutate(nFormData);
        else addModerator.mutate(nFormData);

        props.closeModal();
        // cleanup the form

        // toast('Успішно додано модератора', {
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md">
        //             <code>{JSON.stringify(nFormData, null, 4)}</code>
        //             {regModerator
        //                 ? 'Регіональний модератор'
        //                 : 'Звичайний модератор'}
        //         </pre>
        //     ),
        // });
    };

    return (
        <>
            <form className="center-mod" onSubmit={handleSubmit(onSubmit)}>
                <div className="row-mod">
                    <label htmlFor="userId">
                        Виберіть нового модератора зі списку:
                    </label>
                    <Controller
                        name="userId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                // {...field}
                                id="userId"
                                className="select"
                                options={usersOptions}
                                getOptionLabel={(option) =>
                                    `${option.value}: ${option.label}`
                                }
                                placeholder={'Email: id'}
                                // closeMenuOnSelect={false}
                                onChange={(option) =>
                                    option
                                        ? field.onChange(option?.value)
                                        : field.onChange(null)
                                }
                                onBlur={field.onBlur}
                                value={usersOptions.find(
                                    (user) => user.value === field.value
                                )}
                                menuPortalTarget={document.body}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 180,
                                        overflow: 'hidden',
                                    }),
                                }}
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
                            />
                        )}
                    />
                    {/* <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                className="mod-input"
                                id="email"
                                type="email"
                            />
                        )}
                    /> */}
                    {/* <input
                        className="mod-input"
                        id="email"
                        type="email"
                        {...register('email')}
                    /> */}
                </div>
                <div className="row-mod">
                    <label htmlFor="regionIds">Регіон модератора:</label>
                    <Controller
                        name="regionIds"
                        control={control}
                        render={({ field }) => (
                            <Select
                                // {...field}
                                id="regionIds"
                                className="select"
                                isMulti
                                options={regionOptions}
                                placeholder={'Виберіть регіон модератора'}
                                closeMenuOnSelect={false}
                                onChange={(options) =>
                                    field.onChange(
                                        options
                                            ? options.map(
                                                  (option) => option.value
                                              )
                                            : []
                                    )
                                }
                                onBlur={field.onBlur}
                                value={regionOptions.filter((category) =>
                                    field.value?.includes(category.value)
                                )}
                                menuPortalTarget={document.body}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 180,
                                        overflow: 'hidden',
                                    }),
                                }}
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
                            />
                        )}
                    />
                    {/* <Controller
                        name="region"
                        control={control}
                        render={({ field }) => (
                            <Select
                                // {...field}
                                id="region"
                                className="select"
                                options={regions}
                                placeholder={'Виберіть регіон модератора'}
                                onChange={(option) =>
                                    option
                                        ? field.onChange(option?.value)
                                        : field.onChange(null)
                                }
                                onBlur={field.onBlur}
                                value={regions.find(
                                    (region) => region.value === field.value
                                )}
                                menuPortalTarget={document.body}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 180,
                                        overflow: 'hidden',
                                    }),
                                }}
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
                            />
                        )}
                    /> */}
                </div>
                <div className="row-mod">
                    <label htmlFor="categoryIds">Категорії модератора:</label>
                    <Controller
                        name="categoryIds"
                        control={control}
                        render={({ field }) => (
                            <Select
                                // {...field}
                                id="categoryIds"
                                className="select"
                                isMulti
                                options={categoryOptions}
                                placeholder={'Виберіть категорії модератора'}
                                closeMenuOnSelect={false}
                                // to submit only values
                                onChange={(options) =>
                                    field.onChange(
                                        options
                                            ? options.map(
                                                  (option) => option.value
                                              )
                                            : []
                                    )
                                }
                                onBlur={field.onBlur}
                                value={categoryOptions.filter((category) =>
                                    field.value?.includes(category.value)
                                )}
                                menuPortalTarget={document.body}
                                styles={{
                                    menu: (provided) => ({
                                        ...provided,
                                        maxHeight: 180,
                                        overflow: 'hidden',
                                    }),
                                }}
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
                            />
                        )}
                    />
                </div>
                <ProtectedItems
                    role={[RoleEnum.ADMIN, RoleEnum.REGIONAL_MODERATOR]}
                >
                    <div className="flex items-center ">
                        <label htmlFor="checkbox" className="pr-1.5">
                            Регіональний Модератор
                        </label>
                        <Controller
                            name="regModerator"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="mt-1"
                                    id="checkbox"
                                    type="checkbox"
                                />
                            )}
                        />
                    </div>
                </ProtectedItems>
                <div className="row-mod">
                    <DefaultButton
                        height={40}
                        width={180}
                        bgcolor="black"
                        color="white"
                        text="Додати модератора"
                        action={() => {
                            // console.log('add moderator');
                        }}
                    />
                    {/* <DefaultButton
                        height={40}
                        width={180}
                        bgcolor="black"
                        color="white"
                        text="Закрити"
                        action={() => props.closeModal()}
                    /> */}
                </div>
            </form>
        </>
    );
};

export default AddModeratorModal;
