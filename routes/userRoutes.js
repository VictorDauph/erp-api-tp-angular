const express = require("express");
const db = require("../db");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route pour récupérer les utilisateurs sans leurs mots de passe
router.get("/", authenticate, (req, res) => {
    const usersWithoutPasswords = db.users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
});

module.exports = router;
