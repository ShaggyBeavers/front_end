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
                    categoryName: 'Ancient Artifacts',
                },
                {
                    id: 7,
                    categoryName: 'Золото',
                },
                {
                    id: 5,
                    categoryName: 'Ware',
                },
                {
                    id: 1,
                    categoryName: 'Inscriptions',
                },
            ],
            status: 'APPROVED',
        },
        {
            title: 'Останній з Василів',
            categoryList: [
                {
                    id: 7,
                    categoryName: 'Золото',
                },
            ],
            status: 'REJECTED',
        },
    ];

    console.log('props\n\n', props);

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
        </>
    );
};

export default RelicTableInfo;
