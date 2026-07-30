import { APIResponse } from '@playwright/test';
import { IApiService } from '../services/i-api.service';
import { ErrorResponseDto, ProductsResponseDto } from '../models';

export class ProductsApi {
    public constructor(private readonly apiService: IApiService<APIResponse>) {}

    public async getProductsListAsync(): Promise<[APIResponse, ProductsResponseDto]> {
        const response = await this.apiService.getAsync('/productsList');
        const responseBody = await response.json() as ProductsResponseDto;

        return [response, responseBody];
    }

    public async getBrandsListAsync(): Promise<[APIResponse, unknown]> {
        const response = await this.apiService.getAsync('/brandsList');
        const responseBody = await response.json() as unknown;

        return [response, responseBody];
    }

    public async searchProductAsync(searchText: string): Promise<[APIResponse, ProductsResponseDto]> {
        const response = await this.apiService.postFormAsync('/searchProduct', { search_product: searchText });
        const responseBody = await response.json() as ProductsResponseDto;

        return [response, responseBody];
    }

    public async searchProductWithoutParamAsync(): Promise<[APIResponse, ErrorResponseDto]> {
        const response = await this.apiService.postFormAsync('/searchProduct', {});
        const responseBody = await response.json() as ErrorResponseDto;

        return [response, responseBody];
    }
}
