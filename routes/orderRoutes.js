const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
    res.json(db.orders);
});

router.post("/", authenticate, (req, res) => {
    const { productId, quantity } = req.body;
    const product = db.products.find((p) => p.id === productId);
    if (!product) return res.status(404).send("Product not found");
    if (product.stock < quantity) return res.status(400).send("Insufficient stock");

    product.stock -= quantity;
    db.saveProducts();

    const newOrder = {
        id: db.orders.length + 1,
        productId,
        quantity,
        userId: req.user.id,
        createdAt: new Date().toISOString(),
    };
    db.orders.push(newOrder);
    db.saveOrders();
    res.status(201).json(newOrder);
});

module.exports = router;
