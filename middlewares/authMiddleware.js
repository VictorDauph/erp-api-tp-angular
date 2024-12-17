const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret123";

const authenticate = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).send("Access Denied");
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

function authorizeAdmin(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
}

module.exports = { authenticate, authorizeAdmin, SECRET_KEY };
