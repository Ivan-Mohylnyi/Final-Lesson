import { HomePage, ProductsPage, CartPage } from '../pages';
import { test as base } from './apis.fixture';

export interface PagesFixture {
    homePage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
}

export const test = base.extend<PagesFixture>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});
