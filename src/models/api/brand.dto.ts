export interface BrandDto {
    id: number;
    brand: string;
}

export interface BrandsResponseDto {
    responseCode: number;
    brands: BrandDto[];
}
