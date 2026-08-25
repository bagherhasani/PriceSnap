"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const products_1 = require("./routes/products");
const app = (0, fastify_1.default)({ logger: true });
app.get('/health', async () => {
    return { status: 'ok' };
});
app.register(products_1.productRoutes);
app.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
    if (err)
        throw err;
});
