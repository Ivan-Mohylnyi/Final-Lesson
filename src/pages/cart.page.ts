import { Locator, Page } from '@playwright/test';

export class CartPage {
    public get cartRows(): Locator {
        return this.page.locator('#cart_info_table tbody tr');
    }

    public get cartProductNames(): Locator {
        return this.page.locator('.cart_description h4 a');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    }
}
