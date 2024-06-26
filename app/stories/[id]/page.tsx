import Link from "next/link";

import type { IStory } from "../../../types";
import Comment from "../../../components/comment";
import fetchAPI from "../../../api";

const Story = async ({ params }: {
  params: { id: string };
}) => {
  const story: IStory = await fetchAPI(`item/${params.id}`)
  return (
    story && (
      <div className="item-view">
        <div className="item-view-header">
          <a href={story.url} target="_blank" rel="noreferrer">
            <h1>{story.title}</h1>
          </a>
          {story.domain && <span className="host">({story.domain})</span>}
          <p className="meta">
            {story.points} points | by{" "}
            <Link href={`/users/${story.user}`}>{story.user}</Link>{" "}
            {story.time_ago} ago
          </p>
        </div>
        <div className="item-view-comments">
          <p className="item-view-comments-header">
            {story.comments_count
              ? story.comments_count + " comments"
              : "No comments yet."}
          </p>
          <ul className="comment-children">
            {story.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Story;
