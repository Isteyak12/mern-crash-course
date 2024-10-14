import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import {deleteProduct, updateProduct, createProduct, getProducts} from '../controller/product.controller.js';
const router = express.Router();

router.get("/hello", getProducts);
router.post("/addProduct", createProduct);
router.put("/:id", updateProduct);
router.post("/deleteProduct/:id", deleteProduct);

export default router;