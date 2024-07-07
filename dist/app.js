"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/modules/products/product.routes");
const order_routes_1 = require("./app/modules/orders/order.routes");
const user_routes_1 = require("./app/modules/users/user.routes");
const app = (0, express_1.default)();
const port = 5000;
// parsers option;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api/products', product_routes_1.ProductRoutes);
app.use('/api/orders', order_routes_1.OrderRoutes);
app.use('/api/users', user_routes_1.UserRoutes);
app.get('/', (req, res) => {
    res.send('Ecommerce Inventory Server is running..!');
});
exports.default = app;
