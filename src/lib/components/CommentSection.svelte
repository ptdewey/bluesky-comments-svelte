<script>
  import { onMount } from "svelte";
  import { AppBskyFeedDefs, AppBskyFeedGetPostThread } from "@atproto/api";
  import { sortReplies } from "./utils.js";
  import Comment from "./Comment.svelte";

  export let author = "";
  export let uri = "";
  export let opts = {
    showCommentsTitle: true,
  };

  let validatedUri = "";
  let postUrl = "https://bsky.app";

  /** @type {AppBskyFeedDefs.ThreadViewPost} */
  let thread = null;

  /** @type {string?} */
  let error = null;

  let visibleCount = 5;

  /**
   * @param {string} uri
   * a @ returns {Promise<Thread>}
   * @returns {Promise<AppBskyFeedDefs.ThreadViewPost>}
   */
  const getPostThread = async function (uri) {
    const params = new URLSearchParams({ uri });

    const res = await fetch(
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?" +
        params.toString(),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Failed to fetch post thread");
    }

    /** @type {AppBskyFeedGetPostThread.OutputSchema} */
    const data = await res.json();

    if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
      throw new Error("Could not find thread");
    }

    return data.thread;
  };

  const fetchPost = async function () {
    const currentUrl = window.location.href;
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=*&url=${encodeURIComponent(currentUrl)}&author=${author}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        /** @type {AppBskyFeedDefs.PostView} */
        const post = data.posts[0];
        uri = post.uri;
        validatedUri = validateAndFormatUri(uri);

        const [, , did, _, rkey] = uri.split("/");
        postUrl = `https://bsky.app/profile/${did}/post/${rkey}`;

        fetchThreadData();
      } else {
        error = "No matching post found";
      }
    } catch (err) {
      error = "Error fetching post";
    }
  };

  /**
   * @param {string} uri
   */
  const validateAndFormatUri = function (uri) {
    if (!uri.startsWith("at://")) {
      if (uri.includes("bsky.app/profile/")) {
        const match = uri.match(/profile\/([\w.]+)\/post\/([\w]+)/);
        if (match) {
          const [, did, postId] = match;
          postUrl = `https://bsky.app/profile/${did}/post/${postId}`;
          return `at://${did}/app.bsky.feed.post/${postId}`;
        }
      }
      throw new Error("Invalid URI format");
    }
    return uri;
  };

  const fetchThreadData = async function () {
    try {
      thread = await getPostThread(validatedUri);
    } catch (err) {
      console.log(err);
      error = err;
    }
  };

  const showMore = function () {
    visibleCount += 5;
  };

  onMount(() => {
    if (uri) {
      try {
        validatedUri = validateAndFormatUri(uri);
        fetchThreadData();
      } catch (err) {
        error = err.message;
      }
    } else if (author) {
      fetchPost();
    }
  });
</script>

<div class="commentSectionContainer">
  {#if opts.showCommentsTitle}
    <h2 class="commentsTitle">Comments</h2>
  {/if}
  {#if error}
    <p class="errorText">{error}</p>
  {:else if !thread}
    <p class="loadingText">Loading comments...</p>
  {:else}
    <div class="commentsSectionContainerPostFound">
      <a href={postUrl} target="_blank" rel="noreferrer noopener"
        ><p class="statsBar">
          <span class="statItem">
            <svg
              class="statIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="pink"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="pink"
              color="pink"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <span>{thread.post.likeCount ?? 0} likes</span>
          </span>
          <span class="statItem">
            <svg
              class="statIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="green"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
              />
            </svg>
            <span>{thread.post.repostCount ?? 0} reposts</span>
          </span>
          <span class="statItem">
            <svg
              class="statIcon"
              xmlns="http://www.w3.org/2000/svg"
              fill="#7FBADC"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#7FBADC"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            <span>{thread.post.replyCount ?? 0} replies</span>
          </span>
        </p>
      </a>
      <p class="replyText">
        Reply on Bluesky{" "}
        <a href={postUrl} target="_blank" rel="noreferrer noopener">
          here
        </a>{" "}
        to join the conversation.
      </p>
      <hr class="divider" />
      <div class="commentsList">
        {#each sortReplies(thread.replies).slice(0, visibleCount) as comment (comment.post.uri)}
          <Comment {comment} />
        {/each}
        {#if visibleCount < thread.replies.length}
          <button class="showMoreButton" on:click={showMore}
            >Show more comments</button
          >
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .commentSectionContainer {
    padding-left: 0.5rem;
  }

  .commentsSectionContainerPostFound {
    border-left: 2px solid var(--comment-border-color, #525252);
  }

  .commentsList {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .errorText,
  .loadingText {
    text-align: center;
  }

  .divider {
    margin-top: 0.5rem;
  }

  .showMoreButton {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--show-more-button-color, #3b82f6);
    text-decoration: underline;
  }

  .statsBar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .statsBar:hover {
    text-decoration: underline;
  }

  .statItem {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }

  .statIcon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .commentsTitle {
    margin-top: 1.5rem;
    margin-left: var(--left-margin-comments-title, 0);
    font-size: var(--font-size-title, 1.25rem);
    font-weight: bold;
  }

  .replyText {
    margin-top: 0.5rem;
    font-size: var(--font-size-comment-body, 0.875rem);
  }
</style>
