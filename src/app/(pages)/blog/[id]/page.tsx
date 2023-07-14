import MemoizedTextToComponent from "src/components/blog/memoizedTextToComponent";
import { getBlogById } from "src/queryFn";

import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";
  const blog = await getBlogById(id);

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default async function ReminderByIdPage({ params }: any) {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";
  const blog = await getBlogById(id);

  return (
    <main className="mt-4">
      <MemoizedTextToComponent
        data={blog}
        isLoading={false}
        error={undefined}
      />
    </main>
  );
}
