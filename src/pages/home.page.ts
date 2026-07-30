import { Locator, Page } from '@playwright/test';

export class HomePage {
    public get productsNavLink(): Locator {
        return this.page.locator('a[href="/products"]');
    }

    public get loggedInAsIndicator(): Locator {
        return this.page.getByText('Logged in as', { exact: false });
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
}
