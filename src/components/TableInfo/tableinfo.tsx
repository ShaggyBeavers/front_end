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
    const reports = useQuery({
        queryKey: ['reports'],
        queryFn: async () => await ReportAPI.getAllReports(0, 20),
    });

    if (reports.isLoading) {
        return <div>Loading...</div>;
    }

    if (reports.isError) {
        return <div>Error</div>;
    }

    // const props: any = [
    //     {
    //         title: 'Казан',
    //         categoryList: [],
    //         status: 'BEING_PROCESSED',
    //     },
    //     {
    //         title: 'Келішек',
    //         status: 'NEW',
    //         categoryList: [],
    //     },
    //     {
    //         title: 'Золото Кримського ханства',
    //         categoryList: [
    //             {
    //                 id: 10,
    //                 name: 'Ancient Artifacts',
    //             },
    //             {
    //                 id: 7,
    //                 name: 'Золото',
    //             },
    //             {
    //                 id: 5,
    //                 name: 'Ware',
    //             },
    //             {
    //                 id: 1,
    //                 name: 'Inscriptions',
    //             },
    //         ],
    //         status: 'APPROVED',
    //     },
    //     {
    //         title: 'Останній з Василів',
    //         categoryList: [
    //             {
    //                 id: 7,
    //                 name: 'Золото',
    //             },
    //         ],
    //         status: 'REJECTED',
    //     },
    // ];

    const props = reports?.data!.data.content;

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
        </>
    );
};

export default RelicTableInfo;
