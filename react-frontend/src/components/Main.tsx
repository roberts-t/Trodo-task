import { useEffect, useState } from "react";
import { CurrencyRateTable } from "./CurrencyRateTable.tsx";
import { dateStrToFormattedDate } from "../helpers/date.helper.ts";
import { CurrencyDropdown } from "./CurrencyDropdown.tsx";
import { LoadingPlaceholder } from "./LoadingPlaceholder.tsx";
import { CurrencyStats } from "./CurrencyStats.tsx";
import { CurrencyData, CurrencyRates } from "../types/interfaces.ts";
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from "../config/axios-client.ts";
import 'react-toastify/dist/ReactToastify.css';

export const Main = () => {
    const [isCurrencyDataLoading, setIsCurrencyDataLoading] = useState<boolean>(true);
    const [isCurrencyRatesLoading, setIsCurrencyRatesLoading] = useState<boolean>(true);
    const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
    const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
    const [currencyRates, setCurrencyRates] = useState<CurrencyRates | null>(null);
    const [page, setPage] = useState<number>(1);
    const [sort, setSort] = useState<"asc" | "desc">("desc");

    const handleCurrencyChange = (currencyCode: string) => {
        setSelectedCurrency(currencyCode);
        setPage(1);
    }

    useEffect(() => {
        // Fetch currency rate data from the backend when page, sort or selected currency changes
        setIsCurrencyRatesLoading(true);

        axiosClient.get<CurrencyRates>(`currency/${selectedCurrency}/rates`, {
            params: {
                p: page,
                sort: sort
            }
        }).then((response) => {
            setCurrencyRates(response.data);
            setIsCurrencyRatesLoading(false);
        }).catch(() => {
            toast.error(`Error fetching currency rates for ${selectedCurrency}!`);
            setIsCurrencyRatesLoading(false);
        });
    }, [page, selectedCurrency, sort]);

    useEffect(() => {
        // Fetch currency stats (min, max, avg, last updated) when selected currency changes
        setIsCurrencyDataLoading(true);
        axiosClient.get<CurrencyData>(`currency/${selectedCurrency}`).then((response) => {
            setCurrencyData(response.data);
            setIsCurrencyDataLoading(false);
        }).catch(() => {
            toast.error(`Error fetching currency data for ${selectedCurrency}!`);
            setIsCurrencyDataLoading(false);
        });
    }, [selectedCurrency]);


    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex flex-col justify-center items-center bg-gray-100 py-3 shadow">
                <h1 className="font-bold text-2xl leading-none">Convert EUR</h1>
                <CurrencyDropdown currentCurrency={selectedCurrency} setCurrency={handleCurrencyChange} />
            </div>
            <div className="container mx-auto xl:px-10 px-5 pb-5 flex-1">
                <div className="flex justify-center items-center flex-col text-gray-800">
                    <h2 className="font-bold text-xl mt-4">1 EUR to {selectedCurrency} Exchange Rate</h2>
                    <p className="mt-1 text-gray-600 flex flex-row gap-x-0.5 items-center mb-4">
                        <span>Last updated:</span>
                        {isCurrencyDataLoading ?
                            <LoadingPlaceholder className="h-5 w-24" />
                            : (dateStrToFormattedDate(currencyData?.last_updated) ?? "N/A")
                        }
                    </p>
                    <div>
                        <CurrencyRateTable
                            currentPage={page}
                            rates={currencyRates?.rates}
                            sort={sort}
                            setSort={setSort}
                            setPage={setPage}
                            paginationData={currencyRates?.pagination}
                            currency={selectedCurrency}
                            isCurrencyLoading={isCurrencyRatesLoading}
                        />
                    </div>
                    <CurrencyStats
                        currency={selectedCurrency}
                        minRate={currencyData?.min_rate}
                        maxRate={currencyData?.max_rate}
                        avgRate={currencyData?.avg_rate}
                        isLoading={isCurrencyDataLoading}
                    />
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </main>
    );
};
