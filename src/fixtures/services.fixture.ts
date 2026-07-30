import { test as base } from '@playwright/test';
import { ConfigService, PlaywrightApiService } from '../services';

export interface ServicesFixture {
    configService: ConfigService;
    apiService: PlaywrightApiService;
}

export const test = base.extend<ServicesFixture>({
    // eslint-disable-next-line no-empty-pattern -- Playwright fixture callbacks require object destructuring as the first argument.
    configService: async ({}, use) => {
        const configService = new ConfigService();
        await use(configService);
    },
    apiService: async ({ configService }, use) => {
        const apiService = new PlaywrightApiService(configService.config.apiBaseUrl);
        await use(apiService);
    }
});
