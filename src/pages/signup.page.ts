import { Locator, Page } from '@playwright/test';
import { CreateAccountRequestDto } from '../models';

export class SignupPage {
    public get titleMrRadio(): Locator {
        return this.page.locator('#id_gender1');
    }

    public get passwordInput(): Locator {
        return this.page.locator('[data-qa="password"]');
    }

    public get createAccountButton(): Locator {
        return this.page.locator('[data-qa="create-account"]');
    }

    public get accountCreatedHeading(): Locator {
        return this.page.locator('[data-qa="account-created"]');
    }

    public get continueButton(): Locator {
        return this.page.locator('[data-qa="continue-button"]');
    }

    public constructor(private page: Page) {}

    public async fillAccountInformation(request: CreateAccountRequestDto): Promise<void> {
        if (request.title === 'Mr') {
            await this.titleMrRadio.check({ force: true });
        } else {
            await this.page.locator('#id_gender2').check({ force: true });
        }

        await this.passwordInput.fill(request.password);
        await this.page.locator('[data-qa="days"]').selectOption(request.birth_date);
        await this.page.locator('[data-qa="months"]').selectOption(request.birth_month);
        await this.page.locator('[data-qa="years"]').selectOption(request.birth_year);
        await this.page.locator('[data-qa="first_name"]').fill(request.firstname);
        await this.page.locator('[data-qa="last_name"]').fill(request.lastname);
        await this.page.locator('[data-qa="company"]').fill(request.company);
        await this.page.locator('[data-qa="address"]').fill(request.address1);
        await this.page.locator('[data-qa="country"]').selectOption(request.country);
        await this.page.locator('[data-qa="state"]').fill(request.state);
        await this.page.locator('[data-qa="city"]').fill(request.city);
        await this.page.locator('[data-qa="zipcode"]').fill(request.zipcode);
        await this.page.locator('[data-qa="mobile_number"]').fill(request.mobile_number);
    }

    public async submit(): Promise<void> {
        await this.createAccountButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async continueToHome(): Promise<void> {
        await this.continueButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
