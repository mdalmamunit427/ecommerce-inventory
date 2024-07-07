import { model, Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

const VariantSchema = new Schema<TVariant>({
    type: String, 
    value: String
}, {_id: false})
const InventorySchema = new Schema<TInventory>({
    quantity: Number,
    inStock: Boolean
}, {_id: false})

const ProductSchema = new Schema<TProduct>({
    name : {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    category: String,
    tags: [String],
    variants: [VariantSchema],
    inventory: InventorySchema
})

export const Product = model('Product', ProductSchema)