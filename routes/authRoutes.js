const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();
const SECRET_KEY = "secret123"; // Changez pour une vraie clé dans la production

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.users.find((u) => u.username === username);
    if (!user) return res.status(404).send("User not found");

    const passwordIsValid = password === "pwd"//bcrypt.compareSync(password, user.password); => mock de la verif du mdp
    if (!passwordIsValid) return res.status(401).send("Invalid Credentials");

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, {
        expiresIn: "10000h",
    });
    res.json({ token });
});

module.exports = router;
