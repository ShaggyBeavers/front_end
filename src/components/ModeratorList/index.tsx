// import React from 'react';
// import './tableinfo.css';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import AdminAPI from '../../app/api/Admin/admin';
import { useAuthStore } from '../../stores/AuthStore';

interface TableInfoProps {
    title: string;
    categoryList: string[];
    status: string;
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
    console.log('Mod IS LOADDED:\n\n', moderatorsData.data);
    console.log('RegMod IS LOADDED:\n\n', regModeratorsData.data);
    const props: any = [];
    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
        </>
    );
};

export default ModeratorList;
