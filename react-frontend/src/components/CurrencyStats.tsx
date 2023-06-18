import { LoadingPlaceholder } from "./LoadingPlaceholder.tsx";

export const CurrencyStats = (props: CurrencyStatsProps) => {

    if (props.isLoading) return (
        <>
            <LoadingPlaceholder className="h-5 w-60 mt-3" />
            <LoadingPlaceholder className="h-5 w-32 mt-1.5" />
        </>
    );

    return (
        <div className="mt-3 grid grid-cols-2 gap-x-2 text-sm text-center sm:gap-y-0 gap-y-1">
            <div>Minimum: {props.minRate ? `${props.minRate} ${props.currency}` : 'N/A'}</div>
            <div>Maximum: {props.maxRate ? `${props.maxRate} ${props.currency}` : 'N/A'}</div>
            <div className="col-span-2 text-center">Average: {props.avgRate ? `${props.avgRate} ${props.currency}` : 'N/A'}</div>
        </div>
    );
};

type CurrencyStatsProps = {
    currency: string;
    minRate?: string;
    maxRate?: string;
    avgRate?: string;
    isLoading: boolean;
}
