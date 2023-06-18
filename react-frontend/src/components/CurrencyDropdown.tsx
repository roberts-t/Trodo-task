import { FiChevronDown } from 'react-icons/fi';
import { useEffect, useRef, useState } from "react";
import { currencies } from "../config/config.ts";

export const CurrencyDropdown = ({ currentCurrency, setCurrency }: CurrencyDropdownProps) => {
    const availableCurrencies = currencies;
    const dropdownMenuRef = useRef<HTMLDivElement | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleOutsideClick = (event: MouseEvent) => {
        // Close the dropdown if the user clicks outside of it
        if (dropdownOpen && dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    }

    const handleCurrencyClick = (currency: string) => {
        // Only allow currencies from the config file
        if (!availableCurrencies.includes(currency)) return;
        setCurrency(currency);
        setDropdownOpen(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [dropdownOpen]);

    return (
        <>
            <div className="text-left flex flex-col gap-y-1">
                <span className="text-gray-800 text-center font-bold">To</span>
                <div className="relative" ref={dropdownMenuRef}>
                    <button
                        className="inline-flex bg-white justify-between items-center py-1 w-24 font-medium border border-gray-400 rounded-md px-3 text-left"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {currentCurrency}
                        <FiChevronDown className="text-xl text-gray-500"  />
                    </button>
                    {dropdownOpen && (
                    <div
                        className="absolute z-10 top-10 left-0 w-full bg-white border border-gray-400 rounded-md shadow-md overflow-hidden"
                    >
                        <ul className="flex flex-col">
                            {availableCurrencies.map((currency) => {
                                return (
                                    <li
                                        className={`hover:bg-gray-200 cursor-pointer px-3 py-0.5 transition-colors ${currency === currentCurrency && 'font-bold'}`}
                                        onClick={() => handleCurrencyClick(currency)}
                                        key={currency}
                                    >
                                        {currency}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
};

type CurrencyDropdownProps = {
    currentCurrency: string;
    setCurrency: (currencyCode: string) => void;
}
