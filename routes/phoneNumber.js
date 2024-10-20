const express = require("express");
const router = express.Router();
const phoneNumberController = require("../controllers/phoneNumberController");

/**
 * @swagger
 * /phone/auth:
 *   post:
 *     summary: Authenticate phone number
 *     description: Authenticates a user using their phone number and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 description: The phone number of the user
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "mypassword"
 *     responses:
 *       200:
 *         description: Authentication successful
 *       401:
 *         description: Invalid phone number or password
 *       500:
 *         description: Server error
 */
router.post("/auth", phoneNumberController.authenticatePhoneNumber);

/**
 * @swagger
 * /admin/phone_number:
 *   post:
 *     summary: Create a new phone number
 *     description: Registers a new phone number with a password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to be registered
 *                 example: "1234567890"
 *               password:
 *                 type: string
 *                 description: The password for the phone number
 *                 example: "mypassword"
 *     responses:
 *       201:
 *         description: Phone number created successfully
 *       400:
 *         description: Phone number and password are required
 *       409:
 *         description: Phone number already exists
 *       500:
 *         description: Server error
 */
router.post("/admin/phone_number", phoneNumberController.createPhoneNumber);

/**
 * @swagger
 * /admin/phone_number/{id}:
 *   delete:
 *     summary: Delete a phone number
 *     description: Deletes a phone number from the database using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the phone number to delete
 *         example: "1234abcd-5678efgh-ijklmnop"
 *     responses:
 *       200:
 *         description: Phone number deleted successfully
 *       400:
 *         description: Phone number ID is required
 *       404:
 *         description: Phone number not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/admin/phone_number/:id",
  phoneNumberController.deletePhoneNumber
);

/**
 * @swagger
 * /admin/phone_number:
 *   patch:
 *     summary: Update phone number status
 *     description: Updates the active status of a phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the phone number to update
 *                 example: "1234abcd-5678efgh-ijklmnop"
 *               active:
 *                 type: boolean
 *                 description: Whether the phone number should be active or inactive
 *                 example: true
 *     responses:
 *       200:
 *         description: Phone number updated successfully
 *       400:
 *         description: Phone number ID and active status are required
 *       404:
 *         description: Phone number not found
 *       500:
 *         description: Server error
 */
router.patch("/admin/phone_number", phoneNumberController.updatePhoneNumber);

module.exports = router;
