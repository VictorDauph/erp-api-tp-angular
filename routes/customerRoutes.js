const express = require("express");
const fs = require("fs");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();
let customers = require("../data/customers.json");

const saveData = (data) => fs.writeFileSync("./data/customers.json", JSON.stringify(data, null, 2));

router.get("/", authenticate, (req, res) => {
    res.json(customers);
});

router.get("/:id", authenticate, (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
});

router.post("/", authenticate, (req, res) => {
    const { name, email, address, phone } = req.body;
    const newCustomer = { id: customers.length + 1, name, email, address, phone, orders: [] };
    customers.push(newCustomer);
    saveData(customers);
    res.status(201).json(newCustomer);
});

router.put("/:id", authenticate, (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const { name, email, address, phone, orders } = req.body;
    if (name) customer.name = name;
    if (email) customer.email = email;
    if (address) customer.address = address;
    if (phone) customer.phone = phone;
    if (orders) customer.orders = orders;

    saveData(customers);
    res.json(customer);
});

router.delete("/:id", authenticate, (req, res) => {
    const index = customers.findIndex((c) => c.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Customer not found" });

    customers.splice(index, 1);
    saveData(customers);
    res.json({ message: "Customer deleted" });
});

module.exports = router;
