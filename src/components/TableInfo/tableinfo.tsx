// import React from 'react';
// import './tableinfo.css';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from './DataTable';
import { columns } from './columns';
import ReportAPI from '../../app/api/Report/report';
import { get } from 'http';

interface Category {
    id: number;
    name: string;
}

interface TableInfoProps {
    name: string;
    categoriesDTO: Category[];
    status: string;
    userEmail: string;
}

const RelicTableInfo = () => {
    // const reports = useQuery({
    //     queryKey: ['reports'],
    //     queryFn: async () => await ReportAPI.getAllReports(0, 20),
    // });

    let props: any[] = [];
    // if (!reports.isLoading && !reports.isError) {
    //     props = reports?.data?.data?.content || [];
    // }

    return (
        <>
            <div className="hidden h-full w-full flex-1 flex-col space-y-8 pr-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
        </>
    );
};

export default RelicTableInfo;
