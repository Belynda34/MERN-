import express from "express";
import Product from "../models/products.js";
import mongoose from "mongoose";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

 router.get("/get",getProducts);
 router.post ("/create",createProduct);
 router.put("/:id",updateProduct );
 router.delete("/:id", deleteProduct);


export default router;