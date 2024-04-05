// import React from 'react';
// import './tableinfo.css';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import AdminAPI from '../../app/api/Admin/admin';
import RegionAPI from '../../app/api/Region/region';
import CategoriesAPI from '../../app/api/Category/category';
import { useAuthStore } from '../../stores/AuthStore';
import CategoryAPI from '../../app/api/Category/category';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

interface TableInfoProps {
    title: string;
    categoryList: string[];
    status: string;
}

interface Region {
    id?: number;
    name: string;
}

interface Categories {
    id?: number;
    name: string;
}

interface Moderator {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    regions: Region[];
    categories: Categories[];
    ban: boolean;
    regionalModerator: boolean;
}

const ModeratorList = () => {
    const accessToken = useAuthStore((state) => state.accessToken);

    const moderatorsData = useQuery({
        queryKey: ['getMod', accessToken],
        queryFn: () => AdminAPI.getModerators(),
    });

    const regModeratorsData = useQuery({
        queryKey: ['getRegMod', accessToken],
        queryFn: () => AdminAPI.getRegionalModerators(),
    });

    // const regions = useQuery({
    //     queryKey: ['getRegions'],
    //     queryFn: () => RegionAPI.getRegions(),
    // });

    // const categories = useQuery({
    //     queryKey: ['getCategories'],
    //     queryFn: () => CategoryAPI.getCategories(),
    // });

    // const [regMod, setRegMod] = useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const regMod = urlParams.get('regMod') === 'true';

    const props: Moderator[] = [
        ...(regMod
            ? regModeratorsData.data?.data || []
            : moderatorsData.data?.data || []
        ).map((moderator: Moderator) => ({
            ...moderator,
            regionalModerator: regMod,
        })),
    ];

    let categories: Categories[] = [];
    let regions: Region[] = [];
    if (moderatorsData.isSuccess && regModeratorsData.isSuccess) {
        categories = [
            ...(moderatorsData.data?.data || [])
                .reduce((acc: Categories[], moderator: Moderator) => {
                    const moderatorCategories = moderator.categories.map(
                        (category: Categories) => category.name
                    );
                    return [...acc, ...moderatorCategories];
                }, [])
                .filter(
                    (category: string, index: number, self: string[]) =>
                        self.indexOf(category) === index
                ),
            ...(regModeratorsData.data?.data || [])
                .reduce((acc: Categories[], moderator: Moderator) => {
                    const moderatorCategories = moderator.categories.map(
                        (category: Categories) => category.name
                    );
                    return [...acc, ...moderatorCategories];
                }, [])
                .filter(
                    (category: string, index: number, self: string[]) =>
                        self.indexOf(category) === index
                ),
        ];

        regions = [
            ...(moderatorsData.data?.data || [])
                .reduce((acc: Region[], moderator: Moderator) => {
                    const moderatorRegions = moderator.regions.map(
                        (region: Region) => region.name
                    );
                    return [...acc, ...moderatorRegions];
                }, [])
                .filter(
                    (region: string, index: number, self: string[]) =>
                        self.indexOf(region) === index
                ),
            ...(regModeratorsData.data?.data || [])
                .reduce((acc: Region[], moderator: Moderator) => {
                    const moderatorRegions = moderator.regions.map(
                        (region: Region) => region.name
                    );
                    return [...acc, ...moderatorRegions];
                }, [])
                .filter(
                    (region: string, index: number, self: string[]) =>
                        self.indexOf(region) === index
                ),
        ];
    }

    // useEffect(() => {
    //     moderatorsData.refetch();
    //     regModeratorsData.refetch();
    // }, [urlParams]);

    return (
        <>
            <div className="hidden h-full w-full flex-1 flex-col space-y-8 pr-8 md:flex">
                <DataTable
                    columns={columns}
                    data={props}
                    constants={{ categories, regions }}
                />
            </div>
        </>
    );
};

export default ModeratorList;
