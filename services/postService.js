const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postService = {};

// Generate a post and log it in PostLog
postService.generatePost = async (
  socialMediaId,
  userId = null,
  requestIp = null
) => {
  try {
    // Fetch content and media for the given social media platform
    const contentSiteRel = await prisma.contentSiteRel.findMany({
      where: { appId: socialMediaId },
      include: {
        content: {
          include: {
            contentMedia: true,
          },
        },
      },
    });

    if (!contentSiteRel || contentSiteRel.length === 0) {
      throw new Error("No content found for the given social media platform.");
    }

    // Extract the content for the post (taking the first related content)
    const postContent = contentSiteRel[0].content;

    // Create a new post with default status as false
    const newPost = await prisma.post.create({
      data: {
        contentId: postContent.id,
        socialMediaId: socialMediaId,
        status: false, // Not yet posted
      },
    });

    // Log the post generation in the PostLog table
    await prisma.postLog.create({
      data: {
        postId: newPost.id,
        requestIp: requestIp || null, // Log the request IP if provided
        userId: userId || null, // Log the user ID if provided
      },
    });

    // Return the generated post details
    return {
      postId: newPost.id,
      content: postContent.contentName,
      media: postContent.contentMedia.map((media) => ({
        mediaType: media.mediaType,
        mediaUrl: media.mediaUrl,
      })),
    };
  } catch (error) {
    console.error("Error in generating post:", error);
    throw new Error("Failed to generate post.");
  }
};

// Update the status of an existing post and log the update in PostLog
postService.updatePostStatus = async (
  postId,
  status,
  failReason = null,
  userId = null,
  requestIp = null
) => {
  try {
    // Update the post with the new status and failure reason (if any)
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        status: status, // e.g., true for success, false for failure
        failReason: failReason || null, // Optional failure reason
      },
    });

    // Log the status update in PostLog
    await prisma.postLog.create({
      data: {
        postId: postId,
        requestIp: requestIp || null, // Log the request IP if provided
        userId: userId || null, // Log the user ID if provided
      },
    });

    return updatedPost;
  } catch (error) {
    console.error("Error in updating post status:", error);
    throw new Error("Failed to update post status.");
  }
};

// Retrieve post history from PostLog based on filters
postService.getPostHistory = async (filters) => {
  try {
    // Query the post history from the PostLog table
    const postLogs = await prisma.postLog.findMany({
      where: {
        post: {
          contentId: filters.content_uuid,
          phoneNumberId: filters.phone_uuid,
          createdOn: {
            gte: new Date(filters.from_date), // Ensure filters are proper Date objects
            lte: new Date(filters.end_date),
          },
          content: {
            contentMedia: {
              some: { id: filters.media_uuid }, // Check if media is linked to the post
            },
          },
        },
      },
      include: {
        post: {
          include: {
            phoneNumber: true, // Include phone number details
            content: true, // Include content details
            contentMedia: true, // Include media related to the content
          },
        },
      },
    });

    // Format the logs into a response
    return postLogs.map((log) => ({
      postId: log.post.id,
      contentId: log.post.contentId,
      media: log.post.contentMedia.map((media) => ({
        mediaType: media.mediaType,
        mediaUrl: media.mediaUrl,
      })),
      requestIp: log.requestIp,
      userId: log.userId,
      createdAt: log.createdAt,
    }));
  } catch (error) {
    console.error("Error in retrieving post history:", error);
    throw new Error("Failed to retrieve post history.");
  }
};

module.exports = postService;
