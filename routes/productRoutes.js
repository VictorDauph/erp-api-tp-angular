const express = require("express");
const fs = require("fs");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();
let products = require("../data/products.json");

const saveData = (data) => fs.writeFileSync("./data/products.json", JSON.stringify(data, null, 2));

router.get("/", authenticate, (req, res) => {
    res.json(products);
});

router.get("/:id", authenticate, (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

router.post("/", authenticate, (req, res) => {
    const { name, stock } = req.body;
    const newProduct = { id: products.length + 1, name, stock };
    products.push(newProduct);
    saveData(products);
    res.status(201).json(newProduct);
});

router.put("/:id", authenticate, (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, stock } = req.body;
    if (name) product.name = name;
    if (stock) product.stock = stock;

    saveData(products);
    res.json(product);
});

router.delete("/:id", authenticate, (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Product not found" });

    products.splice(index, 1);
    saveData(products);
    res.json({ message: "Product deleted" });
});

module.exports = router;
