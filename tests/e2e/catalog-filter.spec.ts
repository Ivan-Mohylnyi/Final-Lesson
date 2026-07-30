import { expect as expectChai } from 'chai';
import { expect, test } from '../../src/fixtures';

test.describe('Catalog category filter', () => {
    test('should show only Women - Dress products when category is selected', async ({ productsPage }) => {
        await test.step('Open products page', async () => {
            await productsPage.goTo();
        });

        await test.step('Filter by Women > Dress category', async () => {
            await productsPage.openWomenDressCategory();
        });

        await test.step('Verify page heading and non-empty results', async () => {
            await expect(productsPage.categoryPageTitle).toContainText('Women - Dress Products');
            const count = await productsPage.productCards.count();
            expectChai(count).to.be.greaterThan(0);
        });
    });
});
