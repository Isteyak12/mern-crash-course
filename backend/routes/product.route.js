import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {deleteProduct, updateProduct, createProduct, getProducts} from '../controller/product.controller.js';
const router = express.Router();

router.get("/products/hello", getProducts);
router.post("/addProduct", createProduct);
router.put("/products/:id", updateProduct);
router.post("/deleteProduct/:id", deleteProduct);

export default router;