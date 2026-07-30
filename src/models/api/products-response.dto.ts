import { ProductDto } from './product.dto';

export interface ProductsResponseDto {
    responseCode: number;
    products: ProductDto[];
}
