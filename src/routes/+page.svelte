<script>
  import { CommentSection } from "$lib/index.js";

  const uri = "https://bsky.app/profile/emilyliu.me/post/3lbq7dp6k6k2x";
  const aturi =
    "at://did:plc:hm5f3dnm6jdhrc55qp2npdja/app.bsky.feed.post/3lbvhkkrg4c2c";
  const author = "ptdewey.bsky.social";
</script>

<!-- comment section from author, hide "Comments" header -->
<CommentSection {author} opts={{ showCommentsTitle: false }} />

<!-- comment section from author -->
<CommentSection {author} />

<!-- Comment section from at uri -->
<CommentSection uri={aturi} />

<!-- comment section from uri -->
<CommentSection {uri} />
