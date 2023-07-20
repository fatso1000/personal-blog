import Link from "next/link";
import { memo } from "react";
import { IBlog } from "src/types/clientTypes";

const MemoizedTextToComponent = memo(function TextToComponent(props: any) {
  const {
    data,
    isLoading,
    error,
  }: { data: IBlog; isLoading: boolean; error: unknown } = props;

  return (
    <article className="flex flex-col gap-y-6">
      <header className="flex flex-col gap-y-3">
        <h1 className="text-7xl text-stone-200 font-extrabold">{data.title}</h1>
        <div className="inline-flex justify-between text-stone-500">
          <div>{data.author_name} / May 29, 2023</div>
          <div>{data.reading_time} min reading</div>
        </div>
        <span className="inline-flex gap-x-2 text-stone-500">
          Tags:{" "}
          {data.post_tag &&
            data.post_tag.length > 0 &&
            data.post_tag.map((x: any) => (
              <Link
                href={`/tags?name=${x.name}`}
                key={x.id}
                className="text-stone-500 hover:underline transition"
              >
                {x.name}
              </Link>
            ))}
        </span>
      </header>
      <div>
        {data.details.content.map((v: any, i: number) => (
          <div className="mb-11" key={i}>
            {v}
          </div>
        ))}
      </div>
    </article>
  );
});
export default MemoizedTextToComponent;
