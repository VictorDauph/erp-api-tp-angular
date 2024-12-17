const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
let users = require("../data/users.json");

const saveData = (data) => fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 2));

router.get("/", authenticate, authorizeAdmin, (req, res) => {
    res.json(users);
});

router.get("/:id", authenticate, authorizeAdmin, (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

router.post("/", authenticate, authorizeAdmin, (req, res) => {
    const { username, password, role } = req.body;
    const newUser = {
        id: users.length + 1,
        username,
        role: role || "user",
        password: bcrypt.hashSync(password, 8),
    };
    users.push(newUser);
    saveData(users);
    res.status(201).json(newUser);
});

router.put("/:id", authenticate, authorizeAdmin, (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    const { username, password, role } = req.body;
    if (username) user.username = username;
    if (password) user.password = bcrypt.hashSync(password, 8);
    if (role) user.role = role;

    saveData(users);
    res.json(user);
});

router.delete("/:id", authenticate, authorizeAdmin, (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "User not found" });

    users.splice(index, 1);
    saveData(users);
    res.json({ message: "User deleted" });
});

module.exports = router;
