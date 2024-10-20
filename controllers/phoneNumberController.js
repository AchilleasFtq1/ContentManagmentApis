const phoneNumberService = require("../services/phoneNumberService");
const Session = require("supertokens-node/recipe/session");

// Controller function for authentication
exports.authenticatePhoneNumber = async (req, res) => {
  const { number, password } = req.body;

  // Basic validation
  if (!number || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }

  try {
    const phone = await phoneNumberService.authenticatePhoneNumber(
      number,
      password
    );

    if (!phone) {
      return res
        .status(401)
        .json({ message: "Invalid phone number or password" });
    }

    // Create a SuperTokens session and return the session token
    await Session.createNewSession(res, phone.id, { role: "user" });

    res.json({ message: "Authentication successful", phone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function for creating phone number
exports.createPhoneNumber = async (req, res) => {
  const { phoneNumber, password } = req.body;

  // Basic validation
  if (!phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: "Phone number and password are required" });
  }

  try {
    const existingPhone = await phoneNumberService.findPhoneNumber(phoneNumber);

    if (existingPhone) {
      return res.status(409).json({ message: "Phone number already exists" });
    }

    const newPhone = await phoneNumberService.createPhoneNumber(
      phoneNumber,
      password
    );
    res
      .status(201)
      .json({ message: "Phone number created successfully", newPhone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deletePhoneNumber = async (req, res) => {
  const { id } = req.params; // Use req.params for path parameter

  if (!id) {
    return res.status(400).json({ message: "Phone number ID is required" });
  }

  try {
    const deletedPhone = await phoneNumberService.deletePhoneNumber(id);
    res.json({ message: "Phone number deleted successfully", deletedPhone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function for updating phone number
exports.updatePhoneNumber = async (req, res) => {
  const { id, active } = req.body;

  // Basic validation
  if (!id || active === undefined) {
    return res
      .status(400)
      .json({ message: "Phone number ID and active status are required" });
  }

  try {
    const updatedPhone = await phoneNumberService.updatePhoneNumber(id, active);

    if (!updatedPhone) {
      return res.status(404).json({ message: "Phone number not found" });
    }

    res.json({ message: "Phone number updated successfully", updatedPhone });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
