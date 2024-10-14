import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT=process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});

app.get("/api/healthcheck", (req, res) => {
    res.send("Server is running!");
});



console.log(process.env.MONGO_URI);