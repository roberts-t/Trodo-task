import React from 'react';

export const TableHeader = ({ children }: TableHeaderProps) => {
    return (
        <th className="h-11 border-collapse border border-gray-500 bg-gray-200 font-semibold sm:w-40">
            <div className="flex justify-center items-center">
                {children}
            </div>
        </th>
    );
};

type TableHeaderProps = {
    children: React.ReactNode;
}
