const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Service function to authenticate phone number
exports.authenticatePhoneNumber = async (number, password) => {
  try {
    // Find the phone number in the database
    const phone = await prisma.phoneNumber.findUnique({
      where: { phoneNumber: number },
    });

    // If phone number doesn't exist or password doesn't match
    if (!phone || !(await bcrypt.compare(password, phone.password))) {
      return null;
    }

    // If authentication succeeds, return the phone record
    return phone;
  } catch (error) {
    console.error("Error in authenticatePhoneNumber:", error);
    throw new Error("Failed to authenticate phone number");
  }
};

// Service function to find an existing phone number
exports.findPhoneNumber = async (phoneNumber) => {
  try {
    return await prisma.phoneNumber.findUnique({
      where: { phoneNumber: phoneNumber },
    });
  } catch (error) {
    console.error("Error in findPhoneNumber:", error);
    throw new Error("Failed to find phone number");
  }
};

// Service function to create a new phone number
exports.createPhoneNumber = async (phoneNumber, password) => {
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new phone number in the database
    const newPhoneNumber = await prisma.phoneNumber.create({
      data: {
        phoneNumber: phoneNumber,
        password: hashedPassword,
      },
    });

    return newPhoneNumber;
  } catch (error) {
    console.error("Error in createPhoneNumber:", error);
    throw new Error("Failed to create phone number");
  }
};

// Service function to delete a phone number by ID
exports.deletePhoneNumber = async (id) => {
  try {
    // Delete the phone number from the database
    const deletedPhone = await prisma.phoneNumber.delete({
      where: { id: id },
    });

    return deletedPhone;
  } catch (error) {
    console.error("Error in deletePhoneNumber:", error);
    throw new Error("Failed to delete phone number");
  }
};

// Service function to update a phone number's active status
exports.updatePhoneNumber = async (id, active) => {
  try {
    // Update the phone number's active status
    const updatedPhone = await prisma.phoneNumber.update({
      where: { id: id },
      data: { active: active },
    });

    return updatedPhone;
  } catch (error) {
    console.error("Error in updatePhoneNumber:", error);
    throw new Error("Failed to update phone number");
  }
};
