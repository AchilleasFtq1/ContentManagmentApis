const contentService = require("../services/contentService");

// Controller function to create content
exports.createContent = async (req, res) => {
  const { contentName } = req.body;

  // Basic validation
  if (!contentName) {
    return res.status(400).json({ message: "Content name is required" });
  }

  try {
    const newContent = await contentService.createContent(contentName);
    res
      .status(201)
      .json({ message: "Content created successfully", newContent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  const { id } = req.params; // Get the ID from the path

  if (!id) {
    return res.status(400).json({ message: "Content ID is required" });
  }

  try {
    const deletedContent = await contentService.deleteContent(id);
    res.json({ message: "Content deleted successfully", deletedContent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function to update content
exports.updateContent = async (req, res) => {
  const { id, contentName } = req.body;

  // Basic validation
  if (!id || !contentName) {
    return res
      .status(400)
      .json({ message: "Content ID and content name are required" });
  }

  try {
    const updatedContent = await contentService.updateContent(id, contentName);
    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json({ message: "Content updated successfully", updatedContent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
