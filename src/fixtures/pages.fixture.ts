import { HomePage, ProductsPage, CartPage, LoginPage, SignupPage, ProductDetailPage } from '../pages';
import { test as base } from './apis.fixture';

export interface PagesFixture {
    homePage: HomePage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    loginPage: LoginPage;
    signupPage: SignupPage;
    productDetailPage: ProductDetailPage;
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
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    }
});
