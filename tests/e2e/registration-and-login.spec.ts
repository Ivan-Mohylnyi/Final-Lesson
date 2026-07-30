import { expect as expectChai } from 'chai';
import { CreateAccountRequestDto } from '../../src/models';
import { expect, test } from '../../src/fixtures';

function buildTestAccount(): CreateAccountRequestDto {
    const uniqueEmail = `qa_final_lesson_e2e_${Date.now()}@example.com`;

    return {
        name: 'QA E2E',
        email: uniqueEmail,
        password: 'Test1234!',
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1990',
        firstname: 'QA',
        lastname: 'E2E',
        company: 'Final Lesson',
        address1: '123 Test St',
        address2: '',
        country: 'United States',
        zipcode: '12345',
        state: 'Test',
        city: 'Test',
        mobile_number: '1234567890'
    };
}

test.describe('Registration and login', () => {
    test('should register a new account through the UI and see it logged in', async ({ loginPage, signupPage, homePage, accountApi }) => {
        const account = buildTestAccount();

        try {
            await test.step('Start signup with name and email', async () => {
                await loginPage.goTo();
                await loginPage.startSignup(account.name, account.email);
            });

            await test.step('Fill account information and submit', async () => {
                await signupPage.fillAccountInformation(account);
                await signupPage.submit();
                await expect(signupPage.accountCreatedHeading).toBeVisible();
            });

            await test.step('Continue and verify the user is logged in', async () => {
                await signupPage.continueToHome();
                await expect(homePage.loggedInAsIndicator).toBeVisible();
            });
        } finally {
            await test.step('Clean up the created account via API', async () => {
                const [, body] = await accountApi.deleteAccountAsync(account.email, account.password);
                expectChai(body.responseCode).to.equal(200);
            });
        }
    });
});
