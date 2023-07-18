import { BlogListProps } from "src/types/clientTypes";
import BlogCard from "./blogCard";

export default function BlogsList({ blogs }: BlogListProps) {
  return (
    <>
      {blogs &&
        blogs.length > 0 &&
        blogs.map((v) => <BlogCard value={v} key={v.id} />)}
    </>
  );
}
