<script>
  import { AppBskyFeedPost, AppBskyFeedDefs } from "@atproto/api";
  import Comment from "./Comment.svelte";
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

<style>
  .repliesContainer {
    border-left: 2px solid var(--comment-border-color, #525252);
    padding-left: 0.5rem;
  }

  .commentContainer {
    margin: 0.5rem 0;
    font-size: 0.875rem;
  }

  .commentContent {
    display: flex;
    max-width: 36rem;
    flex-direction: column;
    align-items: var(--comment-content-alignment, flex-start);
  }

  .authorLink {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: var(--author-link-color);
  }

  .authorLink:hover {
    text-decoration: underline;
  }

  .commentAvatar {
    height: var(--avatar-size, 1rem);
    width: var(--avatar-size, 1rem);
    flex-shrink: 0;
    border-radius: 9999px;
    background-color: var(--avatar-background-color, #d1d5db);
    margin-right: 0.3rem;
  }

  .authorName {
    overflow: hidden;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .commentContainer a {
    text-decoration: none;
    color: inherit;
  }

  .commentContainer a:hover {
    text-decoration: none;
  }

  .commentContent .handle {
    color: var(--handle-color, #6b7280);
  }
</style>
