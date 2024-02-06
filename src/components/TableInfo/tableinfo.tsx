import React from 'react';
import './tableinfo.css';
import { DataTable } from './DataTable';
import { columns } from './columns';

interface TableInfoProps {
    title: string;
    categoryList: string[];
    status: string;
}

const TableInfo = () => {
    const matrix = Array(3).fill(Array(3).fill('😀'));

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
                }
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

    return (
        <>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <DataTable columns={columns} data={props} />
            </div>
            {/* <div className="table-info">
                <div className="table-info-header__row">
                    <div className="table-info__cell ">Назва</div>
                    <div className="table-info__cell">Категорія</div>
                    <div className="table-info__cell">Статус</div>
                </div>
                {props.map((row: TableInfoProps, i: number) => (
                    <div className="table-info__row" key={i}>
                        <div className="table-info__cell">{row.name}</div>
                        <div className="table-info__cell">
                            {row.categoryList?.map((category: string, j: number) => (
                                <div key={j}>{category}</div>
                            ))}
                        </div>
                        <div className="table-info__cell">{row.status}</div>
                    </div>
                ))}
            </div> */}
        </>
    );
};

export default TableInfo;
