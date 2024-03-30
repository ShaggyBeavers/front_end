// import React from 'react';
// import './tableinfo.css';
import { DataTable } from './DataTable';
import { columns } from './columns';

interface TableInfoProps {
    title: string;
    categoryList: string[];
    status: string;
}

const RelicTableInfo = () => {
    const props: any = [
        {
            title: 'Казан',
            categoryList: [],
            status: 'BEING_PROCESSED',
        },
        {
            title: 'Келішек',
            status: 'NEW',
            categoryList: [],
        },
        {
            title: 'Золото Кримського ханства',
            categoryList: [
                {
                    id: 10,
                    name: 'Ancient Artifacts',
                },
                {
                    id: 7,
                    name: 'Золото',
                },
                {
                    id: 5,
                    name: 'Ware',
                },
                {
                    id: 1,
                    name: 'Inscriptions',
                },
            ],
            status: 'APPROVED',
        },
        {
            title: 'Останній з Василів',
            categoryList: [
                {
                    id: 7,
                    name: 'Золото',
                },
            ],
            status: 'REJECTED',
        },
    ];

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
        </>
    );
};

export default RelicTableInfo;
