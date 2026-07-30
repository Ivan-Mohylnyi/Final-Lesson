import { expect } from 'chai';
import { test } from '../../src/fixtures';

test.describe('Product search and cart', () => {
    test('should find matching products and add one to the cart', async ({ productsPage, cartPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        await test.step('Search for a product', async () => {
            await productsPage.searchForProduct('Dress');
        });

        await test.step('Verify search results are shown', async () => {
            const count = await productsPage.productCards.count();
            expect(count).to.be.greaterThan(0);
        });

        const firstProductName = await productsPage.productNames.first().innerText();

        await test.step('Add the first result to the cart', async () => {
            await productsPage.addProductToCartByIndex(0);
            await productsPage.cartModalContinueButton.click();
        });

        await test.step('Verify the product is in the cart', async () => {
            await cartPage.goTo();
            const cartText = await cartPage.cartProductNames.allInnerTexts();
            expect(cartText.some((name) => name.trim() === firstProductName.trim())).to.be.true;
        });
    });
});
