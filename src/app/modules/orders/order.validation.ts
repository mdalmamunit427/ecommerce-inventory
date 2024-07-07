import { z } from "zod";

const orderValidationSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
      }),
      productId: z.string({
        required_error: "Product ID is required",
        invalid_type_error: "Product ID must be a string of Mongodb _id",
      }),
      quantity: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
      }),
      price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      }),
  });

  export default orderValidationSchema;