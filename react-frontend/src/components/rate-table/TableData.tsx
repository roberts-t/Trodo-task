import React from 'react';

export const TableData = ({ children }: TableDataProps) => {
    return (
        <td className="h-11 border-collapse border border-gray-500">
            <div className="flex justify-center items-center">
                {children}
            </div>
        </td>
    );
};

type TableDataProps = {
    children: React.ReactNode;
}
