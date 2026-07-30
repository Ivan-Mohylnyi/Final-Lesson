import { expect, test } from '../../src/fixtures';

test.describe('Product details navigation', () => {
    test('should open a product from the listing and show matching details', async ({ productsPage, productDetailPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        const expectedName = (await productsPage.productNames.first().innerText()).trim();

        await test.step('Open the first product details page', async () => {
            await productsPage.openProductDetailsByIndex(0);
        });

        await test.step('Verify the product name and price are shown', async () => {
            await expect(productDetailPage.productName).toHaveText(expectedName);
            await expect(productDetailPage.productPrice).toBeVisible();
        });
    });
});
