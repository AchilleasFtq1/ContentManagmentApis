const express = require("express");
const router = express.Router();
const contentController = require("../controllers/contentController");

/**
 * @swagger
 * /admin/content:
 *   post:
 *     summary: Create new content
 *     description: Creates new content and stores it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentName:
 *                 type: string
 *                 description: Name of the content
 *                 example: "New Blog Post"
 *     responses:
 *       201:
 *         description: Content created successfully
 *       400:
 *         description: Content name is required
 *       500:
 *         description: Server error
 */
router.post("/", contentController.createContent);

/**
 * @swagger
 * /admin/content/{id}:
 *   delete:
 *     summary: Delete content
 *     description: Deletes specific content from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content to delete
 *         example: "cuid1234567890"
 *     responses:
 *       200:
 *         description: Content deleted successfully
 *       400:
 *         description: Content ID is required
 *       404:
 *         description: Content not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", contentController.deleteContent);

/**
 * @swagger
 * /admin/content/{id}:
 *   patch:
 *     summary: Update content
 *     description: Updates the name of the content based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content to update
 *         example: "cuid1234567890"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentName:
 *                 type: string
 *                 description: The new name of the content
 *                 example: "Updated Blog Post"
 *     responses:
 *       200:
 *         description: Content updated successfully
 *       400:
 *         description: Content ID and content name are required
 *       404:
 *         description: Content not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", contentController.updateContent);

module.exports = router;
