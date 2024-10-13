import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());

app.listen("5000", () => {
    connectDB();
    console.log("Server started at 'http://localhost:5000'");
});

app.get("/api/healthcheck", (req, res) => {
    res.send("Server is running!");
});

app.post("/api/addProduct", async (req, res) => {
    const product = req.body;

    if (!product || !product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.log(`Error in saving to DB: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
});

app.post("/api/deleteProduct/:id", async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product Deleted!"
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product Not Found!"
        })
    }
});

console.log(process.env.MONGO_URI);