const fs = require("fs");
const path = require("path");

const loadData = (fileName) => {
    const filePath = path.join(__dirname, "data", fileName);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const saveData = (fileName, data) => {
    const filePath = path.join(__dirname, "data", fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// Charger les données initiales
const db = {
    users: loadData("users.json"),
    products: loadData("products.json"),
    orders: loadData("orders.json"),
};

// Sauvegarder les données
db.saveUsers = () => saveData("users.json", db.users);
db.saveProducts = () => saveData("products.json", db.products);
db.saveOrders = () => saveData("orders.json", db.orders);

module.exports = db;
