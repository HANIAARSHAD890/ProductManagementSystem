const express = require("express");
const cors = require("cors");
const swaggerDocs = require("./config/swagger");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
swaggerDocs(app);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
