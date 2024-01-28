import React from 'react';
import './tableinfo.css';

const TableInfo = (props:any) => {
    const matrix = Array(3).fill(Array(3).fill("😀"));

    return(
        <table>
            {matrix.map((row, i) => (
                <tr key={i}>
                    {row.map((cell:any, j:any) => (
                        <td key={j}>{cell}</td>
                    ))}
                </tr>
            ))}
        </table>
    );
};

export default TableInfo;