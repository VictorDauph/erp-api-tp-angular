const express = require("express");
const fs = require("fs");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();
let orders = require("../data/orders.json");

const saveData = (data) => fs.writeFileSync("./data/orders.json", JSON.stringify(data, null, 2));

router.get("/", authenticate, (req, res) => {
    res.json(orders);
});

router.get("/:id", authenticate, (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
});

router.post("/", authenticate, (req, res) => {
    const { productId, quantity, userId } = req.body;
    const newOrder = {
        id: orders.length + 1,
        productId,
        quantity,
        userId,
        createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    saveData(orders);
    res.status(201).json(newOrder);
});

router.put("/:id", authenticate, (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { productId, quantity, userId } = req.body;
    if (productId) order.productId = productId;
    if (quantity) order.quantity = quantity;
    if (userId) order.userId = userId;

    saveData(orders);
    res.json(order);
});

router.delete("/:id", authenticate, (req, res) => {
    const index = orders.findIndex((o) => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Order not found" });

    orders.splice(index, 1);
    saveData(orders);
    res.json({ message: "Order deleted" });
});

module.exports = router;
