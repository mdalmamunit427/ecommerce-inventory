import { Request, Response } from "express"
import orderValidationSchema from "./order.validation"
import { Product } from "../products/product.model";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
    //zod validation
    const zodValidation = orderValidationSchema.safeParse(req.body);
    if( typeof zodValidation.error !== "undefined"  && zodValidation.error.name === "ZodError") {
        const errorLists = zodValidation.error.issues.map((err) => err.message);
        return res.status(500).json({
            success: false,
            message: "Validation error",
            errors: errorLists
        })
    } 
    if(zodValidation.success) {
        const product = await Product.findById(zodValidation.data.productId);
        if(product && product.inventory.quantity < zodValidation.data.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in this inventory"
            })
        }

        if(product) {
            // we have total 70 products
            //product.inventory.quantity = 60
            product.inventory.quantity = product.inventory.quantity -zodValidation.data.quantity;
            product.inventory.inStock = product.inventory.quantity === 0 ? false : true;
            const newOrder = await OrderServices.createANewOrder(zodValidation.data);

            await product.save();
            return res.status(200).json({
                success: true,
                message: "Order placed successfully",
                data: newOrder
            })
        }
    }
     
    } catch (err: any) {
     res.status(500).json({
         success: false,
         message: err.message ||  "Something went wrong",
         error: err
     })
    }
 };

 const handleGetAllOrders = async (req: Request, res: Response) => {
    const email = req.query.email;
    try {
        const orders = await OrderServices.getAllOrdersFromDB(email as string | undefined);
        if(orders.length  === 0) {
            return res.status(200).json({
                success: true,
                message: "No orders found for this email",
                data: []
            })
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })

        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
    } 
    
 }


 export const OrderController = {
    createOrder,
    handleGetAllOrders
 }