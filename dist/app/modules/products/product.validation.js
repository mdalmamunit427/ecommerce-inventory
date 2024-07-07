"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryValidationSchema = exports.variantValidationSchema = void 0;
const zod_1 = require("zod");
exports.variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string(),
});
exports.inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0),
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name of Product is required",
        invalid_type_error: "Name must be a string",
    }),
    description: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(exports.variantValidationSchema),
    inventory: exports.inventoryValidationSchema
});
exports.default = productValidationSchema;
