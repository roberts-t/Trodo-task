export interface CurrencyRate {
    id: number;
    rate: number;
    last_updated: string;
}

export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
}

export interface CurrencyData {
    currency: string;
    max_rate: string;
    min_rate: string;
    avg_rate: string;
    last_updated: string;
}

export interface CurrencyRates {
    rates: CurrencyRate[];
    pagination: PaginationData;
}
