const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Returns all categories
 */
router.get("/", categoryController.getCategories);

/**
 * @swagger
 * /api/categories/{id}/products:
 *   get:
 *     summary: Get all products that belong to a specific category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The category ID
 *     responses:
 *       200:
 *         description: List of products in that category
 *       404:
 *         description: Category not found
 */
router.get("/:id/products", categoryController.getProductsByCategory);

module.exports = router;
