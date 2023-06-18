import React from 'react';

export const PageSwitchBtn = ({ disabled, onClick, children }: PageSwitchBtnProps) => {
    return (
        <button
            className="flex flex-row items-center justify-center mx-1 disabled:text-gray-300 text-gray-500"
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

type PageSwitchBtnProps = {
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}
