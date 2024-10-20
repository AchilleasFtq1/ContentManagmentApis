const postService = require("../services/postService");

// Controller to generate a post
exports.generatePost = async (req, res) => {
  const { social_media_uuid } = req.query;

  if (!social_media_uuid) {
    return res.status(400).json({ message: "social_media_uuid is required" });
  }

  try {
    const generatedPost = await postService.generatePost(social_media_uuid);
    res.json({
      message: "Post generated successfully",
      postId: generatedPost.postId,
      content: generatedPost.content,
      media: generatedPost.media.map((media) => ({
        mediaType: media.mediaType,
        mediaUrl: media.mediaUrl,
      })), // Ensure media is an array with properly defined objects inside
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to update post status
exports.updatePostStatus = async (req, res) => {
  const { post_uuid } = req.params;
  const { status, failReason } = req.body;

  if (!post_uuid || status === undefined) {
    return res
      .status(400)
      .json({ message: "post_uuid and status are required" });
  }

  try {
    const updatedPost = await postService.updatePostStatus(
      post_uuid,
      status,
      failReason
    );
    res.json({ message: "Post status updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getPostHistory = async (req, res) => {
  const { content_uuid, media_uuid, from_date, end_date, phone_uuid } =
    req.query;

  if (!content_uuid || !from_date || !end_date || !phone_uuid) {
    return res.status(400).json({ message: "Required parameters are missing" });
  }

  try {
    const postHistory = await postService.getPostHistory({
      content_uuid,
      media_uuid,
      from_date,
      end_date,
      phone_uuid,
    });

    res.json({
      message: "Post history retrieved successfully",
      posts: postHistory.map((post) => ({
        postId: post.id,
        contentId: post.contentId,
        media: post.contentMedia.map((media) => ({
          mediaType: media.mediaType,
          mediaUrl: media.mediaUrl,
        })), // Ensure array has properly defined items
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
