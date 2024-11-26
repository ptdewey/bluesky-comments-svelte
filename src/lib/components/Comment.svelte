<script>
  import Comment from "./Comment.svelte";
  import { AppBskyFeedPost, AppBskyFeedDefs } from "@atproto/api";
  import "$lib/styles/CommentSection.css";
  import Actions from "./Actions.svelte";
  import { sortReplies } from "./utils.js";

  /** @type {AppBskyFeedDefs.ThreadViewPost} */
  export let comment;
</script>

{#if AppBskyFeedPost.isRecord(comment.post.record)}
  <div class="commentContainer">
    <div class="commentContent">
      <a
        class="authorLink"
        href={`https://bsky.app/profile/${comment.post.author.did}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          class="commentAvatar"
          src={comment.post.author.avatar || ""}
          alt="avatar"
        />
        <p class="authorName">
          {comment.post.author.displayName || comment.post.author.handle}
          <span class="handle">@{comment.post.author.handle}</span>
        </p>
      </a>
      <a
        href={`https://bsky.app/profile/${comment.post.author.did}/post/${comment.post.uri.split("/").pop()}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <p>{comment.post.record.text}</p>
      </a>
      <Actions post={comment.post} />
    </div>

    {#if comment.replies && comment.replies.length > 0}
      <div class="repliesContainer">
        {#each sortReplies(comment.replies) as reply (reply.post.uri)}
          {#if AppBskyFeedDefs.isThreadViewPost(reply)}
            <Comment comment={reply} />
          {/if}
        {/each}
      </div>
    {/if}
  </div>
{/if}
