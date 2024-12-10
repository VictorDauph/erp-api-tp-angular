const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authenticate, (req, res) => {
    res.json(db.products);
});

router.post("/", authenticate, (req, res) => {
    const { name, stock } = req.body;
    const newProduct = { id: db.products.length + 1, name, stock };
    db.products.push(newProduct);
    db.saveProducts();
    res.status(201).json(newProduct);
});

module.exports = router;
