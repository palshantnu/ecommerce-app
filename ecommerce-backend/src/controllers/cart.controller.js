import db from "../models/index.js";
const Cart = db.Cart;
const Product = db.Product;

export const getCartByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ where: { userId }, include: Product });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ userId });

    // upsert into CartItems
    const [item, created] = await db.CartItems.findOrCreate({
      where: { CartId: cart.id, ProductId: productId },
      defaults: { quantity }
    });
    if (!created) {
      item.quantity = item.quantity + quantity;
      await item.save();
    }
    const updated = await Cart.findOne({ where: { id: cart.id }, include: Product });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};