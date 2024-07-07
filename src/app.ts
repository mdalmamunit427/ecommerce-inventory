import express from "express"
import cors from "cors"
import { ProductRoutes } from "./app/modules/products/product.routes";
import { OrderRoutes } from "./app/modules/orders/order.routes";
import { UserRoutes } from "./app/modules/users/user.routes";
const app = express()
const port = 5000;

// parsers option;
app.use(express.json());
app.use(cors());


// routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', UserRoutes);

app.get('/', (req, res) => {
  res.send('Ecommerce Inventory Server is running..!')
})

export default app;