"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductControllers.getAllProducts);
router.post('/', authMiddleware_1.verfiyToken, adminMiddleware_1.isAdmin, product_controller_1.ProductControllers.createProduct);
router.get("/:productId", product_controller_1.ProductControllers.getSingleProduct);
router.put("/:productId", authMiddleware_1.verfiyToken, adminMiddleware_1.isAdmin, product_controller_1.ProductControllers.updateProduct);
router.delete("/:productId", authMiddleware_1.verfiyToken, adminMiddleware_1.isAdmin, product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
