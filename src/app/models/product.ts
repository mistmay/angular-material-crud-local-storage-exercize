export type Category = 'Fruits' | 'Vegetables' | 'Electronics';
export type Freshness = 'Brand New' | 'Second Hand' | 'Refurbished';

export interface Product {
    productName: string,
    category: Category,
    freshness: Freshness,
    price: number,
    comment: string,
    date: Date,
    id: number
}