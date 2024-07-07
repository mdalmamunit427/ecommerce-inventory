import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createAProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getProductsFromDB = async (searchTerm = "") => {
    const query = searchTerm ? {name: {$regex: searchTerm, $options: "i"}} : {}
    const data = await Product.find(query);
    return data;
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}

const updateProductIntoDB = async (productId: string, data: TProduct) => {
    const result = await Product.findByIdAndUpdate(productId, data, {new: true});
    return result;
}

const deleteProductFromDB = async (productId: string) => {
    const result = await Product.findByIdAndDelete(productId);
    return result;
}
 
export const ProductServices = {
    createAProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}