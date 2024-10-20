const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Service function to create new content
exports.createContent = async (contentName) => {
  try {
    const newContent = await prisma.content.create({
      data: {
        contentName: contentName,
      },
    });
    return newContent;
  } catch (error) {
    console.error("Error in createContent:", error);
    throw new Error("Failed to create content");
  }
};

// Service function to delete content by ID
exports.deleteContent = async (id) => {
  try {
    const deletedContent = await prisma.content.delete({
      where: { id: id },
    });
    return deletedContent;
  } catch (error) {
    console.error("Error in deleteContent:", error);
    throw new Error("Failed to delete content");
  }
};

// Service function to update content
exports.updateContent = async (id, contentName) => {
  try {
    const updatedContent = await prisma.content.update({
      where: { id: id },
      data: { contentName: contentName },
    });
    return updatedContent;
  } catch (error) {
    console.error("Error in updateContent:", error);
    throw new Error("Failed to update content");
  }
};
