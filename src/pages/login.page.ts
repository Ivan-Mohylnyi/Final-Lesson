import { Locator, Page } from '@playwright/test';

export class LoginPage {
    public get signupNameInput(): Locator {
        return this.page.locator('[data-qa="signup-name"]');
    }

    public get signupEmailInput(): Locator {
        return this.page.locator('[data-qa="signup-email"]');
    }

    public get signupButton(): Locator {
        return this.page.locator('[data-qa="signup-button"]');
    }

    public get loginEmailInput(): Locator {
        return this.page.locator('[data-qa="login-email"]');
    }

    public get loginPasswordInput(): Locator {
        return this.page.locator('[data-qa="login-password"]');
    }

    public get loginButton(): Locator {
        return this.page.locator('[data-qa="login-button"]');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    }

    public async startSignup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async login(email: string, password: string): Promise<void> {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
