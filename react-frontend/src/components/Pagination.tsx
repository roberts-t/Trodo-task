import { PageNumber } from "./pagination/PageNumber.tsx";
import { PageSwitchBtn } from "./pagination/PageSwitchBtn.tsx";
import { FiChevronRight, FiChevronLeft, FiChevronsRight, FiChevronsLeft } from 'react-icons/fi';
import { PaginationData } from "../types/interfaces.ts";

const PAGE_RANGE = 3;
export const Pagination = ({ setPage, paginationData, currentPage, className }: PaginationProps) => {
    const lastPage = paginationData?.last_page ?? 1;

    // If there is only one page, don't render pagination
    if (lastPage && lastPage <= 1) {
        return null;
    }

    // Calculate start and end page numbers in current range
    let startPage = Math.max(currentPage - Math.ceil(PAGE_RANGE/2), 0);
    let endPage = Math.min(currentPage + Math.ceil(PAGE_RANGE/2) - 1, lastPage);
    if (endPage - startPage < PAGE_RANGE) {
        const difference = PAGE_RANGE - (endPage - startPage);
        startPage = Math.max(startPage - difference, 0);
    }
    if (endPage < PAGE_RANGE) {
        const difference = PAGE_RANGE - endPage;
        endPage = Math.min(endPage + difference, lastPage);
    }

    // Create an array of page numbers to render
    const pageNumbers = Array.from({length: endPage - startPage}, (_, i) => i + startPage + 1);

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <PageSwitchBtn
                disabled={currentPage < Math.ceil(PAGE_RANGE / 2) + 1}
                onClick={() => setPage(1)}
            >
                <FiChevronsLeft className="text-xl" />
            </PageSwitchBtn>
            <PageSwitchBtn
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
            >
                <FiChevronLeft className="text-xl" />
            </PageSwitchBtn>
            <ul className="inline-block">
                {pageNumbers.map((pageNumber) => {
                    return (
                        <PageNumber onClick={() => setPage(pageNumber)} key={pageNumber} pageNumber={pageNumber} active={pageNumber === currentPage} />
                    );
                })}
            </ul>
            <PageSwitchBtn
                disabled={currentPage === lastPage}
                onClick={() => setPage(currentPage + 1)}
            >
                <FiChevronRight className="text-xl" />
            </PageSwitchBtn>
            <PageSwitchBtn
                disabled={lastPage - currentPage < Math.ceil(PAGE_RANGE / 2)}
                onClick={() => setPage(lastPage)}
            >
                <FiChevronsRight className="text-xl" />
            </PageSwitchBtn>
        </div>
    );
};

type PaginationProps = {
    setPage: (page: number) => void;
    currentPage: number;
    paginationData: PaginationData | undefined;
    className?: string;
}
