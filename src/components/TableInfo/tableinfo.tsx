import React from 'react';
import './tableinfo.css';

interface TableInfoProps {
    name: string;
    categoryList: string[];
    status: string;
}

const TableInfo = () => {
    const matrix = Array(3).fill(Array(3).fill('😀'));

    const props: any = [
        {
            name: 'Казан',
            categoryList: ['Посуд', 'Антикваріат'],
            status: 'Вкрадено',
        },
        {
            name: 'Келішек',
            status: 'Знищено',
            categoriesDTO: [
                {
                    name: 'Посуд',
                    id: 0,
                },
                {
                    name: 'Фарфор',
                    id: 1,
                },
            ],
        },
        {
            name: 'Золото Кримського ханства',
            categoryList: ['Скарб', 'Брошка', 'Золото'],
            status: 'Знищено',
        },
        {
            name: 'Останній з Василів',
            categoryList: ['Книга'],
            status: 'Вкрадено',
        }
    ];

    return (
        <>
            <div className="table-info">
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
            </div>
        </>
        // <table>
        //     <th className="header">Назва</th>
        //     <th className="header">Категорія</th>
        //     <th className="header">Статус</th>
        //     {matrix.map((row, i) => (
        //         <tr key={i}>
        //             {row.map((cell: any, j: any) => (
        //                 <td key={j}>{cell}</td>
        //             ))}
        //         </tr>
        //     ))}
        // </table>
    );
};

export default TableInfo;
