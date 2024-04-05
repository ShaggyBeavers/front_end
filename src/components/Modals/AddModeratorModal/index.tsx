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

const AddModeratorModal = () => {
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
    const addModerator = useMutation({
        mutationFn: (data: any) => AdminAPI.addModerator(data),
        onError: (error) => {
            console.log('Error', error);
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

        const nFormData = {
            userId: formData.userId,
            regionIds: formData.regionIds || [],
            categoryIds: formData.categoryIds || [],
        };

        // addModerator.mutate(nFormData);
        if (regModerator) AdminAPI.addRegionalModerator(nFormData);
        else addModerator.mutate(nFormData);

        toast('Успішно додано модератора', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md">
                    <code>{JSON.stringify(nFormData, null, 4)}</code>
                    {regModerator
                        ? 'Регіональний модератор'
                        : 'Звичайний модератор'}
                </pre>
            ),
        });
    };

    // const categories = [
    //     { value: 1, label: 'Архітектура' },
    //     { value: 2, label: 'Історія' },
    //     { value: 3, label: 'Природа' },
    //     { value: 4, label: 'Культура' },
    //     { value: 5, label: 'Релігія' },
    //     { value: 6, label: 'Військовість' },
    //     { value: 7, label: 'Наука' },
    //     { value: 8, label: 'Мистецтво' },
    //     { value: 9, label: 'Спорт' },
    //     { value: 10, label: 'Інше' },
    // ];

    // const regions = [
    //     { value: 1, label: 'Київ' },
    //     { value: 2, label: 'Харків' },
    //     { value: 3, label: 'Одеса' },
    //     { value: 4, label: 'Дніпро' },
    //     { value: 5, label: 'Донецьк' },
    //     { value: 6, label: 'Запоріжжя' },
    //     { value: 7, label: 'Львів' },
    //     { value: 8, label: 'Кривий Ріг' },
    //     { value: 9, label: 'Миколаїв' },
    //     { value: 10, label: 'Волинь' },
    //     { value: 11, label: 'Стара Біла Церква' },
    // ];

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
                </div>
            </form>
        </>
    );
};

export default AddModeratorModal;
