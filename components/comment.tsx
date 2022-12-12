import Link from "next/link";

import type { IComment } from "../types";
import Toggle  from "./toggle";

const Comment = (props: { comment: IComment }) => {
  return (
    <li className="comment">
      <div className="by">
        <Link href={`/users/${props.comment.user}`}>{props.comment.user}</Link>{" "}
        {props.comment.time_ago} ago
      </div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
      />
      {!!props.comment.comments.length && (
        <Toggle>
          {props.comment.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Toggle>
      )}
    </li>
  );
};

export default Comment;
