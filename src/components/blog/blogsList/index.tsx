import { BlogListProps } from "src/types/clientTypes";
import BlogCard from "./blogCard";

export default function BlogsList({ blogs }: BlogListProps) {
  return <>{blogs && blogs.map((v) => <BlogCard value={v} key={v.id} />)}</>;
}
