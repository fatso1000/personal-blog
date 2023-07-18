import { Metadata } from "next";
import BlogsList from "src/components/blog/blogsList";
import SearchInput from "src/components/inputs/searchInput";
import { getAllBlogs } from "src/queryFn";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Matias Benitez Blog",
    description: "",
  };
}

export default async function Home() {
  const blogs = await getAllBlogs();
  console.log(blogs);
  return (
    <main className="mt-4">
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Matias Benitez Blog
        </h1>
        <p className="text-stone-400 ">
          Hi! Welcome to my blog. This is the place where I upload information
          that I believe is important to know or interesting.
        </p>
        <div className="divider"></div>
        <SearchInput />
      </header>
      <section className="flex flex-col gap-y-5">
        {!blogs.error && <BlogsList blogs={blogs.data} />}
      </section>
    </main>
  );
}
