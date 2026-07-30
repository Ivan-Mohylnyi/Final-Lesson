import { ProductCategoryDto } from './product-category.dto';

export interface ProductDto {
    id: number;
    name: string;
    price: string;
    brand: string;
    category: ProductCategoryDto;
}
