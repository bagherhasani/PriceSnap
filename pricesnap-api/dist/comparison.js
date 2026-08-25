"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortOffers = sortOffers;
exports.findCheapest = findCheapest;
exports.calculateDealScore = calculateDealScore;
exports.buildProductResult = buildProductResult;
function sortOffers(offers) {
    return [...offers].sort((left, right) => {
        if (left.inStock !== right.inStock) {
            return left.inStock ? -1 : 1;
        }
        return left.price - right.price;
    });
}
function findCheapest(offers) {
    const inStockOffers = offers.filter((offer) => offer.inStock);
    if (inStockOffers.length === 0) {
        return null;
    }
    return sortOffers(inStockOffers)[0];
}
function calculateDealScore(bestPrice, avgPrice90Day) {
    const savingsRatio = (avgPrice90Day - bestPrice) / avgPrice90Day;
    if (savingsRatio > 0.10) {
        return 'great';
    }
    if (savingsRatio > 0) {
        return 'good';
    }
    if (bestPrice === avgPrice90Day) {
        return 'fair';
    }
    return 'overpriced';
}
function buildProductResult(product) {
    const offers = sortOffers(product.offers);
    const cheapest = offers.find((offer) => offer.inStock);
    const bestPrice = cheapest?.price ?? offers[0]?.price ?? product.avgPrice90Day;
    return {
        ...product,
        offers,
        dealScore: calculateDealScore(bestPrice, product.avgPrice90Day),
    };
}
