import { test as base } from './services.fixture';
import { ProductsApi, AccountApi } from '../apis';

export interface ApisFixture {
    productsApi: ProductsApi;
    accountApi: AccountApi;
}

export const test = base.extend<ApisFixture>({
    productsApi: async ({ apiService }, use) => {
        const productsApi = new ProductsApi(apiService);
        await use(productsApi);
    },
    accountApi: async ({ apiService }, use) => {
        const accountApi = new AccountApi(apiService);
        await use(accountApi);
    }
});
