export interface IPagination<T> {
    total_items: number;
    total_pages: number;
    prev: string;
    next: string;
    items: T[];
}

export interface ICar {
    id: number;
    brand: string;
    price: number;
    year: number;
    photo?: string;
}