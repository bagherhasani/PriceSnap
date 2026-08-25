"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarcodeParamsSchema = exports.BarcodeSchema = void 0;
const zod_1 = require("zod");
exports.BarcodeSchema = zod_1.z.string().regex(/^\d{8,14}$/);
exports.BarcodeParamsSchema = zod_1.z.object({
    barcode: exports.BarcodeSchema,
});
