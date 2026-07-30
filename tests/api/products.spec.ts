import { expect } from 'chai';
import { test } from '../../src/fixtures';

test.describe('Products API', () => {
    test('should return all products with status 200', async ({ productsApi }) => {
        const [response, body] = await productsApi.getProductsListAsync();

        expect(response.status()).to.equal(200);
        expect(body.responseCode).to.equal(200);
        expect(body.products).to.be.an('array').that.is.not.empty;
        expect(body.products[0]).to.have.all.keys('id', 'name', 'price', 'brand', 'category');
    });

    test('should return brands list with status 200', async ({ productsApi }) => {
        const [response] = await productsApi.getBrandsListAsync();

        expect(response.status()).to.equal(200);
    });

    test('should return only products matching the search text', async ({ productsApi }) => {
        const [response, body] = await productsApi.searchProductAsync('Dress');

        expect(response.status()).to.equal(200);
        expect(body.responseCode).to.equal(200);
        expect(body.products).to.be.an('array').that.is.not.empty;
        for (const product of body.products) {
            const matchesName = product.name.toLowerCase().includes('dress');
            const matchesCategory = product.category.category.toLowerCase().includes('dress');
            expect(matchesName || matchesCategory).to.be.true;
        }
    });
});
