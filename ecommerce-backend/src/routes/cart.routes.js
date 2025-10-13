import express from "express";
import { getCartByUser, addToCart } from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/:userId", getCartByUser);
router.post("/add", addToCart);

export default router;