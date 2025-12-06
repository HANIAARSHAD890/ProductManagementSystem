const pool = require("../config/db");

// GET all products
exports.getProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// GET product by ID
exports.getProductById = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [req.params.id]);

        if (result.rows.length === 0)
            return res.status(404).json({ message: "Product not found" });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// CREATE product
exports.createProduct = async (req, res) => {
    const { name, description, price, category, stock_quantity } = req.body;

    try {
        const query = `
            INSERT INTO products (name, description, price, category, stock_quantity)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const result = await pool.query(query, [
            name, description, price, category, stock_quantity
        ]);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
    const { name, description, price, category, stock_quantity } = req.body;

    try {
        const query = `
            UPDATE products
            SET name=$1, description=$2, price=$3, category=$4, stock_quantity=$5
            WHERE id=$6
        `;
        await pool.query(query, [
            name, description, price, category,
            stock_quantity, req.params.id
        ]);

        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        await pool.query("DELETE FROM products WHERE id = $1", [req.params.id]);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
