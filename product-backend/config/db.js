const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",       // your PG username
    host: "localhost",
    database: "POS",        // ⬅ your DB name
    password: "Hans@2005",           // your PG password
    port: 5432
});

pool.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("DB Connection Error:", err));

module.exports = pool;
