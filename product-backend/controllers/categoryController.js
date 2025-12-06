const pool = require("../config/db");

// GET all categories
exports.getCategories = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categories");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// GET products of a category
exports.getProductsByCategory = async (req, res) => {
    try {
        const query = `
            SELECT p.* 
            FROM products p 
            JOIN categories c 
            ON p.category = c.name
            WHERE c.id = $1
        `;

        const result = await pool.query(query, [req.params.id]);
        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err });
    }
};
        