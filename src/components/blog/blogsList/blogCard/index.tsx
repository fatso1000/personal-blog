import Link from "next/link";
import { BlogCardProps } from "src/types/clientTypes";

const BlogCard = ({ value }: BlogCardProps) => (
  <Link
    href={`/blog/${value.id}`}
    key={value.id}
    className="text-stone-200 transition p-2 hover:border-stone-500 border border-stone-950"
  >
    <span className="inline-flex gap-x-2">
      {value.post_tag &&
        value.post_tag.length > 0 &&
        value.post_tag.map((tag) => (
          <span key={tag.id} className="text-stone-500  ">
            {tag.name}
          </span>
        ))}
    </span>
    <h3 className="text-xl font-extrabold tracking-tight">{value.title}</h3>
    <p className="text-stone-400">{value.description}</p>
  </Link>
);

export default BlogCard;
