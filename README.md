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
  const uri = "https://bsky.app/profile/emilyliu.me/post/3lbq7dp6k6k2x";
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

One and only one should be specified for any given CommentSection component.

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
