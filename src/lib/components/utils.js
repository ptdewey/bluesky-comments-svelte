import { AppBskyFeedDefs } from "@atproto/api";

/**
 * @param {(AppBskyFeedDefs.ThreadViewPost | AppBskyFeedDefs.NotFoundPost | AppBskyFeedDefs.BlockedPost | { [k: string]: unknown; $type: string })[]} replies
 * @returns {AppBskyFeedDefs.ThreadViewPost[]}
 */
export const sortReplies = function (replies) {
  return replies
    .filter(AppBskyFeedDefs.isThreadViewPost)
    .sort((a, b) => (b.post?.likeCount || 0) - (a.post?.likeCount || 0));
};
