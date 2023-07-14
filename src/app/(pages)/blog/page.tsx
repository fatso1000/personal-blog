import { getBlogsByName } from "src/queryFn";

import BlogsList from "src/components/blog/blogsList";
import SearchInput from "src/components/inputs/searchInput";
import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Search Blog By Name - Matias Benitez Blog",
    description: "",
  };
}

export default async function BlogsSearchPage(props: any) {
  const name: string | undefined =
    props.searchParams.hasOwnProperty("name") && props.searchParams["name"];
  const blogs = await getBlogsByName(name);

  return (
    <main className="mt-4">
      <header className="mb-4">
        <SearchInput defaultValue={name} />
      </header>
      <section className="flex flex-col gap-y-5">
        {blogs && blogs.length > 0 ? (
          <BlogsList blogs={blogs} />
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
