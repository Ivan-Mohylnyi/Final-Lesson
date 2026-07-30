import { expect } from 'chai';
import { CreateAccountRequestDto } from '../../src/models';
import { test } from '../../src/fixtures';

function buildTestAccount(): CreateAccountRequestDto {
    const uniqueEmail = `qa_final_lesson_${Date.now()}@example.com`;

    return {
        name: 'QA Automation',
        email: uniqueEmail,
        password: 'Test1234!',
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1990',
        firstname: 'QA',
        lastname: 'Automation',
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

test.describe('Account API', () => {
    test('should create, read and delete an account (full lifecycle)', async ({ accountApi }) => {
        const account = buildTestAccount();

        await test.step('Create the account', async () => {
            const [response, body] = await accountApi.createAccountAsync(account);
            expect(response.status()).to.equal(200);
            expect(body.responseCode).to.equal(201);
        });

        try {
            await test.step('Read it back by email', async () => {
                const [response, body] = await accountApi.getUserDetailByEmailAsync(account.email);
                expect(response.status()).to.equal(200);
                expect(body.responseCode).to.equal(200);
                expect(body.user.email).to.equal(account.email);
                expect(body.user.name).to.equal(account.name);
                expect(body.user.first_name).to.equal(account.firstname);
            });

            await test.step('Verify login with the new credentials', async () => {
                const [response, body] = await accountApi.verifyLoginAsync(account.email, account.password);
                expect(response.status()).to.equal(200);
                expect(body.responseCode).to.equal(200);
            });
        } finally {
            await test.step('Delete the account (cleanup)', async () => {
                const [response, body] = await accountApi.deleteAccountAsync(account.email, account.password);
                expect(response.status()).to.equal(200);
                expect(body.responseCode).to.equal(200);
            });
        }
    });

    test('should return 404 when verifying login for a non-existent user', async ({ accountApi }) => {
        const [response, body] = await accountApi.verifyLoginAsync(`nobody_${Date.now()}@example.com`, 'whatever');

        expect(response.status()).to.equal(200);
        expect(body.responseCode).to.equal(404);
        expect(body.message).to.equal('User not found!');
    });

    test('should return 400 when verifying login without an email parameter', async ({ accountApi }) => {
        const [response, body] = await accountApi.verifyLoginWithoutEmailAsync('whatever');

        expect(response.status()).to.equal(200);
        expect(body.responseCode).to.equal(400);
        expect(body.message).to.include('email or password parameter is missing');
    });
});
