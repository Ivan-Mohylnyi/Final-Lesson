import { Locator, Page } from '@playwright/test';

export class ProductDetailPage {
    public get productName(): Locator {
        return this.page.locator('.product-information h2');
    }

    public get productPrice(): Locator {
        return this.page.locator('.product-information span span').first();
    }

    public constructor(private page: Page) {}
}
