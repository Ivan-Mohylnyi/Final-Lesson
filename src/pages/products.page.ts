import { Locator, Page } from '@playwright/test';

export class ProductsPage {
    public get searchInput(): Locator {
        return this.page.locator('#search_product');
    }

    public get searchButton(): Locator {
        return this.page.locator('#submit_search');
    }

    public get productCards(): Locator {
        return this.page.locator('.product-image-wrapper');
    }

    public get productNames(): Locator {
        return this.page.locator('.product-image-wrapper .productinfo p');
    }

    public get cartModalContinueButton(): Locator {
        return this.page.locator('#cartModal .btn-success');
    }

    public get categoryPageTitle(): Locator {
        return this.page.locator('h2.title');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
        await this.searchInput.waitFor();
    }

    public async openWomenDressCategory(): Promise<void> {
        await this.page.locator('a[href="#Women"]').click();
        await this.page.locator('a[href="/category_products/1"]').click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async searchForProduct(text: string): Promise<void> {
        await this.searchInput.fill(text);
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async addProductToCartByIndex(index: number): Promise<void> {
        const card = this.productCards.nth(index);
        await card.hover();
        await card.locator('a.add-to-cart').first().click();
    }

    public async openProductDetailsByIndex(index: number): Promise<void> {
        const card = this.productCards.nth(index);
        const href = await card.locator('a[href^="/product_details/"]').first().getAttribute('href');
        await this.page.goto(href as string, { waitUntil: 'domcontentloaded' });
    }
}
