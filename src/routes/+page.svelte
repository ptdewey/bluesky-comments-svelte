<script>
  import { CommentSection } from "$lib/index.js";

  const uri = "https://bsky.app/profile/emilyliu.me/post/3lbq7dp6k6k2x";
  const author = "ptdewey.bsky.social";
</script>

<!-- comment section from uri -->
<CommentSection {uri} />

<!-- comment section from author -->
<CommentSection {author} />

<!-- comment section from author, hide "Comments" header -->
<CommentSection {author} opts={{ showCommentsTitle: false }} />
