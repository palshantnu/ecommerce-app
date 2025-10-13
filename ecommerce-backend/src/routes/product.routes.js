import express from "express";
import upload from "../middleware/upload.js";
import { createProduct, getProducts } from "../controllers/product.controller.js";
const router = express.Router();

router.post("/", upload.single('image'), createProduct);
router.get("/", getProducts);

export default router;