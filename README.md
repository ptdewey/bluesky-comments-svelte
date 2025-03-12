# Bluesky Comments (svelte)

`bluesky-comments-svelte` is a Svelte-based component for embedding Bluesky comment sections seamlessly into your Svelte applications.

This package is inspired by and based on the functionality provided by the [Bluesky Comments project](https://github.com/czue/bluesky-comments) created by Cory Zue. It adapts the original idea to work natively within the Svelte ecosystem for better developer experience and integration.


## Features

- Native Svelte component for embedding Bluesky comment sections.
- Simple, declarative syntax for easy integration.
- Lightweight and dependency-friendly.


## Installation

Install the package using npm:

```bash
npm install bluesky-comments-svelte
```

## Usage

Attaching comments of specific post by link:

```svelte
<script>
  import { CommentSection } from "bluesky-comments-svelte";

  // Provide the URI of the Bluesky post you want to display comments for
  const uri = "at://did:plc:hm5f3dnm6jdhrc55qp2npdja/app.bsky.feed.post/3lbvhkkrg4c2c";
</script>

<CommentSection {uri} />
```

Automatically attach comments to the most recent post that links to page:

```svelte
<script>
  import { CommentSection } from "bluesky-comments-svelte";

  const author = "pdewey.com";
</script>

<CommentSection {author} />
```


#### Props

The `CommentSection` component accepts the following props:

- `uri` (string)
    The URI of the Bluesky post for which comments should be displayed.
- `author` (string)
    The Bluesky post author username for which posts should be checked for matching URLs
- `opts` (object) -- Optional
    A JSON object of options that can be passed into the component
    Currently contains: `showCommentsTitle` (Boolean -- default true) that tells the component whether or not to render the "Comments" header.

One and only one should be specified for any given CommentSection component.

### Styling

This library seeks to provide minimal styling outside of the basic structure, to allow you to style the comment section how you like.

The components look for the following CSS variables:

```css
/* Line color denoting comment depth (Default: #525252) */
--comment-border-color: #525252;

/* Color of display name (Default: #2f3948) */
--handle-color: #2f3948;

/* Color of @handle (Default: #6b7280) */
--author-link-color: #6b7280;

/* Comment author avatar size (Default: 1rem) */
--avatar-size: 1rem;

/* Background color for missing comment avatars (Default: #d1d5db) */
--avatar-background-color: #d1d5db;

/* How to align comments in flex container (Default: flex-start)*/
--comment-content-alignment: flex-start;

/* Amount of margin to apply to left of comment section title (Default: 0) */
--left-margin-comments-title: 0;

/* Font size of 'Comments' title (Default: 1.25rem) */
--font-size-title: 1.25rem;

/* Font size of comment body (Default: 0.875rem) */
--font-size-comment-body: 0.875rem;

/* Color of show more button when there are many comments (Default: #3b82f6) */
--show-more-button-color: #3b82f6;
```



---

## Development

If you'd like to contribute or modify this package:

1. Clone the repository:
   ```bash
   git clone https://github.com/ptdewey/bluesky-comments-svelte.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```


## License

This project is licensed under the [MIT License](./LICENSE).


## Support

For questions or support, open an issue on the [GitHub repository](https://github.com/ptdewey/bluesky-comments-svelte/issues). Feedback and contributions are highly appreciated!
