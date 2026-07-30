import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/i-api.service';
import { assertShape } from '../services/assert-shape';
import { BrandsResponseDto, ErrorResponseDto, ProductsResponseDto } from '../models';

export class ProductsApi {
    public constructor(private readonly apiService: IApiService<APIResponse>) {}

    public async getProductsListAsync(): Promise<[APIResponse, ProductsResponseDto]> {
        const response = await this.apiService.getAsync('/productsList');
        const responseBody: unknown = await response.json();
        assertShape<ProductsResponseDto>(responseBody, ['responseCode', 'products'], 'GET /productsList');

        return [response, responseBody];
    }

    public async getBrandsListAsync(): Promise<[APIResponse, BrandsResponseDto]> {
        const response = await this.apiService.getAsync('/brandsList');
        const responseBody: unknown = await response.json();
        assertShape<BrandsResponseDto>(responseBody, ['responseCode', 'brands'], 'GET /brandsList');

        return [response, responseBody];
    }

    public async searchProductAsync(searchText: string): Promise<[APIResponse, ProductsResponseDto]> {
        const response = await this.apiService.postFormAsync('/searchProduct', { search_product: searchText });
        const responseBody: unknown = await response.json();
        assertShape<ProductsResponseDto>(responseBody, ['responseCode', 'products'], 'POST /searchProduct');

        return [response, responseBody];
    }

    public async searchProductWithoutParamAsync(): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/searchProduct', {});
        const responseBody: unknown = await response.json();
        assertShape<ErrorResponseDto>(responseBody, ['responseCode', 'message'], 'POST /searchProduct (no param)');

        return [response, responseBody];
    }
}
