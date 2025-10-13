import db from "../models/index.js";
const Product = db.Product;

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file ? req.file.path : null;
    const product = await Product.create({ name, description, price, stock, image });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};