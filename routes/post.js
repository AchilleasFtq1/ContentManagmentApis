const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Generate a post based on social media UUID
 *     description: Returns a generated post UUID along with its associated content and media.
 *     parameters:
 *       - in: query
 *         name: social_media_uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the social media platform
 *     responses:
 *       200:
 *         description: Post generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 postId:
 *                   type: string
 *                   description: The UUID of the generated post
 *                 content:
 *                   type: object
 *                   description: The content details
 *                 media:
 *                   type: array
 *                   description: The media associated with the content
 *                   items:
 *                     type: object
 *                     properties:
 *                       mediaType:
 *                         type: string
 *                         description: The type of media (image, video, etc.)
 *                       mediaUrl:
 *                         type: string
 *                         description: The URL of the media
 *       400:
 *         description: social_media_uuid is required
 *       500:
 *         description: Server error
 */
router.get("/post", postController.generatePost);

/**
 * @swagger
 * /post/{post_uuid}/status:
 *   post:
 *     summary: Update the status of a post
 *     description: Updates the status of a post, indicating whether it was successful or failed.
 *     parameters:
 *       - in: path
 *         name: post_uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: The status of the post (true for success, false for failure)
 *               failReason:
 *                 type: string
 *                 description: Reason for failure, if any
 *     responses:
 *       200:
 *         description: Post status updated successfully
 *       400:
 *         description: post_uuid and status are required
 *       500:
 *         description: Server error
 */
router.post("/post/:post_uuid/status", postController.updatePostStatus);

/**
 * @swagger
 * /admin/post_history:
 *   get:
 *     summary: Get post history
 *     description: Retrieves post history filtered by content UUID, media UUID, date range, and phone number UUID.
 *     parameters:
 *       - in: query
 *         name: content_uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the content
 *       - in: query
 *         name: media_uuid
 *         required: false
 *         schema:
 *           type: string
 *         description: The UUID of the media (optional)
 *       - in: query
 *         name: from_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering the post history
 *       - in: query
 *         name: end_date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering the post history
 *       - in: query
 *         name: phone_uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the phone number
 *     responses:
 *       200:
 *         description: Post history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   postId:
 *                     type: string
 *                     description: The UUID of the post
 *                   contentId:
 *                     type: string
 *                     description: The content UUID associated with the post
 *                   media:
 *                     type: array
 *                     description: Media files associated with the post
 *                     items:
 *                       type: object
 *                       properties:
 *                         mediaType:
 *                           type: string
 *                           description: The type of media
 *                         mediaUrl:
 *                           type: string
 *                           description: The URL of the media file
 *       400:
 *         description: Required parameters are missing
 *       500:
 *         description: Server error
 */
router.get("/admin/post_history", postController.getPostHistory);

module.exports = router;
