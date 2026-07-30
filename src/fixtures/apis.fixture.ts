import { test as base } from './services.fixture';
import { ProductsApi } from '../apis';

export interface ApisFixture {
    productsApi: ProductsApi;
}

export const test = base.extend<ApisFixture>({
    productsApi: async ({ apiService }, use) => {
        const productsApi = new ProductsApi(apiService);
        await use(productsApi);
    }
});
