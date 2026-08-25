"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = productRoutes;
const comparison_1 = require("../comparison");
const mockData_1 = require("../mockData");
const types_1 = require("../types");
async function productRoutes(app) {
    app.get('/products/:barcode', async (request, reply) => {
        const parsed = types_1.BarcodeParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                error: 'Invalid barcode',
            });
        }
        const product = mockData_1.products[parsed.data.barcode];
        if (!product) {
            return reply.status(404).send({
                error: 'Product not found',
            });
        }
        return (0, comparison_1.buildProductResult)(product);
    });
}
