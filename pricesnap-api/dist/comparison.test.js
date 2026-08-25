"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const comparison_1 = require("./comparison");
(0, vitest_1.describe)('sortOffers', () => {
    (0, vitest_1.it)('puts in-stock offers before out-of-stock offers', () => {
        const offers = [
            { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false },
            { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true },
            { store: 'Target', price: 49, logo: 'target', inStock: true },
        ];
        (0, vitest_1.expect)((0, comparison_1.sortOffers)(offers).map((offer) => offer.store)).toEqual([
            'Amazon',
            'Target',
            'eBay',
        ]);
    });
});
(0, vitest_1.describe)('findCheapest', () => {
    (0, vitest_1.it)('returns the cheapest in-stock offer', () => {
        const offers = [
            { store: 'eBay', price: 38, logo: 'tag.fill', inStock: false },
            { store: 'Amazon', price: 45.99, logo: 'shippingbox.fill', inStock: true },
            { store: 'Walmart', price: 42, logo: 'cart.fill', inStock: true },
        ];
        (0, vitest_1.expect)((0, comparison_1.findCheapest)(offers)?.store).toBe('Walmart');
    });
});
(0, vitest_1.describe)('calculateDealScore', () => {
    (0, vitest_1.it)('returns great when the best price is more than 10 percent below average', () => {
        (0, vitest_1.expect)((0, comparison_1.calculateDealScore)(79, 96)).toBe('great');
    });
    (0, vitest_1.it)('returns overpriced when the best price is above average', () => {
        (0, vitest_1.expect)((0, comparison_1.calculateDealScore)(10, 8.5)).toBe('overpriced');
    });
});
(0, vitest_1.describe)('buildProductResult', () => {
    (0, vitest_1.it)('returns sorted offers and a computed deal score', () => {
        const product = {
            barcode: '12345678',
            name: 'Test Product',
            brand: 'Test Brand',
            image: 'shippingbox.fill',
            avgPrice90Day: 100,
            offers: [
                { store: 'Store B', price: 95, logo: 'b.circle.fill', inStock: true },
                { store: 'Store A', price: 80, logo: 'a.circle.fill', inStock: true },
                { store: 'Store C', price: 70, logo: 'c.circle.fill', inStock: false },
            ],
        };
        const result = (0, comparison_1.buildProductResult)(product);
        (0, vitest_1.expect)(result.offers.map((offer) => offer.store)).toEqual([
            'Store A',
            'Store B',
            'Store C',
        ]);
        (0, vitest_1.expect)(result.dealScore).toBe('great');
    });
});
