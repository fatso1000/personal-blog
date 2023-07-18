import { getPostByTagsName } from "src/queryFn";

import { Metadata } from "next";
import BlogsList from "src/components/blog/blogsList";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { IBlog } from "src/types/clientTypes";

export async function generateMetadata(props: any): Promise<Metadata> {
  const name: string | undefined =
    props.searchParams.hasOwnProperty("name") && props.searchParams["name"];

  return {
    title: "Search Posts by Tag Name ",
    description: "",
  };
}

export default async function TagsByNamePage(props: any) {
  const name =
    props.searchParams.hasOwnProperty("name") && props.searchParams["name"];
  const blogs = await getPostByTagsName<IBlog[]>(name);

  return (
    <main className="mt-4">
      <header className="mb-4">
        <h1 className="text-2xl">Tag: {name}</h1>
      </header>
      <section className="flex flex-col gap-y-5">
        {!blogs.error && blogs.data && blogs.data.length > 0 ? (
          <BlogsList blogs={blogs.data} />
        ) : (
          <span className="absolute text-lg flex flex-col items-center m-auto top-1/2 left-1/2 -translate-x-20">
            <p className="font-bold">No records found</p>
            <Link
              href="/"
              className="text-stone-500  items-center gap-x-1 inline-flex hover:underline transition"
            >
              Go Home <AiOutlineArrowRight width={8} height={8} />
            </Link>
          </span>
        )}
      </section>
    </main>
  );
}
