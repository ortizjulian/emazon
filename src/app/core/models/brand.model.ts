export interface BrandRequest {
    name: string;
    description: string;
}

export interface BrandReponse extends BrandRequest {
    id: number
}