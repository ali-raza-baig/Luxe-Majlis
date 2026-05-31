import React from 'react'

type HeaderType = {
    key: string,
    label: string,
    className?: string,
    render?: (value?: any, row?: any, index?: number) => React.ReactNode
};


type TableProps = {
    header: HeaderType[],
    body: any[],
    emptyMessage?: string;
    tableClassName?: string;
    headClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
}


const Table = ({
    header,
    body,
    emptyMessage = "No data found",
    tableClassName = "",
    headClassName = "",
    rowClassName = "",
    cellClassName = ""
}: TableProps) => {
    return (
        <table className={`${tableClassName} shadow-lg shadow-amber-100 rounded-lg w-full overflow-x-auto`}>
            <thead className={`rounded-lg font-playfair bg-deep-walnut text-white font-semibold ${headClassName}`}>
                <tr>
                    {header.map((h, i) => (
                        <th key={i} className={`text-start text-lg py-3 px-4 ${h.className}`}>
                            {h.label}
                        </th>
                    ))}
                </tr>
            </thead>
            {/* Table Body */}
            <tbody>
                {body.length > 0 ? (<>
                    {body.map((row, i) => (
                        <tr key={i} className={`hover:bg-gray-100 ${rowClassName}`}>
                            {header.map((col, colIndex) => (
                                <td key={colIndex} className={`border px-4 py-3 ${cellClassName}`}>
                                    {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </>) : (<>
                    <tr>
                        <td
                            colSpan={header.length}
                            className="border px-4 py-6 text-center text-gray-500"
                        >
                            {emptyMessage}
                        </td>
                    </tr>
                </>)}
            </tbody>
        </table>
    )
}

export default Table;         