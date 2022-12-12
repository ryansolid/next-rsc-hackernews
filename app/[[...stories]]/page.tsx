import Link from "next/link";

import type { IStory } from "../../types";
import Story from "../../components/story";
import fetchAPI from "../../api";

interface StoriesData {
  page: number;
  type: string;
  stories: IStory[];
}

const mapStories = {
  top: "news",
  new: "newest",
  show: "show",
  ask: "ask",
  job: "jobs",
};

// https://remix.run/guides/routing#index-routes
export default async function Index({ params, searchParams }: {
  params: { stories: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page = +(searchParams.page || 1);
  const type = params.stories ? params.stories[0] : "top"
  const stories: IStory[] = await fetchAPI(`${mapStories[type as keyof typeof mapStories]}?page=${page}`)

  return (
    <div className="news-view">
      <div className="news-list-nav">
        {page > 1 ? (
          <Link
            className="page-link"
            href={`/${type}?page=${page - 1}`}
            aria-label="Previous Page"
          >
            {"<"} prev
          </Link>
        ) : (
          <span className="page-link disabled" aria-disabled="true">
            {"<"} prev
          </span>
        )}
        <span>page {page}</span>
        {stories && stories.length >= 29 ? (
          <Link
            className="page-link"
            href={`/${type}?page=${page + 1}`}
            aria-label="Next Page"
          >
            more {">"}
          </Link>
        ) : (
          <span className="page-link disabled" aria-disabled="true">
            more {">"}
          </span>
        )}
      </div>
      <main className="news-list">
        {stories && (
          <ul>
            {stories.map((story) => (
              <Story key={story.id} story={story} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
