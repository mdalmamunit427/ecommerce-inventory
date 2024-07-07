import express from "express";
import { ProductControllers } from "./product.controller";
import { verfiyToken } from "../../middleware/authMiddleware";
import { isAdmin } from "../../middleware/adminMiddleware";
const router = express.Router();

router.get('/', ProductControllers.getAllProducts)
router.post('/',verfiyToken, isAdmin,  ProductControllers.createProduct)
router.get("/:productId",ProductControllers.getSingleProduct)
router.put("/:productId", verfiyToken, isAdmin, ProductControllers.updateProduct)
router.delete("/:productId", verfiyToken, isAdmin, ProductControllers.deleteProduct)


export const ProductRoutes = router;