import { expect } from 'chai';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'path';
import { test } from '@playwright/test';
import { PlaywrightApiService } from '../../src/services';
import { ProductsApi } from '../../src/apis';

const { like, eachLike, integer, string } = MatchersV3;

const provider = new PactV3({
    consumer: 'FinalLessonUiClient',
    provider: 'AutomationExerciseProductsApi',
    dir: path.resolve(process.cwd(), 'pacts')
});

test.describe('Products API contract (consumer-side Pact)', () => {
    test('GET /productsList returns a list of products matching the agreed contract', async () => {
        const expectedProduct = {
            id: integer(1),
            name: string('Blue Top'),
            price: string('Rs. 500'),
            brand: string('Polo'),
            category: like({
                usertype: like({ usertype: string('Women') }),
                category: string('Tops')
            })
        };

        provider
            .given('products exist')
            .uponReceiving('a request for the full products list')
            .withRequest({ method: 'GET', path: '/productsList' })
            .willRespondWith({
                status: 200,
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: {
                    responseCode: integer(200),
                    products: eachLike(expectedProduct)
                }
            });

        await provider.executeTest(async (mockServer) => {
            const apiService = new PlaywrightApiService(mockServer.url);
            const productsApi = new ProductsApi(apiService);

            const [response, body] = await productsApi.getProductsListAsync();

            expect(response.status()).to.equal(200);
            expect(body.responseCode).to.equal(200);
            expect(body.products).to.be.an('array').that.is.not.empty;
        });
    });
});
