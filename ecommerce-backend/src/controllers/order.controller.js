import db from "../models/index.js";
const Order = db.Order;

export const createOrder = async (req, res) => {
  try {
    const { userId, totalAmount, address } = req.body;
    const order = await Order.create({ userId, totalAmount, address, status: "Placed" });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};