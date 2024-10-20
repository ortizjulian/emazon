export interface BrandRequest {
    name: string;
    description: string;
}

export interface BrandResponse extends BrandRequest {
    id: number
}