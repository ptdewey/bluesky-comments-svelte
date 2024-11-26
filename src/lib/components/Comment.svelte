<script>
  import { AppBskyFeedPost } from "@atproto/api";

  /** @type {import("$lib/types").Reply} */
  export let comment;
  const author = comment.post.author;
</script>

{#if AppBskyFeedPost.isRecord(comment.post.record)}
  <div class="commentContainer">
    <div class="commentContent">
      <a
        class="authorLink"
        href={`https://bsky.app/profile/${author.did}`}
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          class="commentAvatar"
          src={comment.post.author.avatar || ""}
          alt="avatar"
        />
        <p class="authorName">{author.displayName || author.handle}</p>
      </a>
      <p>{comment.post.record.text}</p>
    </div>
  </div>
{/if}
