"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const vitest_1 = require("vitest");
const products_1 = require("./products");
(0, vitest_1.describe)('productRoutes', () => {
    (0, vitest_1.it)('returns 400 for a malformed barcode', async () => {
        const app = (0, fastify_1.default)();
        await app.register(products_1.productRoutes);
        const response = await app.inject({
            method: 'GET',
            url: '/products/abcdefgh',
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.json()).toEqual({
            error: 'Invalid barcode',
        });
    });
    (0, vitest_1.it)('returns 200 for a known barcode', async () => {
        const app = (0, fastify_1.default)();
        await app.register(products_1.productRoutes);
        const response = await app.inject({
            method: 'GET',
            url: '/products/0194252914687',
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(response.json().barcode).toBe('0194252914687');
    });
});
