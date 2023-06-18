import { TableData } from "./rate-table/TableData.tsx";
import { TableHeader } from "./rate-table/TableHeader.tsx";
import { dateStrToFormattedDate } from "../helpers/date.helper.ts";
import { Pagination } from "./Pagination.tsx";
import { CgSpinner } from "react-icons/cg";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { CurrencyRate, PaginationData } from "../types/interfaces.ts";
import { JSX } from "react";

export const CurrencyRateTable = (props: CurrencyRateTableProps) => {

    const swapSort = () => {
        if (props.sort === "asc") {
            props.setSort("desc");
        } else {
            props.setSort("asc");
        }
    }

    const renderRateRows = () => {
        const rateRows: JSX.Element[] = [];

        // Render 10 rows and fill with rate data if available
        for (let row = 0; row < 10; row++) {
            const currencyRate = props.rates?.[row];
            rateRows.push(
                <tr key={currencyRate?.id ?? `r-${row}`}>
                    <TableData>{dateStrToFormattedDate(currencyRate?.last_updated)}</TableData>
                    <TableData>{currencyRate?.rate}</TableData>
                </tr>
            );

        }

        return rateRows;
    }

    return (
        <div>
            <Pagination
                setPage={props.setPage}
                currentPage={props.currentPage}
                paginationData={props.paginationData}
                className={"mb-1"}
            />
            <div className="relative">
                <table className="sm:table-auto table-fixed sm:w-auto w-full">
                    <thead>
                        <tr>
                            <TableHeader>
                                <button
                                    className="flex items-center justify-center gap-x-0.5"
                                    onClick={swapSort}
                                    type="button"
                                >
                                    Date
                                    <span className="text-sm">
                                        {props.sort === "asc" ? <FaLongArrowAltDown /> : <FaLongArrowAltUp />}
                                    </span>
                                </button>
                            </TableHeader>
                            <TableHeader>EUR to {props.isCurrencyLoading ? '...' : props.currency}</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRateRows()}
                    </tbody>
                </table>
                {props.isCurrencyLoading &&
                    <>
                        <div className="absolute inset-0 rounded opacity-70 w-full h-full bg-gray-200" />
                        <div className="absolute inset-0 inline-flex justify-center items-center">
                            <CgSpinner className="animate-spin text-gray-700 text-4xl" />
                        </div>
                    </>
                }
            </div>
            <Pagination
                setPage={props.setPage}
                currentPage={props.currentPage}
                paginationData={props.paginationData}
                className={"mt-1"}
            />
        </div>
    );
};

type CurrencyRateTableProps = {
    rates: CurrencyRate[] | undefined;
    currency: string;
    setPage: (page: number) => void;
    currentPage: number;
    paginationData: PaginationData | undefined;
    isCurrencyLoading: boolean;
    sort: "asc" | "desc";
    setSort: (sort: "asc" | "desc") => void;
}
