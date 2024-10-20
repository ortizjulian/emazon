export interface ArticleRequest {
    name: string;
    description: string;
    price: number;
    quantity: number;
    brandId: number;
    categoryIds: number[];
}
